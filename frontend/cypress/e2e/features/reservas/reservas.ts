import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  cy.visit("localhost:3000");
})

// Scenario: Ver todas as reservas sem filtro
//Given: common-step-definitions.ts

Then(
  "posso ver as seguintes opções de reservas {string}, {string}, {string} e {string}",
  (firstReservaTitle: string, secondReservaTitle: string, thirdReservaTitle: string, forthReservaTitle: string) => {
    const reservaTitles = cy.get('[data-cy="reservaTitle"]');
    reservaTitles.should('have.length', 4);
    reservaTitles.should('include.text', firstReservaTitle);
    reservaTitles.should('include.text', secondReservaTitle);
    reservaTitles.should('include.text', thirdReservaTitle);
    reservaTitles.should('include.text', forthReservaTitle);
  }
);

// Scenario: Busar reservas pelo nome com resultados
//Given: common-step-definitions.ts
When(
  "seleciono a opção {string} com o valor {string}",
  (searchButton: string, seaarchTerm: string) => {
    cy.get('[data-cy="searchInput"]').type(seaarchTerm);
    cy.get('[data-cy="searchButton"]').should('have.text', searchButton).click();
  }
);

Then(
  "vejo apenas as reservas {string} e {string}",
  (firstReservaTitle: string, secondReservaTitle: string) => {
    const reservaTitles = cy.get('[data-cy="reservaTitle"]');
    reservaTitles.should('have.length', 2);
    reservaTitles.should('include.text', firstReservaTitle);
    reservaTitles.should('include.text', secondReservaTitle);
  }
);

// Scenario: Busar reservas pelo nome com resultados
// Given: common-step-definitions.ts
// When declarado acima 

Then(
  "posso ver a mensagem de erro {string}",
  (errorMessage: string) => {
    const resultsMessage = cy.get('[data-cy="resultsMessage"]');
    resultsMessage.should('have.text', errorMessage);
  }
);

// Scenario: Filtrar reservas pela classificação
// Given: common-step-definitions.ts

When(
  "seleciono a opção {string} com o campo {string} com o valor {string}",
  (searchButton: string, classificationField: string, classificationValue: string) => {
    cy.get(':nth-child(3) > :nth-child(6)').should('have.text', classificationValue).click();
    cy.get('[data-cy="searchButton"]').should('have.text', searchButton).click();
  }
);

Then(
  "vejo a reserva {string} com o valor {string} para o Campo {string}",
  (reservaTitle: string, classification: string, classificationField: string) => {
    const reservaTitles = cy.get('[data-cy="reservaTitle"]');
    reservaTitles.should('have.length', 2);
    reservaTitles.should('include.text', reservaTitle);
    cy.get('[data-cy="classification"]').first().should('have.text', classification);
  }
);

// Scenario: Filtrar reservas pela faixa de preço
// Given: common-step-definitions.ts

When(
  "seleciono a opção {string} com o campo {string} com o valor {string} e o campo {string} com o valor {string}",
  (searchButton: string, minimumPriceField: string, maximumPriceField: string, minimumPriceValue: string, maximumPriceValue: string) => {
    const minPriceArrows = '{rightArrow}'.repeat(10); 
    cy.get('[style="left: 0%;"]').click({ multiple: true, force: true }).type(minPriceArrows);
    cy.get('[style="left: 100%;"]').click({ multiple: true, force: true }).type('{leftArrow}'.repeat(10));
    cy.get('[data-cy="searchButton"]').should('have.text', searchButton).click();
  }
);

// Scenario: Filtrar reservas pelo tipo de quarto
// Given: common-step-definitions.ts

When(
  "seleciono a opção {string} com o campo Tipos de Quarto com o valor {string}",
  (searchButton: string, roomType: string) => {
    const familyRoomCheckbox = cy.get(':nth-child(4) > :nth-child(4)');
    familyRoomCheckbox.should('have.text', roomType);
    familyRoomCheckbox.click();
    cy.get('[data-cy="searchButton"]').should('have.text', searchButton).click();
  }
);

Then(
  "vejo apenas as seguintes reservas {string}, {string} e {string}",
  (firstReservaTitle: string, secondReservaTitle: string, thirdReservaTitle: string) => {
    const reservaTitles = cy.get('[data-cy="reservaTitle"]');
    reservaTitles.should('have.length', 3);
    reservaTitles.should('include.text', firstReservaTitle);
    reservaTitles.should('include.text', secondReservaTitle);
    reservaTitles.should('include.text', thirdReservaTitle);
  }
)

// Scenario: Filtrar reservas pelo tipo de quarto
// Given: common-step-definitions.ts

When(
  "seleciono a opção {string} com o campo Avaliação dos Hóspedes com o valor {string}",
  (searchButton: string, rating: string) => {
    const fantasticCheckbox = cy.get('._filtersContainer_7nhag_55 > :nth-child(5) > :nth-child(2)')
    fantasticCheckbox.should('have.text', rating);
    fantasticCheckbox.click();
    cy.get('[data-cy="searchButton"]').should('have.text', searchButton).click();
  }
);

Then(
  "vejo apenas a seguinte reserva {string} com o valor {string} para o campo Avaliação",
  (reservaTitle: string, rating: string) => {
    const reservaTitles = cy.get('[data-cy="reservaTitle"]');
    reservaTitles.should('have.length', 1);
    reservaTitles.should('include.text', reservaTitle);
    cy.get('._rating_7nhag_299').should('have.text', rating);
  }
)

// Scenario: Filtrar reservas pelo local
// Given: common-step-definitions.ts

When(
  "preencho o campo {string} com o valor {string}",
  (stateField: string, stateValue:string) => {
    const stateDropdown = cy.get(':nth-child(1) > .css-1ba7hqi-control');
    stateDropdown.should('have.text', stateField);
    stateDropdown.click();
    const stateOption = cy.get('#react-select-3-option-1');
    stateOption.should('have.text', stateValue);
    stateOption.click();
  }
)

When(
  "preencho o campo {string} com o valor {string} e seleciono a opção {string}",
  (cityField: string, cityValue:string, searchButton: string) => {
    const cityDropdown = cy.get(':nth-child(2) > .css-1ba7hqi-control')
    cityDropdown.should('have.text', cityField);
    cityDropdown.click();
    const cityOption = cy.get('#react-select-5-option-1')
    cityOption.should('have.text', cityValue);
    cityOption.click();
    cy.get('[data-cy="searchButton"]').should('have.text', searchButton).click();
  }
)

Then(
  "vejo apenas as seguintes reservas {string} e {string}",
  (firstReservaTitle: string, secondReservaTitle: string) => {
    const reservaTitles = cy.get('[data-cy="reservaTitle"]');
    reservaTitles.should('have.length', 2);
    reservaTitles.should('include.text', firstReservaTitle);
    reservaTitles.should('include.text', secondReservaTitle);
  
  }
)

