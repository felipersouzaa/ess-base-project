from src.service.impl.reserva_service import ReservaService
from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.tests.api.utils.utils import get_response_reservas_list, req_type_to_function

""" Scenario: Retornar todas as Reservas """
@scenario(scenario_name="Retornar todas as Reservas", feature_name="../features/reservas.feature")
def test_get_reservas():
    """ Get all reservas """

# Step definitions for the "Retornar todas as Reservas" scenario
@given(parsers.cfparse('o método "get_reservas" do ReservaService é chamado sem parametros retorna uma lista de reservas'))
def mock_reserva_service_response_list():
    """
    Mock the ReservaService.get_reservas() method to return a list of reservas
    """
    ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
        message=HTTPResponses.RESERVA_FOUND().message,
        status_code=HTTPResponses.RESERVA_FOUND().status_code,
        data=[
            {
                "nome": "Resort Muro Alto",
                "id": "3e3163bd"
            },
            {
                "nome": "Porto Seguro Hotel",
                "id": "152306d8"
            },
            {
                "nome": "Maracana Spa",
                "id": "ae70d14a"
            },
            {
                "nome": "Muro Alto Marulhos",
                "id": "f1ab0534"
            },
        ]
    )

@when(parsers.cfparse('uma requisição "{req_type}" for enviada para "{req_url}"'), target_fixture="context")
def send_get_reservas_request(client, context, req_type: str, req_url: str):
    """
    Send a request to the given URL using the given request type
    """
    
    response = req_type_to_function(client, req_type)(req_url)
    context["response"] = response
    return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture="context")
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """
    
    assert context["response"].status_code == int(status_code)
    return context

@then(parsers.cfparse('o JSON da resposta deve ser uma lista de reservas com nome e id'), target_fixture="context")
def check_response_json_is_an_reserva_list(context):
    """
    Check if the response JSON is a list of reservas
    """

    reservas = get_response_reservas_list(context["response"])

    assert isinstance(reservas, list)
    for reserva in reservas:
        assert isinstance(reserva, dict)
        assert "nome" in reserva and isinstance(reserva["nome"], str)
        assert "id" in reserva and isinstance(reserva["id"], str)

    return context

@then(parsers.cfparse('a reserva com nome "{reserva_nome}" e id "{reserva_id}" estar na lista'), target_fixture="context")
def check_reservas_is_in_list(context, reserva_nome: str, reserva_id: str):
    """
    Check if the reserva with the given name and id is in the response list
    """
    reservas = get_response_reservas_list(context["response"])

    assert {"nome": reserva_nome, "id": reserva_id} in reservas
    
    return context

""" Buscar reservas pelo nome com resultados """
@scenario(scenario_name="Buscar reservas pelo nome com resultados", feature_name="../features/reservas.feature")
def test_get_reservas_by_name():
    """ Get reservas by name """

# Step definitions for the "Buscar reservas pelo nome com resultados" scenario
@given(parsers.cfparse('o método "get_reservas" do ReservaService é chamado com parametro "nome" com o valor "Muro" e retorna uma lista de reservas'))
def mock_reserva_by_name_response_list():
    """
    Mock the ReservaService.get_reservas() method to return a list of reservas with names that includes Muro
    """
    ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
        message=HTTPResponses.RESERVA_FOUND().message,
        status_code=HTTPResponses.RESERVA_FOUND().status_code,
        data=[
            {
                "nome": "Resort Muro Alto",
                "id": "3e3163bd"
            },
            {
                "nome": "Muro Alto Marulhos",
                "id": "f1ab0534"
            },
        ]
    )
    
""" Buscar reservas pela classificação """
@scenario(scenario_name="Filtrar reservas pela classificação", feature_name="../features/reservas.feature")
def test_get_reservas_by_classification():
    """ Get reservas by classification """

# Step definitions for the "Buscar reservas pela classificação " scenario
@given(parsers.cfparse('o método "get_reservas" do ReservaService é chamado com parametro "classificacao" com o valor "4" e retorna uma lista de reservas'))
def mock_reserva_by_classification_response_list():
    """
    Mock the ReservaService.get_reservas() method to return a list of reservas with classification equals 4
    """
    ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
        message=HTTPResponses.RESERVA_FOUND().message,
        status_code=HTTPResponses.RESERVA_FOUND().status_code,
        data=[
            {
                "nome": "Resort Muro Alto",
                "classificacao": 4
            },
        ]
    )

@then(parsers.cfparse('o JSON da resposta deve ser uma lista de reservas com nome e classificacao'), target_fixture="context")
def check_response_json_is_an_reserva_list(context):
    """
    Check if the response JSON is a list of reservas
    """

    reservas = get_response_reservas_list(context["response"])

    assert isinstance(reservas, list)
    for reserva in reservas:
        assert isinstance(reserva, dict)
        assert "nome" in reserva and isinstance(reserva["nome"], str)
        assert "classificacao" in reserva and isinstance(reserva["classificacao"], int)

    return context

@then(parsers.cfparse('a reserva com nome "{reserva_nome}" e classificacao "{reserva_classificacao}" deve estar na lista'), target_fixture="context")
def check_reserva_is_in_list(context, reserva_nome: str, reserva_classificacao: int):
    """
    Check if the reserva with the given name and classification is in the response list
    """
    reservas = get_response_reservas_list(context["response"])

    assert {"nome": reserva_nome, "classificacao": int(reserva_classificacao)} in reservas
    
    return context


""" Buscar reservas pela avaliacao """
@scenario(scenario_name="Filtrar reservas pela avaliação dos hóspedes", feature_name="../features/reservas.feature")
def test_get_reservas_by_rating():
    """ Get reservas by rating """

# Step definitions for the "Buscar reservas pela avaliacao " scenario
@given(parsers.cfparse('o método "get_reservas" do ReservaService é chamado com parametro "avaliacao" com o valor "9" retorna uma lista de reservas'))
def mock_reserva_by_rating_response_list():
    """
    Mock the ReservaService.get_reservas() method to return a list of reservas with rating equal or greater than 9
    """
    ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
        message=HTTPResponses.RESERVA_FOUND().message,
        status_code=HTTPResponses.RESERVA_FOUND().status_code,
        data=[
            {
                "nome": "Maracabana Spa",
                "avaliacao": 9.5
            },
        ]
    )

@then(parsers.cfparse('o JSON da resposta deve ser uma lista de reservas com nome e avaliacao'), target_fixture="context")
def check_response_json_is_an_reserva_list(context):
    """
    Check if the response JSON is a list of reservas
    """

    reservas = get_response_reservas_list(context["response"])

    assert isinstance(reservas, list)
    for reserva in reservas:
        assert isinstance(reserva, dict)
        assert "nome" in reserva and isinstance(reserva["nome"], str)
        assert "avaliacao" in reserva and isinstance(reserva["avaliacao"], float)

    return context

@then(parsers.cfparse('a reserva com nome "{reserva_nome}" e avaliacao "{reserva_avaliacao}" deve estar na lista'), target_fixture="context")
def check_reserva_is_in_list(context, reserva_nome: str, reserva_avaliacao: float):
    """
    Check if the reserva with the given name and classification is in the response list
    """
    reservas = get_response_reservas_list(context["response"])

    assert {"nome": reserva_nome, "avaliacao": float(reserva_avaliacao)} in reservas
    
    return context


""" Filtrar reservas pelo local """
@scenario(scenario_name="Filtrar reservas pelo local", feature_name="../features/reservas.feature")
def test_get_reservas_by_location():
    """ Get reservas by location """

# Step definitions for the "Filtrar reservas pelo local" scenario
@given(parsers.cfparse('o método "get_reservas" do ReservaService é chamado com o parametro "estado" com o valor "Bahia" e o parametro "cidade" com o valor "Porto Seguro" e retorna uma lista de reservas'))
def mock_reserva_by_location_response_list():
    """
    Mock the ReservaService.get_reservas() method to return a list of reservas with state equals to Bahia and city equals to Porto Seguro
    """
    ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
        message=HTTPResponses.RESERVA_FOUND().message,
        status_code=HTTPResponses.RESERVA_FOUND().status_code,
        data=[
            {
                "nome": "Porto Seguro Hotel",
                "estado": "Bahia",
                "cidade": "Porto Seguro"
            },
            {
                "nome": "Maracabana Spa",
                "estado": "Bahia",
                "cidade": "Porto Seguro"
            },
        ]
    )

@then(parsers.cfparse('o JSON da resposta deve ser uma lista de reservas com nome, estado e cidade'), target_fixture="context")
def check_response_json_is_an_reserva_list(context):
    """
    Check if the response JSON is a list of reservas
    """

    reservas = get_response_reservas_list(context["response"])

    assert isinstance(reservas, list)
    for reserva in reservas:
        assert isinstance(reserva, dict)
        assert "nome" in reserva and isinstance(reserva["nome"], str)
        assert "estado" in reserva and isinstance(reserva["estado"], str)
        assert "cidade" in reserva and isinstance(reserva["cidade"], str)

    return context

@then(parsers.cfparse('a reserva com nome "{reserva_nome}", estado "{reserva_state}" e cidade "{reserva_city}" deve estar na lista'), target_fixture="context")
def check_reserva_is_in_list(context, reserva_nome: str, reserva_state: str, reserva_city: str):
    """
    Check if the reserva with the given name, state and city
    """
    reservas = get_response_reservas_list(context["response"])

    assert {"nome": reserva_nome, "estado": reserva_state, "cidade": reserva_city} in reservas
    
    return context


# TODO: Rework on this tests later 
# """ Filtrar reservas pela faixa de preço """
# @scenario(scenario_name="Filtrar reservas pela faixa de preço", feature_name="../features/reservas.feature")
# def test_get_reservas_by_price():
#     """ Get reservas by price """

# # Step definitions for the "Filtrar reservas pela faixa de preço" scenario
# @given(parsers.cfparse('o método "get_reservas" do ReservaService com parametro "preco_minimo" com o valor "150" e o parametro "preco_maximo" com o valor "250" e retorna uma lista de reservas'))
# def mock_reserva_by_classification_response_list():
#     """
#     Mock the ReservaService.get_reservas() method to return a list of reservas with price greater than 150 and lesser than 250
#     """
#     ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
#         message=HTTPResponses.RESERVA_FOUND().message,
#         status_code=HTTPResponses.RESERVA_FOUND().status_code,
#         data=[
#             {
#                 "nome": "Resort Muro Alto",
#                 "quartos": [{"tipo": "Indiviual", "preco":239}, {"tipo": "Duplo", "preco": 299}, {"tipo": "Familiar", "preco": 349}]
#             },
#             {
#                 "nome": "Muro Alto Marulhos",
#                 "quartos": [{"tipo": "Duplo", "preco": 179}, {"tipo": "Familiar", "preco": 249}]
#             },
#         ]
#     )

