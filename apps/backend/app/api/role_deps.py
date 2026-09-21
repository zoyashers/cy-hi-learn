from fastapi import Depends, HTTPException, status

from app.api.auth_deps import get_current_user


def admin_only(
    user=Depends(get_current_user),
):
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return user


def instructor_only(
    user=Depends(get_current_user),
):
    if user.role not in [
        "lecturer",
        "instructor",
        "admin",
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Instructor access required",
        )

    return user


def student_only(
    user=Depends(get_current_user),
):
    if user.role not in [
        "student",
        "lecturer",
        "instructor",
        "admin",
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student access required",
        )

    return user