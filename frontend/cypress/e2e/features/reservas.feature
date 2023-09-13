Feature: Busca de Reservas com Filtro

  Scenario: Ver todas as reservas sem filtro
    Given estou na página de "/reservas"
    Then posso ver as seguintes opções de reservas "Resort Muro Alto", "Porto Seguro Hotel", "Maracabana Spa" e "Muro Alto Marulhos"

  Scenario: Buscar reservas pelo nome com resultados
    Given estou na página de "/reservas"
    When seleciono a opção "Pesquisar" com o valor "Muro"
    Then vejo apenas as reservas "Resort Muro Alto" e "Muro Alto Marulhos"

  Scenario: Buscar reservas pelo nome sem resultados
    Given estou na página de "/reservas"
    When seleciono a opção "Pesquisar" com o valor "Pousada"
    Then posso ver a mensagem de erro "Nenhuma reserva encontrada com esses critérios"

  Scenario: Filtrar reservas pela classificação
    Given estou na página de "/reservas"
    When seleciono a opção "Pesquisar" com o campo "Classificação" com o valor "5 Estrelas"
    Then vejo a reserva "Porto Seguro Hotel" com o valor "5" para o Campo "Classificação"
    And vejo a reserva "Maracabana Spa" com o valor "5" para o Campo "Classificação"

  # Scenario: Filtrar reservas pela faixa de preço
  #   Given estou na página de "/reservas"
  #   When seleciono a opção "Pesquisar" com o campo "Preço Mínimo" com o valor "150" e o campo "Preço Máximo" com o valor "250"
  #   Then vejo apenas as seguintes reservas "Resort Muro Alto" e "Muro Alto Marulhos" com os respectivos valores para o campo "Preço" "R$ 239" e "R$ 179"

  Scenario: Filtrar reservas pelo tipo de quarto
    Given estou na página de "/reservas"
    When seleciono a opção "Pesquisar" com o campo Tipos de Quarto com o valor "Familiar"
    Then vejo apenas as seguintes reservas "Resort Muro Alto", "Porto Seguro Hotel" e "Muro Alto Marulhos"

  Scenario: Filtrar reservas pela avaliação dos hóspedes
    Given estou na página de "/reservas"
    When seleciono a opção "Pesquisar" com o campo Avaliação dos Hóspedes com o valor "Fantástico: 9 ou mais"
    Then vejo apenas a seguinte reserva "Maracabana Spa" com o valor "9.5" para o campo Avaliação