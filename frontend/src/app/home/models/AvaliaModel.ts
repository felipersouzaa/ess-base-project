export default class Avalia {
    user: string;
    name: string;
    rate_local: number;
    rate_service: number;
    rate_structure: number;
    rate_clean: number;
    rate_confort: number;
    rate_offer: number;
    rate_comment: string;
  
    constructor(data) {
      this.user = data.user;
      this.name = data.nome;
      this.rate_local = data.rate_local;
      this.rate_service = data.rate_service;
      this.rate_structure = data.rate_structure;
      this.rate_clean = data.rate_clean;
      this.rate_confort = data.rate_confort;
      this.rate_offer = data.rate_offer;
      this.rate_comment = data.rate_comment;
    }
  }
  