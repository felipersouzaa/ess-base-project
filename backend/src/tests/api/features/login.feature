Feature: Login de Usuário

    Scenario: Login de usuário (válido)
        Given o método “realizar_login” é chamado e tem email “diegos87@gmail.com” e senha “87ehnosso”
        When uma solicitação “POST” é feita para “/login”.
        Then o sistema retorna a mensagem de sucesso “Login bem-sucedido”.
        And o código de status do retorno é “200 OK”

    Scenario: Login de usuário (inválido)
        Given o método “realizar_login” é chamado e tem email “diegos87@gmail.com” e senha “santaserieA”
        When uma solicitação “POST” é feita para “/login”.
        Then o sistema retorna a mensagem de erro “Credenciais inválidas”.
        And o código de status do retorno é “401 UNAUTHORIZED”