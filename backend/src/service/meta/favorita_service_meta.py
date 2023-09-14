
from abc import ABC, abstractmethod

from src.schemas.favorita import FavoritoGet

class ItemServiceMeta(ABC):

    @abstractmethod
    def get_favorito(self, avalia_id: str) -> FavoritoGet:
        """Get favorito by id method definition"""
        pass