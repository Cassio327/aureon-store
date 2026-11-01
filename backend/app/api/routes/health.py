from fastapi import APIRouter, Request

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check(request: Request) -> dict[str, str]:
    settings = request.app.state.settings
    return {
        "status": "healthy",
        "service": "aureon-api",
        "environment": settings.app_env,
    }
