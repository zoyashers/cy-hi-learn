from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .mission_completion import MissionCompletion
    from .task import Task


class Mission(SQLModel, table=True):

    __tablename__ = "missions"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True,
    )

    # =====================================
    # MISSION IDENTITY
    # =====================================

    title: str

    description: Optional[str] = None

    # =====================================
    # CURRICULUM
    # =====================================

    # TB unit / learning area this mission belongs to
    learning_unit: Optional[str] = Field(
        default=None,
        index=True,
    )

    # Fundamental skill being tested
    skill: Optional[str] = Field(
        default=None,
        index=True,
    )

    # =====================================
    # DIFFICULTY
    # =====================================

    difficulty: str = Field(
        default="easy",
        index=True,
    )

    # =====================================
    # MISSION TYPE
    # =====================================

    # General mission category
    category: Optional[str] = Field(
        default="application",
    )

    # Mission = skill application
    # Case = investigation
    mission_type: str = Field(
        default="skill",
    )

    # =====================================
    # GENERATION
    # =====================================

    # Determines which scenario generator is used.
    #
    # Examples:
    #   binary_arithmetic
    #   boolean_logic
    #   character_coding
    #   fundamental
    #
    generator_type: str = Field(
        default="fundamental",
    )

    # =====================================
    # REWARDS
    # =====================================

    xp_reward: int = Field(
        default=100,
    )

    badge_reward: Optional[str] = None

    # =====================================
    # STATUS
    # =====================================

    is_active: bool = Field(
        default=True,
    )

    created_at: datetime = Field(
        default_factory=datetime.utcnow,
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    completions: List["MissionCompletion"] = Relationship(
        back_populates="mission",
    )

    tasks: List["Task"] = Relationship(
        back_populates="mission",
    )