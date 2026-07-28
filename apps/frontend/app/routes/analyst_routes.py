from app.services.xp_service import award_xp

award_xp(db, current_user.id, 50, "Submitted findings")
