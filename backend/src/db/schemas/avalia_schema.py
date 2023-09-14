from src.db.schemas.model_schema import ModelSchema

class AvaliaSchema(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "id",
        "user",
        "name"
        "rate_local",
        "rate_service",
        "rate_structure",
        "rate_clean",
        "rate_confort",
        "rate_offer",
        "rate_comment",
        "rate_general",
    ]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "Identificador unico de uma avaliação"
        },
        "user": {
            "bson_type": "string",
            "description": "Usuário que fez uma reserva"
        },
        "name": {
            "bson_type": "string",
            "description": "O nome de uma reserva"
        },
        "rate_local": {
            "bson_type": "int",
            "description": "Avaliação da Localização de uma reserva"
        },
        "rate_service": {
            "bson_type": "int",
            "description": "Avaliação do atendimento de uma reserva"
        },
        "rate_structure": {
            "bson_type": "int",
            "description": "Avaliação da infraestrutura de uma reserva" 
        },
        "rate_clean": {
            "bson_type": "int",
            "description": "Avaliação de limpeza de uma reserva"
        },
        "rate_confort": {
            "bson_type": "int",
            "description": "Avaliação de conforto de uma reserva"
        },
        "rate_offer": {
            "bson_type": "int",
            "description": "Avaliação dos serviços oferecidos de uma reserva"
        },
        "rate_comment": {
            "bson_type": "string",
            "description": "Comentário extra do usuário, campo não-obrigatório de uma reserva"
        },
        "rate_general": {
              "bson_type": "double",
            "description": "Média entre as avaliações específicas de uma reserva"
        }
    }
    
    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }