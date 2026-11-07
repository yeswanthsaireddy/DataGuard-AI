
import logging

from fastapi import APIRouter

from app.core.config import settings
from app.schemas.health import HealthResponse

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    logger.info("Health check requested")

    return HealthResponse(
        status="healthy",
        application=settings.app_name,
        environment=settings.app_env,
        version="0.1.0",
    )
