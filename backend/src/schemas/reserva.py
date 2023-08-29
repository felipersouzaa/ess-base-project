from pydantic import BaseModel

class Quarto(BaseModel):
    tipo: str
    preco: float

class ReservaModel(BaseModel):
    nome: str
    classificacao: int
    avaliacao: float
    estado: str
    cidade: str
    quartos: list[Quarto]

class ReservaGet(BaseModel):
    id: str
    nome: str
    classificacao: int
    avaliacao: float
    estado: str
    cidade: str
    quartos: list[Quarto]

class ReservaList(BaseModel):
    reservas: list[ReservaGet]

