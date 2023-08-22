def reserva_entity(reserva) -> dict:
    return {
        "nome": reserva["nome"],
        "classificacao": reserva["classificacao"],
        "avaliacao": reserva["avaliacao"],
        "estado": reserva["estado"],
        "cidade": reserva["cidade"],
        "quartos": reserva["quartos"]
    }

def reserva_response_entity(reserva) -> dict:
    return {
        "id": reserva["id"],
        "nome": reserva["nome"],
        "classificacao": reserva["classificacao"],
        "avaliacao": reserva["avaliacao"],
        "estado": reserva["estado"],
        "cidade": reserva["cidade"],
        "quartos": reserva["quartos"]
    }

def reserva_list_entity(reservas) -> list:
    return [reserva_entity(reserva) for reserva in reservas]