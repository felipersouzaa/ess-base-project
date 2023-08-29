Feature: Avaliar Reserva

    Scenario: Abrir página de avaliação
        Given eu logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página de "Reservas"
        And reservei uma vez no "Resort Muro Alto"
        When seleciono a opção "Avaliar" 
        Then sou redirecionado para a aba "Avaliar" da reserva "Resort Muro Alto"
        And posso ver os campos "Localização", "Atendimento", "Infraestrutura", "Limpeza", "Conforto", "Serviços Oferecidos" e "Comentários Extras"
        And posso selecionar a opção "Enviar"

    Scenario: Completar avaliação
        Given eu logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página "Avaliar" da reserva "Resort Muro Alto"
        And posso ver os campos "Localização", "Atendimento", "Infraestrutura", "Limpeza", "Conforto" e "Serviços Oferecidos" preenchidos respectivamente com "6", "7", "5", "8", "5", "3"
        When seleciono a opção "Enviar"
        Then minha avaliação é salva e eu sou encaminhado para a página "Reservas"

    Scenario: Avaliar sem campo obrigatório preenchido
        Given eu logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página "Avaliar" da reserva "Resort Muro Alto"
        And os campos "Localização", "Atendimento", "Infraestrutura" não estão preenchidos 
        And os campos "Limpeza", "Conforto" e "Serviços Oferecidos" estão preenchidos com "8", "5", "3"
        When seleciono a opção "Enviar"
        Then vejo a mensagem de erro "Campo Obrigatório não preenchido"

    Scenario: Cancelar avaliação
        Given eu logado no perfil "Zezinho" com o login "zezinho@gmail.com" e senha "a1b2c3"
        And estou na página "Avaliar" da reserva  "Resort Muro Alto"
        When seleciono a opção "Retornar"
        Then sou encaminhado para a página de "Reservas"

    Scenario: Apagar avaliação
        Given eu logado no perfil “Zezinho” com o login "zezinho@gmail.com" e senha "a1b2c3"
        And vejo a reserva  "Resort Muro Alto"
        And vejo a opção "Apagar" em "Minha Avaliação"
        When seleciono "Apagar"
        Then vejo a mensagem de confirmação "Minha Avaliação" foi removida de "Resort Muro Alto"