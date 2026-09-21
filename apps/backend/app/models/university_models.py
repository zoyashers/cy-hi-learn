from datetime import datetime
from typing import Optional, TYPE_CHECKING, List

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .membership_models import Membership



class University(SQLModel, table=True):

    __tablename__ = "universities"


    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )


    name: str


    domain: str = Field(
        unique=True,
        index=True
    )


    active: bool = Field(
        default=True
    )


    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    memberships: List["Membership"] = Relationship(
    back_populates="university"
    )
