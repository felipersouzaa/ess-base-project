Feature: Favoritar Reservas
"""
    Scenario: Consultar reservas favoritadas
        Given a reserva "Pousada Sumaré" está registrada no sistema
        And o sistema possui a reserva "Pousada Sumaré" nos favoritos
        When eu peço ao sistemas para consultar as reservas favoritadas
        Then o sistema retorna um array com o nome "Pousada Sumaré"

    Scenario: Adicionar reserva aos favoritos
        Given Given estou logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And a reserva "Pousada Sumaré" está registrada no sistema
        When eu peço ao sistema para adicionar "Pousada Sumaré" ao array de "Reservas_Favoritas"
        Then o sistema atualiza o array de "Reservas_Favoritas" com "Pousada Sumaré"
    
    Scenario: Remover reserva dos favoritos
        Given Given estou logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And a reserva "Pousada Sumaré" está registrada no sistema
        When eu peço ao sistema para remover "Pousada Sumaré" do array de "Reservas_Favoritas"
        Then o sistema atualiza o array de "Reservas_Favoritas" sem "Pousada Sumaré"
"""

    Scenario: Consultar reservas favoritadas
        Given o método "consulta_fav" é chamado
        And o usuário "zezinho_cv" é preenchido
        When uma requisição GET for enviada para "User/'zezinho_cv'/favoritos"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve ser um array com os paths para as reservas marcadas

    Scenario: Adicionar reserva aos favoritos
        Given o método "add_fav" é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "User/'zezinho_cv'/favoritos"
        Then o status de resposta deve ser "201"
        And o JSON de paths dos favoritos é atualizada para conter "Pousada Sumaré"

    Scenario: Adicionar reserva repetida aos favoritos
        Given o método "add_fav" é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "User/'zezinho_cv'/favoritos"
        Then o status de resposta deve ser "400"
        And a função "check_existing_fav" retorna 1 para "Pousada Sumaré"
        And o sistema retorna uma mensagem "Reserva já registrada nos favoritos"

    Scenario: Remover reserva nos favoritos
        Given o método "remove_fav" é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "User/'zezinho_cv'/favoritos"
        Then o status de resposta deve ser "201"
        And o JSON de paths dos favoritos é atualizada para remover "Pousada Sumaré"

    Scenario: Remover reserva não existente nos favoritos
        Given o método "remove_fav" é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "User/'zezinho_cv'/favoritos"
        Then o status de resposta deve ser "400"
        And a função "check_existing_fav" retorna 0 para "Pousada Sumaré"
        And o sistema retorna uma mensagem "Reserva não registrada nos favoritos"