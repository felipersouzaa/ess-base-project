from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db

class ReservaService:

    @staticmethod
    def get_reserva(reserva_id: str) -> HttpResponseModel:
        reserva = db.get_item_by_id('reservas', reserva_id)
        if not reserva:
            return HttpResponseModel(
                message=HTTPResponses.ITEM_NOT_FOUND().message,
                status_code=HTTPResponses.ITEM_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.ITEM_FOUND().message,
                status_code=HTTPResponses.ITEM_FOUND().status_code,
                data=reserva,
            )

    @staticmethod
    def get_reservas() -> HttpResponseModel:
        """Get items method implementation"""
        reservas = db.get_all_items('reservas')
        if not reservas:
            return HttpResponseModel(
                message=HTTPResponses.ITEM_NOT_FOUND().message,
                status_code=HTTPResponses.ITEM_NOT_FOUND().status_code,
            )
        
        return HttpResponseModel(
                message=HTTPResponses.ITEM_FOUND().message,
                status_code=HTTPResponses.ITEM_FOUND().status_code,
                data=reservas,
            )