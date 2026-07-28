from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models.user_models import User
from app.schemas import (
    UserCreate,
    UserLogin,
    UserOut
)

from app.core.security import (
    hash_password,
    verify_password
)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post(
    "/register",
    response_model=UserOut
)
def register_user(
    user_data: UserCreate,
    session: Session = Depends(get_session)
):

    existing_user = session.exec(
        select(User)
        .where(User.email == user_data.email)
    ).first()


    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(
            user_data.password
        ),
        role=user_data.role
    )


    session.add(user)
    session.commit()
    session.refresh(user)


    return user



@router.post(
    "/login",
    response_model=UserOut
)
def login_user(
    login_data: UserLogin,
    session: Session = Depends(get_session)
):

    user = session.exec(
        select(User)
        .where(User.email == login_data.email)
    ).first()


    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


    if not verify_password(
        login_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


    return user



@router.get(
    "/{user_id}",
    response_model=UserOut
)
def get_user(
    user_id: int,
    session: Session = Depends(get_session)
):

    user = session.get(
        User,
        user_id
    )


    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    return user