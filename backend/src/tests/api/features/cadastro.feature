Feature: Cadastro de Usuário
    
    Scenario: Cadastro de novo usuário (válido)
        Given o método de cadastro de usuário é chamado e tem nome “Diego Souza”, cpf “12312312312”, email “diegos87@gmail.com”, telefone “81998765432”, endereco “Avenida Conselheiro Aguiar 555” e senha “87ehnosso”
        When uma solicitação “POST” é feita para “/cadastro”.
        Then o sistema retorna a mensagem de sucesso “Usuário cadastrado com sucesso”.
        And o código de status do retorno é “201 CREATED”

    Scenario: Cadastro de novo usuário (inválido)
        Given o método “cadastrar_usuario” é chamado e tem nome “Lebron James”, cpf “12354323467”, email “diegos87@gmail.com”, telefone “81998765432”, endereco “Avenida Conselheiro Aguiar 555” e senha “87ehnosso”
        When uma solicitação “POST” é feita para “/cadastro”.
        Then o sistema retorna a mensagem de erro “Email já cadastrado”.
        And o código de status do retorno é “400 BAD REQUEST”

    Scenario: Cadastro de novo usuário (inválido)
        Given o método “cadastrar_usuario” é chamado e tem nome “Lebron James”, cpf “12312312312”, email “kingjames@gmail.com”, telefone “81998765432”, endereco “Avenida Conselheiro Aguiar 555” e senha “87ehnosso”
        When uma solicitação “POST” é feita para “/cadastro”.
        Then o sistema retorna a mensagem de erro “CPF já cadastrado”.
        And o código de status do retorno é “400 BAD REQUEST”