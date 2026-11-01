from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


def test_health_check_returns_service_status(monkeypatch) -> None:
    monkeypatch.setenv("APP_ENV", "local")
    client = TestClient(create_app())

    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy",
        "service": "aureon-api",
        "environment": "local",
    }


def test_openapi_uses_project_metadata() -> None:
    client = TestClient(create_app())

    response = client.get("/openapi.json")

    assert response.status_code == 200
    assert response.json()["info"]["title"] == "Aureon Store API"


def test_settings_have_safe_local_defaults(monkeypatch) -> None:
    monkeypatch.delenv("APP_ENV", raising=False)
    monkeypatch.delenv("BACKEND_CORS_ORIGINS", raising=False)

    settings = Settings(_env_file=None)

    assert settings.app_env == "local"
    assert settings.backend_cors_origins == ["http://localhost:3000"]


def test_configured_frontend_origin_is_allowed(monkeypatch) -> None:
    monkeypatch.setenv("BACKEND_CORS_ORIGINS", "http://localhost:3000")
    client = TestClient(create_app())

    response = client.options(
        "/api/v1/health",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"


def test_unconfigured_origin_is_rejected(monkeypatch) -> None:
    monkeypatch.setenv("BACKEND_CORS_ORIGINS", "http://localhost:3000")
    client = TestClient(create_app())

    response = client.options(
        "/api/v1/health",
        headers={
            "Origin": "https://untrusted.example",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers


def test_cors_settings_parse_multiple_origins() -> None:
    settings = Settings(
        _env_file=None,
        backend_cors_origins="http://localhost:3000, https://preview.example",
    )

    assert settings.backend_cors_origins == [
        "http://localhost:3000",
        "https://preview.example",
    ]
