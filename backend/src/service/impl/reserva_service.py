import json
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.db.__init__ import database as db


def filter_reservas_by_name(reservas: list, searchTerm: str) -> list:
    if len(searchTerm) <= 0:
        return reservas

    filteredReservas = []
    for reserva in reservas:
        if searchTerm in reserva['nome']:
            filteredReservas.append(reserva)

    return filteredReservas

def filter_reservas_by_classification(reservas: list, classification: int) -> list:
    if classification <= 0:
        return reservas

    filteredReservas = []
    for reserva in reservas:
        if classification == reserva['classificacao']:
            filteredReservas.append(reserva)

    return filteredReservas

def filter_reservas_by_rating(reservas: list, rating: float) -> list:
    if rating <= 0:
        return reservas
    
    filteredReservas = []
    for reserva in reservas:
        if rating <= reserva['avaliacao']:
            filteredReservas.append(reserva)

    return filteredReservas

def filter_reservas_by_state(reservas: list, state: str) -> list:
    if len(state) <= 0:
        return reservas

    filteredReservas = []
    for reserva in reservas:
        if state == reserva['estado']:
            filteredReservas.append(reserva)

    return filteredReservas

def filter_reservas_by_city(reservas: list, city: str) -> list:
    if len(city) <= 0:
        return reservas

    filteredReservas = []
    for reserva in reservas:
        if city == reserva['cidade']:
            filteredReservas.append(reserva)

    return filteredReservas

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
    def get_reservas(searchTerm: str = "", classification: int = 0, rating: float = 0, state: str = "", city: str = "") -> HttpResponseModel:
        """Get items method implementation"""
        reservas = db.get_all_items('reservas')
        reservas = filter_reservas_by_name(reservas, searchTerm)
        reservas = filter_reservas_by_classification(reservas, classification)
        reservas = filter_reservas_by_rating(reservas, rating)
        reservas = filter_reservas_by_state(reservas, state)
        reservas = filter_reservas_by_city(reservas, city)
            
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
