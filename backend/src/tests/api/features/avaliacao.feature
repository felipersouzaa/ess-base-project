Feature: Avaliar Reservas
    Scenario: Criar avaliação
        Given estou logado como user "Januaria"
        And o AvaliaService é chamado e o campo name é marcado com "Resort_Muro_Alto"
        And os campos rate_local, rate_service, rate_strucuture, rate_clean, rate_confort e rate_offer estão preenchidos com "5", "5", "5", "5", "5" e "5"
        When uma requisição POST for enviada para "/avaliacoes"
        Then o status de resposta deve ser "201"
        And a avaliação com name "Resort_Muro_Alto" e user "Januaria" deve ser criada

    Scenario: Acessar avaliações de uma reserva
        Given o AvaliaService retorna uma lista de avaliações com o parâmetro name "Pousada Sumaré"
        When uma requisição GET for enviada para "/avaliacoes/?name=Pousada_Sumare"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve ser uma lista de avaliações
        And a avaliação com name "Pousada_Sumare" e user "Zezinho"  deve estar na lista

    Scenario: Acessar reserva sem avaliações
        Given o AvaliaService retorna uma lista de avaliações com o parâmetro name "Resort Muro Alto"
        When uma requisição GET for enviada para "/avaliacoes/?name=Resort_Muro_Alto"
        Then o status da resposta deve ser "404"

    Scenario: Acessar avaliações de um usuário
        Given o AvaliaService retorna uma lista de avaliações com o parâmetro name "Charli"
        When uma requisição GET for enviada para "/avaliacoes/?user=Charli"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve ser uma lista de avaliações
        And a avaliação com name "Resort_Muro_Alto" e user "Charli" deve estar na lista
        And a avaliação com name "Maracabana_Spa" e user "Charli" deve estar na lista  
"""   
    Scenario: Remover avaliação de um usuário
        Given o método "remove_nota" é chamado para o usuário "zezinho_cv" para a reserva "Pousada Sumaré"
        When uma requisição DELETE for enviada para "/Reserva/'Pousada Sumaré'/notas/'zezinho_cv'" 
        Then o status da resposta deve ser "200" 
        And o sistema retorna uma mensagem "Avaliação Removida"
"""