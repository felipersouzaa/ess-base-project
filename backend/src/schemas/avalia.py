from pydantic import BaseModel

class AvaliacaoModel(BaseModel):
    user: str
    name: str
    rate_local: int
    rate_service: int
    rate_structure: int
    rate_clean: int
    rate_confort: int
    rate_offer: int
    rate_comment: str
    rate_general: float

class AvaliacaoGet(BaseModel):
    id: str
    user: str
    name: str
    rate_local: int
    rate_service: int
    rate_structure: int
    rate_clean: int
    rate_confort: int
    rate_offer: int
    rate_comment: str
    rate_general: float

class AvaliacaoList(BaseModel):
    avaliacoes: list[AvaliacaoGet]