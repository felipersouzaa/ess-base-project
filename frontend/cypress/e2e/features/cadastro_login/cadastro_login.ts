import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
    cy.visit("localhost:3000");
  })

When('o usuário preenche o formulário de cadastro', () => {
  cy.get('input[name="nome"]').type('Nome de Teste');
  cy.get('input[name="cpf"]').type('12345678901');
  cy.get('input[name="email"]').type('teste@example.com');
  cy.get('input[name="endereco"]').type('123 Rua dos Testes');
  cy.get('input[name="telefone"]').type('555-555-5555');
  cy.get('input[name="senha"]').type('senha123');
  cy.get('button[type="submit"]').click();
});

Then('o usuário deve ver uma mensagem de sucesso', () => {
    cy.contains('Usuário cadastrado com sucesso').should('exist');
  });

When('o usuário preenche o formulário de login', () => {
  cy.get('input[name="email"]').type('teste@example.com');
  cy.get('input[name="senha"]').type('senha123');
  cy.get('button[type="submit"]').click();
});

Then('o usuário deve ver uma mensagem de login bem-sucedido', () => {
  cy.contains('Login bem-sucedido').should('exist');
});

When('o usuário preenche o formulário de login', () => {
    cy.get('input[name="email"]').type('teste@example.com');
    cy.get('input[name="senha"]').type('senha1234');
    cy.get('button[type="submit"]').click();
  });

Then('o usuário deve ver uma mensagem de erro de credenciais inválidas', () => {
  cy.contains('Credenciais inválidas').should('exist');
});