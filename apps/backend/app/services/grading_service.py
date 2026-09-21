from sqlmodel import select

from app.models.task import Task
from app.models.submission_models import Submission
from app.core.db import async_session


def normalize(text: str) -> str:
    return " ".join(text.strip().lower().split())


def extract_expected_answer(description: str) -> str:
    """
    Temporary compatibility with existing missions.

    Existing tasks store their expected answer inside
    the description using:

        Expected answer: ...

    This keeps the current missions working while the
    proper mission-answer system is introduced.
    """

    if not description:
        return ""

    marker = "Expected answer:"

    if marker not in description:
        return ""

    return description.split(marker, 1)[1].strip()


async def grade_submission(
    task_id: int,
    student_answer: str,
    user_id: int,
):

    async with async_session() as session:

        result = await session.exec(
            select(Task).where(Task.id == task_id)
        )

        task = result.first()

        if not task:
            raise ValueError("Task not found")

        expected = extract_expected_answer(
            task.description or ""
        )

        expected_norm = normalize(expected)
        student_norm = normalize(student_answer)

        is_correct = (
            bool(expected_norm)
            and expected_norm == student_norm
        )

        score = task.max_score if is_correct else 0

        submission = Submission(
            task_id=task_id,
            mission_id=task.mission_id,
            user_id=user_id,
            answer=student_answer,
            correct=is_correct,
            score=score,
            max_score=task.max_score,
            status="graded",
        )

        session.add(submission)

        await session.commit()
        await session.refresh(submission)

        return {
            "task_id": task_id,
            "expected_answer": expected,
            "student_answer": student_answer,
            "correct": is_correct,
            "score": score,
        }