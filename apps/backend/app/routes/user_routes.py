from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db

router = APIRouter()

@router.get("/me")
def get_current_user_info(db: Session = Depends(get_db)):
    return {"message": "User info endpoint working"}
