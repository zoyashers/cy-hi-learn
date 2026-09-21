from typing import TYPE_CHECKING, List, Optional

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User


class Level(SQLModel, table=True):

    __tablename__ = "levels"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    # =====================================
    # LEVEL DATA
    # =====================================

    level_number: int = Field(
        default=1,
        unique=True,
        index=True
    )

    name: str

    required_xp: int = Field(
        default=0
    )

    # =====================================
    # USERS
    # =====================================

    users: List["User"] = Relationship(
        back_populates="level",
        sa_relationship_kwargs={
            "lazy": "selectin"
        }
    )
