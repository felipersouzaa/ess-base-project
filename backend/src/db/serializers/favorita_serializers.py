def favorita_entity(favorito) -> dict:
    return {
        "user": favorito["user"],
        "fav_list": favorito["fav_list"],
    }

def favorita_response_entity(favorito) -> dict:
    return {
        "id": favorito["id"],
        "user": favorito["user"],
        "name": favorito["fav_list"],
    }

def favorita_list_entity(favoritos) -> list:
    return [favorita_entity(favorito) for favorito in favoritos]