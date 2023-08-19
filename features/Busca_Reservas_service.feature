Feature: Busca de Reservas com Filtro

  Scenario: Retornar todas as Reservas
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos”
    When eu peço ao sistema pelas reservas cadastradas
    Then o sistema retorna as seguintes opções “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos”

  Scenario: Buscar reservas pelo nome com resultados
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulho”
    When eu peço ao sistema pelas reservas com o campo “Nome” com o valor “Muro Alto”
    Then o sistema retorna apenas as reservas “Resort Muro Alto” e “Muro Alto Marulhos”

  Scenario: Buscar reservas pelo nome sem resultados
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulho”
    When eu peço ao sistema pelas reservas com o campo “Nome” com o valor “Pousada”
    Then o sistema retorna não retorna nenhuma das reservas cadastradas

  Scenario: Filtrar reservas pela classificação
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulho” com os respectivos valores para o campo “Classificação” “4 estrelas”, “5 estrelas”, “5 estrelas” e “3 estrelas”
    Wheneu peço ao sistema pelas reservas com o campo “Classificação” com o valor “5 estrelas”
    Then o sistema retorna apenas as seguintes reservas “Porto Seguro Hotel”, “Maracabana Spa” com os respectivos valores para o campo “Classificação” “5 estrelas” e “5 estrelas”

  Scenario: Filtrar reservas pela faixa de preço
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos” com os respectivos valores para o campo “Preço” “R$ 239”, “R$ 379”, “R$ 475”, e  “R$ 179
    When eu peço ao sistema pelas reservas com o campo “Preço” entre os valores “R$ 150” e “R$ 250”
    Then  o sistema retorna apenas as seguintes reservas “Resort Muro Alto” e “Muro Alto Marulhos” com os respectivos valores para o campo “Preço” “R$ 239” e “R$ 179”

  Scenario: Filtrar reservas pelo tipo de quarto
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos” com os respectivos valores para o campo “Tipo de Quarto” “Individual, Duplo e Familiar”, “Individual e Familiar”, “Individual” e “Duplo e Familiar”
    When eu peço ao sistema pelas reservas com o campo “Tipo de Quarto” com o valor “Familiar”
    Then o sistema retorna apenas as seguintes reservas “Resort Muro Alto”, “Porto Seguro Hotel” e “Muro Alto Marulhos”

  Scenario: Filtrar reservas pela avaliação dos hóspedes
    Given  o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotell”, “Maracabana Spa” e “Muro Alto Marulhos” com os respectivos valores para o campo “Avaliação” “8,3”, “7.8”, “9.5” e “6.7”
    When  eu peço ao sistema pelas reservas com o campo “Avaliação” com o valor “9”
    Then o sistema retorna apenas a seguinte reserva “Maracabana Spa” com o valor “9.5” para o campo “Avaliação”

  Scenario: Filtrar reservas pelo local
    Given o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa”, “Muro Alto Marulhos” com os respectivos valores para o campo “Estado” “Pernambuco”, “Bahia”, “Bahia” e “Pernambuco” e os respectivos valores para o campo “Cidade” “Ipojuca”, “Porto Seguro”, “Porto Seguro” e “Ipojuca”
    When peço ao sistema pelas reservas com o campo “Estado” com o valor “Bahia”
    And o campo “Cidade” com o valor “Porto Seguro” 
    Then vejo apenas as seguintes reservas “Porto Seguro Hotel”, “Maracabana Spa” com os valores “Bahia” e “Porto Seguro” para os campos “Estado” e “Cidade”