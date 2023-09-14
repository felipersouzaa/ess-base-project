Feature: Cadastro e Login de usuários

    Scenario: Cadastrar usuário com sucesso
        Given estou na página de "/cadastro"
        When preencho o formulário de cadastro
        And seleciono a opção "Cadastrar"
        Then posso ver uma mensagem de sucesso "Usuário cadastrado com sucesso"

    Scenario: Realizar login com sucesso
        Given estou na página de "/login"
        When preencho o formulário de login
        And seleciono a opção "Entrar"
        Then posso ver uma mensagem de sucesso "Login bem-sucedido"

    Scenario: Falha ao realizar login
        Given estou na página de "/login"
        When preencho o formulário de login com as credencias incorretas
        And seleciono a opção "Entrar"
        Then posso ver uma mensagem de erro "Credenciais inválidas"