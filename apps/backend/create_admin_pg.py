import psycopg2
import bcrypt

DB_NAME = "cyberintel"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "localhost"

email = "admin@example.com"
password = "Admin123!"
role = "admin"

hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST
)

cur = conn.cursor()

cur.execute("""
INSERT INTO users (email, hashed_password, role)
VALUES (%s, %s, %s)
RETURNING id;
""", (email, hashed, role))

admin_id = cur.fetchone()[0]
conn.commit()
conn.close()

print(f"Admin created with ID: {admin_id}")
