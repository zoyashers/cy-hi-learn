import re
from sqlmodel import select
from app.models.task import Task
from app.models.submission_models import Submission
from app.core.db import async_session


def extract_expected_answer(description: str) -> str:
    """
    Extracts the expected answer from the Task.description field.
    """
    match = re.search(r"Expected answer:\s*(.*)", description)
    return match.group(1).strip() if match else ""


def normalize(text: str) -> str:
    """
    Normalizes text for comparison.
    """
    return text.strip().lower()


async def grade_submission(task_id: int, student_answer: str, user_id: int):
    async with async_session() as session:
        # Fetch task
        task = await session.exec(select(Task).where(Task.id == task_id))
        task = task.one()

        expected = extract_expected_answer(task.description)

        # Normalize
        expected_norm = normalize(expected)
        student_norm = normalize(student_answer)

        # Determine correctness
        is_correct = expected_norm == student_norm

        # Save submission
        submission = Submission(
            task_id=task_id,
            user_id=user_id,
            student_answer=student_answer,
            correct=is_correct,
        )
        session.add(submission)

        await session.commit()
        await session.refresh(submission)

        return {
            "task_id": task_id,
            "expected_answer": expected,
            "student_answer": student_answer,
            "correct": is_correct,
        }
