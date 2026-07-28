add_timeline_event(
    db,
    case_id=evidence.case_id,
    event_type="evidence_upload",
    description=f"Evidence uploaded: {evidence.filename}",
    user_id=current_user.id
)
