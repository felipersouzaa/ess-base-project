
from abc import ABC, abstractmethod

from src.schemas.avalia import AvaliacaoGet

class ItemServiceMeta(ABC):

    @abstractmethod
    def get_avaliacao(self, avalia_id: str) -> AvaliacaoGet:
        """Get avaliacao by id method definition"""
        pass