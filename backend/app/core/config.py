
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "DataGuard AI"
    app_env: str = "development"
    debug: bool = False

    api_v1_prefix: str = "/api/v1"

    backend_port: int = Field(default=8000, ge=1, le=65535)

    frontend_origin: str = "http://localhost:5173"

    log_level: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
