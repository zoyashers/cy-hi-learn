from app.models.badge import Badge

BADGE_RULES = [
    ("First Case", "Complete your first case", lambda s: s["cases_completed"] >= 1),
    ("High Scorer", "Score 80+ on 5 cases", lambda s: s["high_scores"] >= 5),
    ("Tag Master", "Tag 20 pieces of evidence", lambda s: s["evidence_tags"] >= 20),
    ("Note Taker", "Add 10 notes", lambda s: s["notes_added"] >= 10),
    ("Report Writer", "Generate 5 reports", lambda s: s["reports_generated"] >= 5),
    ("AI Explorer", "Use AI 20 times", lambda s: s["ai_uses"] >= 20),
    ("Streak Keeper", "Maintain a 7‑day streak", lambda s: s["streak_days"] >= 7),
]

def check_badges(db, user_id: int, stats):
    unlocked = []

    for name, desc, rule in BADGE_RULES:
        if rule(stats):
            exists = db.query(Badge).filter(Badge.name == name).first()
            if not exists:
                badge = Badge(name=name, description=desc, icon="⭐")
                db.add(badge)
                unlocked.append(badge)

    db.commit()
    return unlocked
