from pydantic import BaseModel

class FavoritoModel(BaseModel):
    user: str
    fav_list: list

class FavoritoGet(BaseModel):
    id: str
    user: str
    fav_list: list

class FavoritoList(BaseModel):
    avaliacoes: list[FavoritoGet]