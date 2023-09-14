def avalia_entity(avaliacao) -> dict:
    return {
        "user": avaliacao["user"],
        "name": avaliacao["name"],
        "rate_local": avaliacao["rate_local"],
        "rate_service": avaliacao["rate_service"],
        "rate_structure": avaliacao["rate_structure"],
        "rate_clean": avaliacao["rate_clean"],
        "rate_confort": avaliacao["rate_confort"],
        "rate_offer": avaliacao["rate_offer"],
        "rate_comment": avaliacao["rate_comment"],
        "rate_general": avaliacao["rate_general"]
    }

def avalia_response_entity(avaliacao) -> dict:
    return {
        "id": avaliacao["id"],
        "user": avaliacao["user"],
        "name": avaliacao["name"],
        "rate_local": avaliacao["rate_local"],
        "rate_service": avaliacao["rate_service"],
        "rate_structure": avaliacao["rate_structure"],
        "rate_clean": avaliacao["rate_clean"],
        "rate_confort": avaliacao["rate_confort"],
        "rate_offer": avaliacao["rate_offer"],
        "rate_comment": avaliacao["rate_comment"],
        "rate_general": avaliacao["rate_general"]
    }

def avalia_list_entity(avaliacoes) -> list:
    return [avalia_entity(avaliacao) for avaliacao in avaliacoes]