from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.favorita_service import FavoritaService

router = APIRouter()

@router.post(
    "/",
    response_model=HttpResponseModel,
    status_code=status.HTTP_201_CREATED,
    description="Adiciona favorito à lista do usuário",
    tags=["favoritos"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Favoritos atualizados com sucesso",
        },
        status.HTTP_404_NOT_FOUND : {
            "model": HttpResponseModel,
            "detail": "Não posui nenhum favorito",
        }
    },
)
def post_favorito( 
        user: str = "",
        new_fav: str = ""
    ) -> HttpResponseModel:

    favorito_response = FavoritaService.add_favorito(user, new_fav)

    return favorito_response

@router.get(
    "/{user_id}",
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Busca avaliação por usuário",
    tags=["favoritos"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Favoritos encontrado com sucesso",
        },
        status.HTTP_404_NOT_FOUND : {
            "model": HttpResponseModel,
            "detail": "Favoritos não encontrado",
        }
    },
)
def get_fav_by_user(
            user: str = "",
    ) -> HttpResponseModel:

    favorita_get_response = FavoritaService.get_favoritos_by_user(user)
    
    return favorita_get_response

