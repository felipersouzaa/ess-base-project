
from fastapi import HTTPException
from src.schemas.response import HTTPResponses, HttpResponseModel
from src.db.__init__ import database as db

def search_fav_list_by_user(favorites: list, user_search: str) -> list:
    """search avaliacoes by user"""
    user_fav = []
    for favorito in favorites:
        if user_search in favorito['user']:
            user_fav.append(favorito)
    
    return user_fav

class FavoritaService:

    @staticmethod
    def add_favorito(
        user: str = "",
        new_fav: str = ""
    ) -> HttpResponseModel:
        
        fav_add = {}
        fav_add["user"] = user
        fav_add["new_fav"] = new_fav
        """
        remover caso campo n preenchido
        """
        if "" in fav_add:
            raise HTTPException(status_code=404, detail="campo não preenchido")
        
        else:
            db.insert_item("favoritos", fav_add)

        return HttpResponseModel(
                message=HTTPResponses.FAVORITO_UPDATED().message,
                status_code=HTTPResponses.FAVORITO_UPDATED().status_code,
        )
    
    @staticmethod    
    def get_favoritos_by_user(
            user: str = "",
    ) -> HttpResponseModel:
        
        favoritos = db.get_all_items('favoritos')
        favoritos = search_fav_list_by_user(favoritos, user)

        if not favoritos:
            raise HTTPException(status_code=404, detail="Nenhuma avaliação registrada para esta reserva")
        
        return HttpResponseModel(
                message=HTTPResponses.FAVORITO_FOUND().message,
                status_code=HTTPResponses.FAVORITO_FOUND().status_code,
                data=favoritos,
                )
     