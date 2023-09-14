from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.avalia_service import AvaliaService

router = APIRouter()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Registra avaliação do usuário",
    tags=["avaliacoes"],
    responses={
        status.HTTP_201_CREATED: {
            "model": HttpResponseModel,
            "description": "Avaliação registrada com sucesso",
        },
        status.HTTP_400_BAD_REQUEST : {
            "model": HttpResponseModel,
            "detail": "Resposta inválida",
        }
    },
)
def post_avaliacao( 
        user: str = "",
        name: str = "",
        rate_local : int = -1,
        rate_service : int = -1,
        rate_structure : int = -1,
        rate_clean : int = -1,
        rate_confort : int = -1,
        rate_offer : int = -1,
        rate_comment : str = ""
    ) -> HttpResponseModel:

    avaliacao_response = AvaliaService.post_avaliacao(user, name, rate_local, rate_service, rate_structure, rate_clean, rate_confort, rate_offer, rate_comment)

    return avaliacao_response

@router.get(
    "/{user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Busca avaliação por usuário",
    tags=["avaliacoes"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Avaliação encontrada com sucesso",
        },
        status.HTTP_404_NOT_FOUND : {
            "model": HttpResponseModel,
            "detail": "Avaliação não encontrada",
        }
    },
)
def get_avaliacoes_by_user(
            user: str = "",
    ) -> HttpResponseModel:

    avaliacao_response = AvaliaService.get_avaliacoes_by_user(user)
    
    return avaliacao_response

@router.get(
    "/{name_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Busca avaliação por nome",
    tags=["avaliacoes"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Avaliação encontrada com sucesso",
        },
        status.HTTP_404_NOT_FOUND : {
            "model": HttpResponseModel,
            "detail": "Avaliação não encontrada",
        }
    },
)
def get_avaliacoes_by_name(
            name: str = "",
    ) -> HttpResponseModel:

    avaliacao_response = AvaliaService.get_avaliacoes_by_name(name)
    
    return avaliacao_response
