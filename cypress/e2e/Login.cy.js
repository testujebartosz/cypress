/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('');
    })

    it('displays two todo items by default', () => {
        cy.get('#username').type('doctor');
        cy.get('#password').type('doctor');
        cy.get('.MuiButton-root').last().click();

        cy.get('.MuiBox-root > p').should('contain.text','Congratulations')
    })
})
