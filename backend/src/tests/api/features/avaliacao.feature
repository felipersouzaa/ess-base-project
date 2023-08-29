Feature: Avaliar Reserva

"""
    Scenario: Calcular notas de uma reserva
        Given a reserva "Pousada Sumaré" está no sistema 
        And a reserva "Pousada Sumaré" possui a avaliação do usuário "Ronaldo123" e "Jonas321"
        When eu peço ao sistema pelas notas da reserva "Pousada Sumaré"
        Then o sistema retorna as avaliações de "Ronaldo123" e "Jonas321" para os campos de "Localização", "Atendimento", "Infraestrutura", "Limpeza", "Conforto", "Serviços Oferecidos" e "Comentários Extras" 
        And o sistema guarda um array com as notas médias de "Localização", "Atendimento", "Infraestrutura", "Limpeza", "Conforto", "Serviços Oferecidos" e "Comentários Extras" 
        And o sistema guarda a "Nota Geral" da "Pousada Sumaré" como a média entre as notas de "Localização", "Atendimento", "Infraestrutura", "Limpeza", "Conforto", "Serviços Oferecidos" e "Comentários Extras" 

    Scenario: Acessar avaliações de um hotel
        Given a reserva "Pousada Sumaré" está no sistema 
        And o sistema possui um array com as notas médias de "Localização", "Atendimento", "Infraestrutura", "Limpeza", "Conforto", "Serviços Oferecidos" e "Comentários Extras" para "Pousada Sumaré" 
        And o sistema possui uma variável com a "Nota Geral" da "Pousada Sumaré"
        When eu pergunto ao sistema pelas avaliações da "Pousada Sumaré"
        Then o sistema retorna as todas as notas médias da "Pousada Sumaré"

    Scenario: Acessar avaliações de um hotel sem avaliações
        Given a reserva "Pousada Sumaré" está no sistema 
        And a reserva "Pousada Sumaré" possui nenhuma avaliação
        When eu pergunto ao sistema pelas avaliações da "Pousada Sumaré"
        Then o sistema retorna nenhuma avaliação

    Scenario: Remover Avaliação de um usuário 
        Given a reserva "Pousada Sumaré" está no sistema 
        And a reserva "Pousada Sumaré" possui a avaliação de "Ronaldo123"
        When eu peço ao sistema para remover a avaliação de "Ronaldo123" da "Pousada Sumaré"
        Then a avaliação de "Ronaldo123" da "Pousada Sumaré" é apagada do sistema
        And o sistema guarda um array atualizado com as notas médias da "Pousada Sumaré"
        And o sistema guarda uma variável atualizada com a "Nota Geral" da "Pousada Sumaré"
"""

    Scenario: Acessar avaliações de uma reserva
        Given o método "acess_nota" retorna uma lista com as avaliações da reserva "Pousada Sumaré"
        When uma requisição GET for enviada para "/Reserva/'Pousada Sumaré'/notas"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve ser um dicionário com arrays de notas dos critérios de avaliação dadas pelos usuários

    Scenario: Calcular notas de uma reserva
        Given o método "calc_nota" é chamado para a "Pousada Sumaré" é chamado
        And existe uma lista com as avaliações da reserva "Pousada Sumaré"
        When uma requisição POST for enviada para "/Reserva/'Pousada Sumaré'/nota_geral"
        Then o status de resposta deve ser "201" 
        And o JSON de resposta deve ser um array com as notas médias dos critérios de avaliação dadas pelos usuários
    
    Scenario: Acessar reserva sem avaliações
        Given o método "acess_nota" retorna uma lista com as avaliações da reserva "Pousada Sumaré"
        When uma requisição GET for enviada para "/Reserva/'Pousada Sumaré'/notas"
        Then o status da resposta deve ser "404"
        And o sistema retorna uma mensagem "Nenhuma Avaliação Encontrada"
    
    Scenario: Remover avaliação de um usuário
        Given o método "remove_nota" é chamado para o usuário "zezinho_cv" para a reserva "Pousada Sumaré"
        When uma requisição DELETE for enviada para "/Reserva/'Pousada Sumaré'/notas/'zezinho_cv'" 
        Then o status da resposta deve ser "200" 
        And o sistema retorna uma mensagem "Avaliação Removida"