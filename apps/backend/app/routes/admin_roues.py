add_timeline_event(
    db,
    case_id=case_id,
    event_type="assignment",
    description=f"Case assigned to user {user_id}",
    user_id=current_user.id
)

add_timeline_event(
    db,
    case_id=case_id,
    event_type="status_change",
    description=f"Status changed to {status}",
    user_id=current_user.id
)
