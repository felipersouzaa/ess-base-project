from src.db.schemas.model_schema import ModelSchema

class ReservaSchema(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "id",
        "nome",
        "classificacao",
        "avaliacao",
        "estado",
        "cidade",
    ]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "Identificador unico de uma reserva"
        },
        "nome": {
            "bson_type": "string",
            "description": "O nome de uma reserva"
        },
        "classificacao": {
            "bson_type": "int",
            "description": "Classificação em estrelas de uma reserva"
        },
        "avaliacao": {
            "bson_type": "int",
            "description": "Media das avaliacoes dos hospedes de uma reserva"
        },
        "estado": {
            "bson_type": "string",
            "description": "Estado onde a reserva esta localizada"
        },
        "cidade": {
            "bson_type": "string",
            "description": "Cidade onde a reserva esta localizada"
        },
    }
    
    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }