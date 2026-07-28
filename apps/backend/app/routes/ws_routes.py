from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter()

active_connections: List[WebSocket] = []


async def broadcast(message: str):
    for connection in active_connections:
        await connection.send_text(message)


@router.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)

case_note_connections: Dict[int, List[WebSocket]] = {}

async def broadcast_note(case_id: int, message: str):
    for ws in case_note_connections.get(case_id, []):
        await ws.send_text(message)

@router.websocket("/ws/cases/{case_id}/notes")
async def websocket_case_notes(websocket: WebSocket, case_id: int):
    await websocket.accept()
    case_id = int(case_id)

    case_note_connections.setdefault(case_id, []).append(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        case_note_connections[case_id].remove(websocket)
