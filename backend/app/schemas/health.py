
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    application: str
    environment: str
    version: str