# @then(parsers.cfparse('o JSON da resposta deve ser uma lista de reservas com nome e preco'), target_fixture="context")
# def check_response_json_is_an_reserva_list(context):
#     """
#     Check if the response JSON is a list of reservas
#     """

#     reservas = get_response_reservas_list(context["response"])

#     assert isinstance(reservas, list)
#     for reserva in reservas:
#         assert isinstance(reserva, dict)
#         assert "nome" in reserva and isinstance(reserva["nome"], str)
#         assert "quartos" in reserva and isinstance(reserva["quartos"], list)
#         for quarto in reserva["quartos"]:
#             assert "preco" in quarto and isinstance(quarto["preco"], int)
            
#     return context

# @then(parsers.cfparse('a reserva com nome "{reserva_nome}" e preco "{reserva_preco}" deve estar na lista'), target_fixture="context")
# def check_reserva_is_in_list(context, reserva_nome: str, reserva_classificacao: int):
#     """
#     Check if the reserva with the given name and classification is in the response list
#     """
#     reservas = get_response_reservas_list(context["response"])

#     assert {"nome": reserva_nome, "quartos": int(reserva_classificacao)} in reservas
    
#     return context

""" Buscar reservas pelo nome sem resultados """
# @scenario(scenario_name="Buscar reservas pelo nome sem resultados", feature_name="../features/reservas.feature")
# def test_get_reservas_by_name_fail():
#     """ Get all reservas """

# # Step definitions for the "Retornar todas as Reservas" scenario
# @given(parsers.cfparse('o método "get_reservas" do ReservaService é chamado com parametro "nome" com o valor "Pousada"'))
# def mock_reserva_by_name_fail_response():
#     """
#     Mock the ReservaService.get_reservas() method to return a 404 error code
#     """
#     ReservaService.get_reservas = lambda nome, classificacao, avaliacao, estado, cidade, quarto_individual, quarto_duplo, quarto_familiar, preco_minimo, preco_maximo: HttpResponseModel(
#         message=HTTPResponses.RESERVA_NOT_FOUND().message,
#         status_code=HTTPResponses.RESERVA_NOT_FOUND().status_code,
#     )

