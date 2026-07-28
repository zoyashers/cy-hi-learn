from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.role_deps import instructor_only, admin_only
from app.crud.soc_events import get_case_events, get_all_events

router = APIRouter(prefix="/soc", tags=["SOC Events"])


@router.get("/case/{case_id}")
def get_soc_events_for_case(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return get_case_events(db, case_id)


@router.get("/all")
def get_all_soc_events(
    db: Session = Depends(get_db),
    user=Depends(admin_only),
):
    return get_all_events(db)
