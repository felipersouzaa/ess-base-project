Feature: Favoritar Reservas

    Scenario: Abrir página de reservas salvas
        Given estou logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página de "Home"
        When seleciono a opção "Minha Lista"
        Then sou redirecionado para a página da "Minha Lista"

    Scenario: Adicionar reserva aos favoritos
        Given estou logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página de "Reservas"
        And vejo "Resort Muro Alto" na página
        And "Resort Muro Alto" não está na "Minha Lista"
        When seleciono a opção "Favoritar" para o "Resort Muro Alto"
        Then vejo que "Resort Muro Alto" pertence à "Minha Lista"

    Scenario: Remover reserva dos favoritos
        Given estou logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página "Minha Lista" 
        And possuo "Resort Muro Alto" na "Minha Lista"
        When eu seleciono a opção "Remover"
        Then "Resort Muro Alto" deixa de pertencer à "Minha Lista"