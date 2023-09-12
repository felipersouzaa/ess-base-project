from fastapi import APIRouter, status
from src.service.impl.reserva_service import ReservaService
from src.schemas.response import HttpResponseModel

router = APIRouter()

@router.get(
    "/{reserva_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Busca uma reserva pelo Id",
    tags=["reservas"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Reserva recebida com sucesso",
        },
        status.HTTP_404_NOT_FOUND: {
            "model": HttpResponseModel,
            "description": "Reserva não encontrada",
        }
    },
)
def get_reserva(reserva_id: str):
    reserva_get_response = ReservaService.get_reserva(reserva_id)
    return reserva_get_response

@router.get(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retorna reservas baseadas em paremetros",
    tags=["reservas"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Reservas recebida com sucesso",
        },
        status.HTTP_404_NOT_FOUND: {
            "detail": "Nenhuma Reserva não encontrada",
        }
    },
)
def get_reservas(
        nome: str = "",
        classificacao: int = 0,
        avaliacao: float = 0,
        estado: str = "",
        cidade: str = "",
        quarto_individual: bool = False,
        quarto_duplo: bool = False,
        quarto_familiar: bool = False,
        preco_minimo: float = 0,
        preco_maximo: float = 99999
    ) -> HttpResponseModel: 
    # reservas_list_response = ReservaService.get_reservas()
    # return reservas_list_response 

    reservas_list_response = ReservaService.get_reservas(
        nome,
        classificacao,
        avaliacao,
        estado,
        cidade,
        quarto_individual,
        quarto_duplo,
        quarto_familiar,
        preco_minimo,
        preco_maximo
    )
    
    return reservas_list_response