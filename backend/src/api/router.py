from fastapi import APIRouter
from src.api import items, reservas

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(reservas.router, prefix="/reservas", tags=["reservas"])