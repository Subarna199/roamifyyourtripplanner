import sqlite3
import os

DB_NAME = "roamify.db"

def create_database():
    """Create the SQLite database and populate it with all destination data."""
    # Remove existing DB to start fresh
    if os.path.exists(DB_NAME):
        os.remove(DB_NAME)

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # ── Create tables ──────────────────────────────────────────────

    cursor.execute("""
        CREATE TABLE destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination_city TEXT NOT NULL,
            country TEXT NOT NULL,
            region TEXT NOT NULL,
            avg_flight_price REAL NOT NULL,
            avg_hotel_price_per_night REAL NOT NULL,
            avg_daily_food_cost REAL NOT NULL,
            local_transport_daily_cost REAL NOT NULL,
            activity_avg_cost REAL NOT NULL,
            currency TEXT NOT NULL,
            currency_symbol TEXT NOT NULL,
            usd_rate REAL NOT NULL,
            image_emoji TEXT,
            tier TEXT CHECK(tier IN ('budget', 'moderate', 'premium')) NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE destination_highlights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination_id INTEGER NOT NULL,
            highlight TEXT NOT NULL,
            FOREIGN KEY (destination_id) REFERENCES destinations(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE trip_estimates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination_id INTEGER NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            num_travelers INTEGER NOT NULL,
            nights INTEGER NOT NULL,
            flight_total REAL NOT NULL,
            hotel_total REAL NOT NULL,
            food_total REAL NOT NULL,
            transport_total REAL NOT NULL,
            activity_total REAL NOT NULL,
            grand_total REAL NOT NULL,
            per_person_total REAL NOT NULL,
            cost_per_night REAL NOT NULL,
            FOREIGN KEY (destination_id) REFERENCES destinations(id)
        )
    """)

    # ── Seed destination data ──────────────────────────────────────

    destinations = [
        ("Bangkok", "Thailand", "Asia", 650, 55, 18, 8, 120, "THB", "฿", 35.2, "🏯", "budget",
         ["Street food paradise", "Grand Palace", "Night markets"]),
        ("Bali", "Indonesia", "Asia", 780, 65, 22, 12, 180, "IDR", "Rp", 15750, "🌴", "budget",
         ["Rice terraces", "Temple tours", "Surf beaches"]),
        ("Lisbon", "Portugal", "Europe", 520, 90, 35, 10, 150, "EUR", "€", 0.92, "🚋", "moderate",
         ["Historic trams", "Pasteis de nata", "Coastal cliffs"]),
        ("Mexico City", "Mexico", "Americas", 350, 75, 25, 7, 100, "MXN", "$", 17.1, "🌮", "budget",
         ["Aztec ruins", "Vibrant food scene", "Art & culture"]),
        ("Tokyo", "Japan", "Asia", 900, 120, 45, 20, 250, "JPY", "¥", 149.5, "🗼", "moderate",
         ["Cherry blossoms", "Ramen & sushi", "Shinjuku neon"]),
        ("Paris", "France", "Europe", 680, 180, 65, 18, 300, "EUR", "€", 0.92, "🗼", "premium",
         ["Eiffel Tower", "Louvre Museum", "Fine dining"]),
        ("New York", "USA", "Americas", 300, 220, 70, 15, 280, "USD", "$", 1, "🗽", "premium",
         ["Times Square", "Broadway shows", "World-class museums"]),
        ("Cape Town", "South Africa", "Africa", 1100, 85, 28, 14, 200, "ZAR", "R", 18.6, "🦁", "moderate",
         ["Table Mountain", "Safari nearby", "Waterfront dining"]),
        ("Dubai", "UAE", "Middle East", 750, 200, 55, 22, 350, "AED", "د.إ", 3.67, "🏙️", "premium",
         ["Burj Khalifa", "Desert safari", "Luxury malls"]),
        ("Prague", "Czech Republic", "Europe", 490, 70, 28, 8, 130, "CZK", "Kč", 23.4, "🏰", "budget",
         ["Old Town Square", "Castle district", "Beer culture"]),
        ("Cancún", "Mexico", "Americas", 420, 130, 40, 10, 220, "MXN", "$", 17.1, "🏖️", "moderate",
         ["Caribbean beaches", "Cenotes", "Mayan ruins"]),
        ("Singapore", "Singapore", "Asia", 870, 160, 50, 15, 220, "SGD", "S$", 1.34, "🦁", "premium",
         ["Gardens by the Bay", "Hawker centres", "Marina Bay Sands"]),
    ]

    for dest in destinations:
        highlights = dest[13]
        row = dest[:13]
        cursor.execute("""
            INSERT INTO destinations (
                destination_city, country, region,
                avg_flight_price, avg_hotel_price_per_night,
                avg_daily_food_cost, local_transport_daily_cost,
                activity_avg_cost, currency, currency_symbol,
                usd_rate, image_emoji, tier
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, row)

        dest_id = cursor.lastrowid
        for h in highlights:
            cursor.execute(
                "INSERT INTO destination_highlights (destination_id, highlight) VALUES (?, ?)",
                (dest_id, h),
            )

    # ── Pre-compute sample trip estimates (7 nights, 2 travelers) ─

    cursor.execute("SELECT * FROM destinations")
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()

    nights = 7
    num_travelers = 2

    for row in rows:
        d = dict(zip(columns, row))
        flight_total = d["avg_flight_price"] * num_travelers
        hotel_total = d["avg_hotel_price_per_night"] * nights
        food_total = d["avg_daily_food_cost"] * nights * num_travelers
        transport_total = d["local_transport_daily_cost"] * nights * num_travelers
        activity_total = d["activity_avg_cost"] * num_travelers
        grand_total = flight_total + hotel_total + food_total + transport_total + activity_total
        per_person = grand_total / num_travelers
        cost_per_night = grand_total / nights

        cursor.execute("""
            INSERT INTO trip_estimates (
                destination_id, start_date, end_date, num_travelers, nights,
                flight_total, hotel_total, food_total, transport_total,
                activity_total, grand_total, per_person_total, cost_per_night
            ) VALUES (?, '2026-03-04', '2026-03-11', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            d["id"], num_travelers, nights,
            flight_total, hotel_total, food_total, transport_total,
            activity_total, grand_total, per_person, cost_per_night,
        ))

    conn.commit()

    # ── Print summary ──────────────────────────────────────────────

    print(f"✅ Database '{DB_NAME}' created successfully!\n")

    print("── destinations ─────────────────────────────────────")
    cursor.execute("SELECT id, destination_city, country, region, tier, avg_flight_price, avg_hotel_price_per_night FROM destinations")
    print(f"{'ID':<4} {'City':<15} {'Country':<16} {'Region':<12} {'Tier':<10} {'Flight':>8} {'Hotel/n':>8}")
    print("-" * 75)
    for r in cursor.fetchall():
        print(f"{r[0]:<4} {r[1]:<15} {r[2]:<16} {r[3]:<12} {r[4]:<10} ${r[5]:>6.0f}  ${r[6]:>6.0f}")

    print(f"\n── trip_estimates (sample: {num_travelers} travelers, {nights} nights) ──")
    cursor.execute("""
        SELECT d.destination_city, t.grand_total, t.per_person_total
        FROM trip_estimates t
        JOIN destinations d ON t.destination_id = d.id
        ORDER BY t.grand_total
    """)
    print(f"{'City':<15} {'Total':>10} {'Per Person':>12}")
    print("-" * 40)
    for r in cursor.fetchall():
        print(f"{r[0]:<15} ${r[1]:>8,.0f}  ${r[2]:>9,.0f}")

    conn.close()


if __name__ == "__main__":
    create_database()
