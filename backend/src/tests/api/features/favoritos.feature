Feature: Favoritar Reservas
    Scenario: Consultar reservas favoritadas
        Given o FavoritaService é chamado
        And o usuário "zezinho_cv" é preenchido
        When uma requisição GET for enviada para "/favoritos"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve ser um array com os paths para as reservas marcadas

    Scenario: Adicionar reserva aos favoritos
        Given o FavoritaService é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "/favoritos"
        Then o status de resposta deve ser "201"
        And o JSON de paths dos favoritos é atualizada para conter "Pousada Sumaré"

    Scenario: Adicionar reserva repetida aos favoritos
        Given o FavoritaService é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "/favoritos"
        Then o status de resposta deve ser "400"
        And a função "check_existing_fav" retorna 1 para "Pousada Sumaré"
        And o sistema retorna uma mensagem "Reserva já registrada nos favoritos"

    Scenario: Remover reserva nos favoritos
        Given o FavoritaService é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "/favoritos"
        Then o status de resposta deve ser "201"
        And o JSON de paths dos favoritos é atualizada para remover "Pousada Sumaré"

    Scenario: Remover reserva não existente nos favoritos
        Given o FavoritaService é chamado
        And o usuário "zezinho_cv" é preenchido
        And a reserva "Pousada Sumaré" é preenchida
        When uma requisição POST for enviada para "/favoritos"
        Then o status de resposta deve ser "400"
        And a função "check_existing_fav" retorna 0 para "Pousada Sumaré"
        And o sistema retorna uma mensagem "Reserva não registrada nos favoritos"