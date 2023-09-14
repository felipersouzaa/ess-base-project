from src.service.impl.avalia_service import AvaliaService
from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.tests.api.utils.utils import get_response_avaliacoes_list, req_type_to_function
from src.db import database as db


"""
Scenario: Criar avaliação
"""


@scenario(scenario_name="Criar avaliação", feature_name="../features/avaliacao.feature")
def test_post_avaliacao():
    """Post avaliacao"""

@given(parsers.cfparse('estou logado como user "{user_id}'))
def mock_user_login(context, user_id : str):
    context["user"] = user_id
    
    return context

@given(parsers.cfparse('o AvaliaService é chamado e o campo name é marcado com "{name_id}'), target_fixture="context")
def mock_post_avaliacao(context, name_id : str):
    context["name"] = name_id

    return context

@given(parsers.cfparse('os campos rate_local, rate_service, rate_strucuture, rate_clean, rate_confort e rate_offer estão preenchidos com "{rate_local}", "{rate_service}", "{rate_structure}", "{rate_clean}", "{rate_confort}" e "{rate_offer}"'), target_fixture="context")
def mock_avalia_service_response_param(context, rate_local : int, rate_service : int, rate_structure : int, rate_clean : int, rate_confort : int, rate_offer : int):
    context["avaliacao0"] = {
        "rate_local" : rate_local,
        "rate_service" : rate_service,
        "rate_structure" : rate_structure,
        "rate_clean" : rate_clean,
        "rate_confort" : rate_confort,
        "rate_offer" : rate_offer
        }

    AvaliaService.post_avaliacao = lambda user, name, rate_local, rate_service, rate_structure, rate_clean, rate_confort, rate_offer, rate_comment: HttpResponseModel(
        message=HTTPResponses.AVALIACAO_FOUND().message,
        status_code=HTTPResponses.AVALIACAO_FOUND().status_code
    )       
    
    return context

@when(parsers.cfparse('uma requisição POST for enviada para "{req_url}"'), target_fixture="context")
def send_post_avaliacoes_request(client, context, req_url: str):
    
    response = req_type_to_function(client, "POST")(req_url)
    context["response"] = response
    return context

@then(parsers.cfparse('o status de resposta deve ser "{status_code}"'), target_fixture="context")
def check_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code)
    return context

@then(parsers.cfparse('a avaliação com name "{name_id}" e user "{user_id}" deve ser criada'), target_fixture="context")
def check_avaliacao_is_in_list(context, name_id: str, user_id: str):
    
    assert user_id in context["user"]
    assert name_id in context["name"]
    return context



"""
Scenario: Acessar avaliações de uma reserva
"""


@scenario(scenario_name="Acessar avaliações de uma reserva", feature_name="../features/avaliacao.feature")
def test_get_avaliacao():
    """ Get avaliacoes by name"""

@given(parsers.cfparse('o AvaliaService retorna uma lista de avaliações com o parâmetro name "{name_id}"'), target_fixture="context")
def mock_get_avalia_list(context, name_id: str):
    context = {}
    AvaliaService.get_avaliacoes_by_name = lambda name_id: HttpResponseModel(
        message=HTTPResponses.AVALIACAO_FOUND().message,
        status_code=HTTPResponses.AVALIACAO_FOUND().status_code,
        data=[
            {
                "user" : "Zezinho",
                "name" : "Pousada_Sumare"
            },
                        {
                "user" : "Mano_El",
                "name" : "Pousada_Sumare"
            }
        ]
    )
    
    return context

@when(parsers.cfparse('uma requisição GET for enviada para "{req_url}"'), target_fixture="context")
def get_avaliacoes_request(client, context, req_url: str):
    response = req_type_to_function(client, "GET")(req_url)
    context["response"] = response
    return context

@then(parsers.cfparse('o JSON de resposta deve ser uma lista de avaliações'), target_fixture="context")
def json_check(context):

    avaliacoes = get_response_avaliacoes_list(context["response"])

    assert isinstance(avaliacoes, list)
    for avaliacao in avaliacoes:
        assert isinstance(avaliacao, dict)
        assert "nome" in avaliacao and isinstance(avaliacao["nome"], str)
        assert "id" in avaliacao and isinstance(avaliacao["id"], str)

    return context

@then(parsers.cfparse('a avaliação com name "{name_id}" e user "{user_id}" deve estar na lista'), target_fixture="context")
def check_reservas_is_in_list(context, name_id: str, user_id: str):
    """
    Check if the reserva with the given name and id is in the response list
    """
    reservas = get_response_avaliacoes_list(context["response"])

    assert {"name": name_id, "user": user_id} in reservas
    
    return context