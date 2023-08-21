
from abc import ABC, abstractmethod

from src.schemas.reserva import ReservaGet

class ItemServiceMeta(ABC):

    @abstractmethod
    def get_reserva(self, reserva_id: str) -> ReservaGet:
        """Get reserva by id method definition"""
        pass