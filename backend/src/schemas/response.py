from typing import Optional
from pydantic import BaseModel

class HttpResponseModel(BaseModel):
    message: str
    status_code: int
    data: Optional[dict] | Optional[list] = None

class HTTPResponses:

    """
    This class contains the basic HTTP responses for the API
    """

    @staticmethod
    def ITEM_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item not found",
            status_code=404,
        )

    @staticmethod
    def ITEM_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item found",
            status_code=200,
        )

    @staticmethod
    def ITEM_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item created",
            status_code=201,
        )

    @staticmethod
    def RESERVA_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reserva não encontrada",
            status_code=404,
        )

    @staticmethod
    def RESERVA_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Reserva encontrada com sucesso",
            status_code=200,
        )

    @staticmethod
    def SERVER_ERROR() -> HttpResponseModel:
        return HttpResponseModel(
            message="Server error",
            status_code=500,
        )

    @staticmethod
    def AVALIACAO_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Avaliação registrada com sucesso",
            status_code=201
        )

    @staticmethod
    def AVALIACAO_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Avaliação não encontrada",
            status_code=404,
        )

    @staticmethod
    def AVALIACAO_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Avaliação encontrada com sucesso",
            status_code=200,
        )

    @staticmethod
    def FAVORITO_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Favoritos não encontrado",
            status_code=404,
        )

    @staticmethod
    def FAVORITO_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Favoritos encontrado com sucesso",
            status_code=200,
        )

    @staticmethod
    def FAVORITO_UPDATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Favoritos atualizados com sucesso",
            status_code=200,
        )
    # TODO: implement other responses (item created, updated, deleted, etc)