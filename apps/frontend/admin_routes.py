from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.auth import admin_only
from app.security import hash_password

router = APIRouter(prefix="/admin", tags=["Admin"])


# ---------------------------------------------------------
# 1. GET ALL USERS
# ---------------------------------------------------------
@router.get("/users")
def get_all_users(db: Session = Depends(get_db), user=Depends(admin_only)):
    users = db.query(User).all()

    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at,
        }
        for u in users
    ]


# ---------------------------------------------------------
# 2. CREATE USER (student, lecturer, admin)
# ---------------------------------------------------------
@router.post("/users")
def create_user(data: dict, db: Session = Depends(get_db), user=Depends(admin_only)):
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=hash_password(data["password"]),
        role=data["role"],
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created", "id": new_user.id}


# ---------------------------------------------------------
# 3. DELETE USER
# ---------------------------------------------------------
@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), user=Depends(admin_only)):
    u = db.query(User).filter(User.id == user_id).first()

    if not u:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(u)
    db.commit()

    return {"message": "User deleted"}


