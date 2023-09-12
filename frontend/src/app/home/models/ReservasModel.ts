export default class ReservaModel {
    id: string;
    name: string;
    classification: number;
    rating: number;
    state: string;
    city: string;
    rooms: RoomModel[];
    imageUrl: string;
    description: string;
  
    constructor(data) {
      this.id = data.id;
      this.name = data.nome;
      this.classification = data.classificacao;
      this.rating = data.avaliacao;
      this.state = data.estado;
      this.city = data.cidade;
      this.rooms = data.quartos.map((quarto) => new RoomModel(quarto));
      this.imageUrl = data.imageUrl;
      this.description = data.descricao;
    }
  }

class RoomModel {
  type: string;
  price: number;

  constructor(room) {
    this.type = room.tipo;
    this.price = room.preco;
  }
}
  