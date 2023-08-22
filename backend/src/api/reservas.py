from fastapi import APIRouter, status
from src.service.impl.reserva_service import ReservaService
from src.schemas.response import HttpResponseModel

router = APIRouter()

@router.get(
    "/{reserva_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve an reserva by its ID",
    tags=["reservas"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got reserva by id",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Reserva not found",
        }
    },
)
def get_reserva(reserva_id: str):
    reserva_get_response = ReservaService.get_reserva(reserva_id)
    return reserva_get_response

# Get all Reservas
@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retorna todas as reservas",
    tags=["reservas"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all the reservas",
        },
    },
)
def get_reservas(nome: str = "", classificacao: int = 0, avaliacao: float = 0, estado: str = "", cidade: str = "") -> HttpResponseModel: 
    # reservas_list_response = ReservaService.get_reservas()
    # return reservas_list_response 

    reservas_list_response = ReservaService.get_reservas(nome, classificacao, avaliacao, estado, cidade)
    
    return reservas_list_response