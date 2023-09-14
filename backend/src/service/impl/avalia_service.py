
from fastapi import HTTPException
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.db.__init__ import database as db

def search_avaliacoes_by_name(avaliacoes: list, name_search: str) -> list:
    """search avaliacoes by reserva name"""
    name_avaliacoes = []
    for avaliacao in avaliacoes:
        if name_search in avaliacao['name']:
            name_avaliacoes.append(avaliacao)
    
    return name_avaliacoes

def search_avaliacoes_by_user(avaliacoes: list, user_search: str) -> list:
    """search avaliacoes by user"""
    user_avaliacoes = []
    for avaliacao in avaliacoes:
        if user_search in avaliacao['user']:
            user_avaliacoes.append(avaliacao)
    
    return user_avaliacoes

def search_avaliacoes_by_id(avaliacoes: list, id_search: str) -> list:
    """search avaliacao by id"""
    id_avaliacao = []
    point = len(avaliacoes)

    while len(id_avaliacao) == 0 or point >= 1:
        point -= 1
        if avaliacoes[point]['id'] == id_search:
            id_avaliacao.append(avaliacoes[point])
    
    return id_avaliacao

class AvaliaService:

    @staticmethod
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
        
        avaliacao = {
            "user" : user, 
            "name" : name, 
            "rate_local" : rate_local, 
            "rate_service" : rate_service, 
            "rate_structure" : rate_structure, 
            "rate_clean": rate_clean, 
            "rate_confort": rate_confort, 
            "rate_offer": rate_confort, 
            "rate_comment" : rate_comment
            }

        if -1 in avaliacao.values():
            raise HTTPException(status_code=400, detail="Resposta inválida")
        
        else:    
            rate_general = sum([rate_local, rate_service, rate_structure, rate_clean, rate_confort, rate_offer])/6
            rate_general = "{:.1f}".format(rate_general)

            avaliacao["rate_general"] = rate_general
            db.insert_item("avaliacoes", avaliacao)

        return HttpResponseModel(
            message=HTTPResponses.AVALIACAO_CREATED().message,
            status_code=HTTPResponses.AVALIACAO_CREATED().status_code,      
            )

    @staticmethod    
    def get_avaliacoes_by_user(
            user: str = "",
    ) -> HttpResponseModel:
        
        avaliacoes = db.get_all_items('avaliacoes')
        avaliacoes = search_avaliacoes_by_user(avaliacoes, user)

        if not avaliacoes:
            raise HTTPException(status_code=404, detail="Nenhuma avaliação feita por esse usuário")
        
        return HttpResponseModel(
                message=HTTPResponses.AVALIACAO_FOUND().message,
                status_code=HTTPResponses.AVALIACAO_FOUND().status_code,
                data=avaliacoes,
                )
    
    @staticmethod    
    def get_avaliacoes_by_name(
            name: str = "",
    ) -> HttpResponseModel:
        
        avaliacoes = db.get_all_items('avaliacoes')
        avaliacoes = search_avaliacoes_by_user(avaliacoes, name)

        if not avaliacoes:
            raise HTTPException(status_code=404, detail="Nenhuma avaliação registrada para esta reserva")
        
        return HttpResponseModel(
                message=HTTPResponses.AVALIACAO_FOUND().message,
                status_code=HTTPResponses.AVALIACAO_FOUND().status_code,
                data=avaliacoes,
                )

