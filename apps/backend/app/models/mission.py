from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .task import Task



class Mission(SQLModel, table=True):

    __tablename__ = "missions"



    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )



    # =====================================
    # BASIC INFORMATION
    # =====================================

    title: str



    description: Optional[str] = None



    # =====================================
    # LEARNING PATH
    # =====================================

    pathway: str = Field(
        default="digital_forensics"
    )


    """
    Possible values:

    digital_forensics
    soc_analyst
    malware_analysis
    incident_response
    threat_hunting
    """



    category: Optional[str] = None



    """
    Examples:

    Windows Forensics
    Network Analysis
    Mobile Security
    Malware
    """



    # =====================================
    # DIFFICULTY
    # =====================================

    difficulty: str = Field(
        default="beginner"
    )


    """
    beginner
    intermediate
    advanced
    expert
    """



    # =====================================
    # GAMIFICATION
    # =====================================

    xp_reward: int = Field(
        default=100
    )



    estimated_time: Optional[int] = None


    """
    Estimated completion time
    in minutes
    """



    # =====================================
    # PROGRESSION
    # =====================================

    required_level: int = Field(
        default=1
    )



    prerequisite_mission_id: Optional[int] = Field(
        default=None,
        foreign_key="missions.id"
    )



    # =====================================
    # STATUS
    # =====================================

    active: bool = Field(
        default=True
    )



    created_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )



    # =====================================
    # TIMESTAMPS
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )



    # =====================================
    # RELATIONSHIPS
    # =====================================

    tasks: list["Task"] = Relationship(
        back_populates="mission"
    )