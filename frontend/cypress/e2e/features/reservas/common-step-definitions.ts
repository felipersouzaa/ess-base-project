import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("estou na página de {string}", (page: string) => {
  cy.visit(page);
});
