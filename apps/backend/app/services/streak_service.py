from datetime import datetime, timedelta

def update_streak(db, user):
    today = datetime.utcnow().date()

    if not user.last_active_date:
        user.last_active_date = today
        user.streak_days = 1
        db.commit()
        return

    last = user.last_active_date.date()

    if last == today:
        return  # already counted today

    if last == today - timedelta(days=1):
        user.streak_days += 1
    else:
        user.streak_days = 1

    user.last_active_date = datetime.utcnow()

    if user.streak_days > user.longest_streak:
        user.longest_streak = user.streak_days

    db.commit()
