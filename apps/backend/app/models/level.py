from __future__ import annotations

from typing import Optional

from sqlmodel import SQLModel, Field



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
    # LEVEL INFORMATION
    # =====================================

    level_number: int = Field(
        unique=True,
        index=True
    )



    title: str



    # =====================================
    # XP REQUIREMENTS
    # =====================================

    required_xp: int



    description: Optional[str] = None



    # =====================================
    # UNLOCKS
    # =====================================

    badge_reward: Optional[str] = None