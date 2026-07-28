from sqlalchemy.orm import Session
from app.models import Score


def get_user_score(db: Session, user_id: int):
    return db.query(Score).filter(Score.user_id == user_id).first()


def set_user_score(db: Session, user_id: int, value: int):
    score = db.query(Score).filter(Score.user_id == user_id).first()

    if not score:
        score = Score(user_id=user_id, value=value)
        db.add(score)
    else:
        score.value = value

    db.commit()
    db.refresh(score)
    return score


def add_score(db: Session, user_id: int, amount: int):
    score = db.query(Score).filter(Score.user_id == user_id).first()

    if not score:
        score = Score(user_id=user_id, value=0)
        db.add(score)

    score.value += amount
    db.commit()
    db.refresh(score)
    return score

