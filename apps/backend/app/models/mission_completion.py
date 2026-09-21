
from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User
    from .mission import Mission


class MissionCompletion(SQLModel, table=True):

    __tablename__ = "mission_completions"

    # ============================================================
    # IDENTIFIER
    # ============================================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True,
    )

    # ============================================================
    # CONNECTIONS
    # ============================================================

    user_id: int = Field(
        foreign_key="users.id",
        index=True,
    )

    mission_id: int = Field(
        foreign_key="missions.id",
        index=True,
    )

    # ============================================================
    # ATTEMPT
    # ============================================================

    attempt_number: int = Field(
        default=1,
        index=True,
    )

    # Identifies the generated scenario/variant used
    variant_key: Optional[str] = Field(
        default=None,
        index=True,
    )

    # ============================================================
    # GENERATED SCENARIO
    # ============================================================

    scenario_seed: Optional[int] = None

    scenario_type: Optional[str] = None

    generated_title: Optional[str] = None

    generated_content: Optional[str] = None

    # ============================================================
    # PERFORMANCE
    # ============================================================

    score: int = Field(
        default=0,
    )

    completed: bool = Field(
        default=False,
        index=True,
    )

    # ============================================================
    # HINTS
    # ============================================================

    hints_used: int = Field(
        default=0,
    )

    max_hints: int = Field(
        default=3,
    )

    # ============================================================
    # REWARD
    # ============================================================

    xp_awarded: int = Field(
        default=0,
    )

    # ============================================================
    # TIMESTAMPS
    # ============================================================

    started_at: datetime = Field(
        default_factory=datetime.utcnow,
    )

    completed_at: Optional[datetime] = None

    # ============================================================
    # RELATIONSHIPS
    # ============================================================

    user: "User" = Relationship(
        back_populates="mission_completions",
        sa_relationship_kwargs={
            "lazy": "selectin",
        },
    )

    mission: "Mission" = Relationship(
        back_populates="completions",
    )