from app.session import SessionLocal, init_db
from app.models.user_models import User
from app.core.security import get_password_hash

ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "Admin123!"
ADMIN_ROLE = "admin"

def create_admin():
    init_db()  # ensure tables exist

    db = SessionLocal()

    existing = db.query(User).filter(User.email == ADMIN_EMAIL).first()
    if existing:
        print("Admin already exists.")
        return

    hashed = get_password_hash(ADMIN_PASSWORD)

    admin = User(
        email=ADMIN_EMAIL,
        hashed_password=hashed,
        role=ADMIN_ROLE,
        is_active=True,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    print("Admin created successfully!")

if __name__ == "__main__":
    create_admin()
