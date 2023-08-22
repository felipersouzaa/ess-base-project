Feature: Busca de Reservas com Filtro

  Scenario: Retornar todas as Reservas
    Given o método "get_reservas" do ReservaService é chamado sem parametros retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas com nome e id
    And a reserva com nome "Resort Muro Alto" e id "3e3163bd" estar na lista
    And a reserva com nome "Porto Seguro Hotel" e id "152306d8" estar na lista
    And a reserva com nome "Maracana Spa" e id "ae70d14a" estar na lista
    And a reserva com nome "Muro Alto Marulhos" e id "f1ab0534" estar na lista

  Scenario: Buscar reservas pelo nome com resultados
    Given o método "get_reservas" do ReservaService é chamado com parametro "nome" com o valor "Muro" e retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas/?nome=Muro"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas com nome e id
    And a reserva com nome "Resort Muro Alto" e id "3e3163bd" estar na lista
    And a reserva com nome "Muro Alto Marulhos" e id "f1ab0534" estar na lista

  Scenario: Buscar reservas pelo nome sem resultados
    Given o método "get_reservas" do ReservaService é chamado com parametro "nome" com o valor "Pousada"
    When uma requisição "GET" for enviada para "/reservas/?nome=Pousada"
    Then o status da resposta deve ser "404"

  Scenario: Filtrar reservas pela classificação
    Given o método "get_reservas" do ReservaService é chamado com parametro "classificacao" com o valor "4" e retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas/?classificacao=4"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas com nome e classificacao
    And a reserva com nome "Resort Muro Alto" e classificacao "4" deve estar na lista

  Scenario: Filtrar reservas pela faixa de preço
    Given o método "get_reservas" do ReservaService é chamado com parametro "preco_minimo" com o valor "150" e o parametro "preco_maximo" com o valor "250" e retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas/?preço_minimo=150&preço_maximo=250"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas com nome e preco
    And a reserva com nome "Resort Muro Alto" e preco "239" deve estar na lista
    And a reserva com nome "Muro Alto Marulhos" e preco "179" deve estar na lista

  Scenario: Filtrar reservas pelo tipo de quarto
    Given o método "get_reservas" do ReservaService é chamado com parametro "quarto_duplo" com o valor "True" e retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas/?quarto_duplo=True"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas
    And a reserva com nome "Resort Muro Alto" e quartos do tipo "Duplo" deve estar na lista
    And a reserva com nome "Muro Alto Marulhos" e quartos do tipo "Duplo" deve estar na lista

  Scenario: Filtrar reservas pela avaliação dos hóspedes
    Given o método "get_reservas" do ReservaService é chamado com parametro "avaliacao" com o valor "9" retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas/?avaliacao=9" 
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas com nome e avaliacao
    And a reserva com nome "Maracabana Spa" e avaliacao "9.5" deve estar na lista

  Scenario: Filtrar reservas pelo local
    Given o método "get_reservas" do ReservaService é chamado com o parametro "estado" com o valor "Bahia" e o parametro "cidade" com o valor "Porto Seguro" e retorna uma lista de reservas
    When uma requisição "GET" for enviada para "/reservas/?estado=Bahia&cidade=Porto%20Seguro"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de reservas com nome, estado e cidade
    And a reserva com nome "Porto Seguro Hotel", estado "Bahia" e cidade "Porto Seguro" deve estar na lista
    And a reserva com nome "Maracabana Spa", estado "Bahia" e cidade "Porto Seguro" deve estar na lista