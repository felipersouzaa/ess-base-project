from pydantic import BaseModel

class ReservaModel(BaseModel):
    nome: str
    classificacao: int
    avaliacao: float
    estado: str
    cidade: str

class ReservaGet(BaseModel):
    id: str
    nome: str
    classificacao: int
    avaliacao: float
    estado: str
    cidade: str

class ReservaList(BaseModel):
    reservas: list[ReservaGet]