Feature: Busca de Reservas com Filtro

  Scenario: Abrir página de “Reservas”
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos”
    And estou na página de “Home”
    When seleciono a opção “Reservas”
    Then sou redirecionado para a página de “Reservas”
    And posso ver as seguintes opções de reservas “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos”

  Scenario: Buscar reservas pelo nome com resultados
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulho”
    And estou na página de “Reservas”
    When seleciono a opção “Buscar” com o valor “Muro Alto”
    Then vejo apenas as reservas “Resort Muro Alto” e “Muro Alto Marulhos”

  Scenario: Buscar reservas pelo nome sem resultados
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulho”
    And estou na página de “Reservas”
    When seleciono a opção “Buscar” com o valor “Pousada”
    Then posso ver a mensagem de erro “Nenhuma reserva encontrada”

  Scenario: Filtrar reservas pela classificação
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulho” com os respectivos valores para o campo “Classificação” “4 estrelas”, “5 estrelas”, “5 estrelas” e “3 estrelas”
    And estou na página de “Reservas”
    When seleciono a opção “Filtrar por classificação” com o valor “5 estrelas”
    Then vejo apenas as seguintes reservas  “Porto Seguro Hotel”, “Maracabana Spa” com os respectivos valores para o campo “Classificação” “5 estrelas” e “5 estrelas”

  Scenario: Filtrar reservas pela faixa de preço
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos” com os respectivos valores para o campo “Preço” “R$ 239”, “R$ 379”, “R$ 475”, e  “R$ 179”
    And estou na página de “Reservas”
    When seleciono a opção “Filtrar por faixa de preço” com o valor “de R$ 150 até R$ 250”
    Then vejo apenas as seguintes reservas  “Resort Muro Alto” e “Muro Alto Marulhos” com os respectivos valores para o campo “Preço” “R$ 239” e “R$ 179”

  Scenario: Filtrar reservas pelo tipo de quarto
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa” e “Muro Alto Marulhos” com os respectivos valores para o campo “Tipo de Quarto” “Individual, Duplo e Familiar”, “Individual e Familiar”, “Individual” e “Duplo e Familiar”
    And estou na página de “Reservas”
    When seleciono a opção “Filtrar por tipo de quarto” com o valor “Quarto Familiar”
    Then vejo apenas as seguintes reservas  “Resort Muro Alto”, “Porto Seguro Hotel” e “Muro Alto Marulhos”

  Scenario: Filtrar reservas pela avaliação dos hóspedes
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotell”, “Maracabana Spa” e “Muro Alto Marulhos” com os respectivos valores para o campo “Avaliação” “8,3”, “7.8”, “9.5” e “6.7”
    And estou na página de “Reservas”
    When seleciono a opção “Filtrar por Avaliação dos hóspedes” com o valor “
    Fantástico: 9 ou mais”
    Then vejo apenas a seguinte reserva “Maracabana Spa” com o valor “9.5” para o campo “Avaliação”

  Scenario: Filtrar reservas pelo local
    Given estou logado no perfil “Fulano” com o login “fulaninho@gmail.com” e senha “12345”
    And o sistema possui as seguintes opções de reservas cadastradas  “Resort Muro Alto”, “Porto Seguro Hotel”, “Maracabana Spa”, “Muro Alto Marulhos” com os respectivos valores para o campo “Estado” “Pernambuco”, “Bahia”, “Bahia” e “Pernambuco” e os respectivos valores para o campo “Cidade” “Ipojuca”, “Porto Seguro”, “Porto Seguro” e “Ipojuca”
    And estou na página de “Reservas”
    When preencho o campo “Estado” com o valor “Bahia”
    And o campo “Cidade” com o valor “Porto Seguro” 
    And seleciono a opção “Filtrar por local”
    Then vejo apenas as seguintes reservas “Porto Seguro Hotel”, “Maracabana Spa