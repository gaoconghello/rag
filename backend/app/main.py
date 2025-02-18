from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.api.api_v1.api import api_router
from app.api.openapi.api import router as openapi_router
from app.core.config import settings
from app.core.minio import init_minio


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(openapi_router, prefix="/openapi")

@app.on_event("startup")
async def startup_event():
    # Print configuration settings
    print("\n=== Configuration Settings ===")
    for field, value in settings.__dict__.items():
        if not field.startswith('_'):  # Skip internal attributes
            print(f"{field}: {value}")
    print("===========================\n")
    
    # Initialize MinIO
    init_minio()

@app.get("/")
def root():
    return {"message": "Welcome to RAG Web UI API"} 