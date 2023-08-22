import json
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.db.__init__ import database as db


def filter_reservas_by_name(reservas: list, search_term: str) -> list:
    if len(search_term) <= 0:
        return reservas

    filtered_reservas = []
    for reserva in reservas:
        if search_term in reserva['nome']:
            filtered_reservas.append(reserva)

    return filtered_reservas

def filter_reservas_by_classification(reservas: list, classification: int) -> list:
    if classification <= 0:
        return reservas

    filtered_reservas = []
    for reserva in reservas:
        if classification == reserva['classificacao']:
            filtered_reservas.append(reserva)

    return filtered_reservas

def filter_reservas_by_rating(reservas: list, rating: float) -> list:
    if rating <= 0:
        return reservas
    
    filtered_reservas = []
    for reserva in reservas:
        if rating <= reserva['avaliacao']:
            filtered_reservas.append(reserva)

    return filtered_reservas

def filter_reservas_by_state(reservas: list, state: str) -> list:
    if len(state) <= 0:
        return reservas

    filtered_reservas = []
    for reserva in reservas:
        if state == reserva['estado']:
            filtered_reservas.append(reserva)

    return filtered_reservas

def filter_reservas_by_city(reservas: list, city: str) -> list:
    if len(city) <= 0:
        return reservas

    filtered_reservas = []
    for reserva in reservas:
        if city == reserva['cidade']:
            filtered_reservas.append(reserva)

    return filtered_reservas

def filter_reservas_by_room_type(reservas: list, individual_room: bool, double_room: bool, family_room: bool ) -> list:
    if not individual_room and not double_room and not family_room:
        return reservas
    
    filtered_reservas = []
    for reserva in reservas:
        if individual_room:
            for quarto in reserva['quartos']:
                if quarto['tipo'] == "Individual" and reserva not in filtered_reservas:
                    filtered_reservas.append(reserva)
        
        if double_room:
            for quarto in reserva['quartos']:
                if quarto['tipo'] == "Duplo" and reserva not in filtered_reservas:
                    filtered_reservas.append(reserva)
                    
        if family_room:
            for quarto in reserva['quartos']:
                if quarto['tipo'] == "Familiar" and reserva not in filtered_reservas:
                    filtered_reservas.append(reserva)

    return filtered_reservas
class ReservaService:

    @staticmethod
    def get_reserva(reserva_id: str) -> HttpResponseModel:
        reserva = db.get_item_by_id('reservas', reserva_id)
        if not reserva:
            return HttpResponseModel(
                message=HTTPResponses.RESERVA_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVA_NOT_FOUND().status_code,
            )
        return HttpResponseModel(
                message=HTTPResponses.ITEM_FOUND().message,
                status_code=HTTPResponses.ITEM_FOUND().status_code,
                data=reserva,
            )

    @staticmethod
    def get_reservas(searchTerm: str = "", classification: int = 0, rating: float = 0, state: str = "", city: str = "", individual_room: bool = False, double_room: bool = False, family_room: bool = False) -> HttpResponseModel:
        """Get items method implementation"""
        reservas = db.get_all_items('reservas')
        reservas = filter_reservas_by_name(reservas, searchTerm)
        reservas = filter_reservas_by_classification(reservas, classification)
        reservas = filter_reservas_by_rating(reservas, rating)
        reservas = filter_reservas_by_state(reservas, state)
        reservas = filter_reservas_by_city(reservas, city)
        reservas = filter_reservas_by_room_type(reservas, individual_room, double_room, family_room)
            
        if not reservas:
            return HttpResponseModel(
                message=HTTPResponses.RESERVA_NOT_FOUND().message,
                status_code=HTTPResponses.RESERVA_NOT_FOUND().status_code,
            )
        
        return HttpResponseModel(
                message=HTTPResponses.RESERVA_FOUND().message,
                status_code=HTTPResponses.RESERVA_FOUND().status_code,
                data=reservas,
            )
