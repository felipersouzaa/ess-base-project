from pymongo import ASCENDING, IndexModel
from src.db.config.reserva_collection_example import RESERVA_COLLECTION_EXAMPLE
from src.db.schemas.reserva_schema import ReservaSchema
from src.db.serializers.schema_serializer import schema_serializer


def create_collections(database):
    """
    Create all collections and insert the example data.

    """

    if 'reservas' not in database.db.list_collection_names():
        collections = ['reservas']

        for collection in collections:
            schema = ReservaSchema()
            database.create_collection(
                collection,
                indexes=[IndexModel([("id", ASCENDING)], unique=True)],
                validation_schema=schema_serializer(schema.get())
            )

        for reserva in RESERVA_COLLECTION_EXAMPLE:
            database.insert_item('reservas', reserva)
