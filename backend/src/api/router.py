from fastapi import APIRouter
from src.api import items, reservas, avaliacoes, favoritos

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(reservas.router, prefix="/reservas", tags=["reservas"])
api_router.include_router(avaliacoes.router, prefix="/avaliacoes", tags=["avaliacoes"])
api_router.include_router(favoritos.router, prefix="/favoritos", tags=["favoritos"])