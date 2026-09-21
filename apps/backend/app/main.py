from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db

from app.api.auth_routes import router as auth_router
from app.api.user_routes import router as user_router
from app.api.case_routes import router as case_router
from app.api.evidence_routes import router as evidence_router
from app.api.activity_routes import router as activity_router
from app.api.task_routes import router as task_router
from app.api.lecturer_dashboard import router as lecturer_router
from app.api.progress_routes import router as progress_router
from app.api.missions.missions import router as missions_router


app = FastAPI(
    title="CY-HI Learn API",
    version="1.0.0",
)


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {
        "status": "ok"
    }


@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "CY-HI Learn API running",
    }


# =========================================================
# API ROUTERS
# =========================================================

app.include_router(
    auth_router,
    prefix="/api",
)

app.include_router(
    user_router,
    prefix="/api",
)

app.include_router(
    case_router,
    prefix="/api",
)

app.include_router(
    evidence_router,
    prefix="/api",
)

app.include_router(
    activity_router,
    prefix="/api",
)

app.include_router(
    task_router,
    prefix="/api",
)

app.include_router(
    lecturer_router,
    prefix="/api",
)

app.include_router(
    progress_router,
    prefix="/api",
)

app.include_router(
    missions_router,
    prefix="/api/missions",
)


@app.on_event("startup")
async def startup():
    await init_db()