def build_user_stats(user):
    return {
        "cases_completed": user.cases_completed,
        "high_scores": user.high_scores,
        "evidence_tags": user.evidence_tags,
        "notes_added": user.notes_added,
        "reports_generated": user.reports_generated,
        "ai_uses": user.ai_uses,
        "streak_days": user.streak_days,
        "level": user.level_reached,
    }
