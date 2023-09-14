from src.db.schemas.model_schema import ModelSchema

class FavoritaSchema(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "id",
        "user",
        "name",
        "fav_list"
    ]

    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "Identificador unico de uma lista de reservas favoritadas"
        },
        "user": {
            "bson_type": "string",
            "description": "Usuário que administra a lista"
        },
        "fav_list": {
            "bson_type": "string",
            "description": "O nome das reservas favoritadas"
        },
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }