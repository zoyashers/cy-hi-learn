from fastapi import APIRouter


from .auth_routes import router as auth_router

from .user_routes import router as user_router

from .case_routes import router as case_router

from .evidence_routes import router as evidence_router

from .activity_routes import router as activity_router

from .task_routes import router as task_router

from .lecturer_dashboard import router as lecturer_router




api_router = APIRouter()




api_router.include_router(

    auth_router,

    prefix="/api"

)




api_router.include_router(

    user_router,

    prefix="/api"

)




api_router.include_router(

    case_router,

    prefix="/api"

)




api_router.include_router(

    evidence_router,

    prefix="/api"

)




api_router.include_router(

    activity_router,

    prefix="/api"

)




api_router.include_router(

    task_router,

    prefix="/api"

)




api_router.include_router(

    lecturer_router,

    prefix="/api"

)