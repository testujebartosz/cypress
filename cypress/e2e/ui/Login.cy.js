/// <reference types="cypress" />

describe('Login to app', () => {
    beforeEach(() => {
        cy.visit('');
    })

    it('Successful login', () => {
        cy.get('#username').type('doctor');
        cy.get('#password').type('doctor');
        cy.get('.MuiButton-root').last().click();

        cy.get('.MuiBox-root > p').should('contain.text','Congratulations')
    })

    it('Successful redirection to registration page via Sign Up link', () => {
        cy.get('a[href="/register"]').click();

        cy.get('.MuiTypography-h5').should('have.text', 'Register');
        cy.url().should('contain', '/register');
    })

    it('Successful redirection to registration page via header', () => {
        cy.get('.MuiButton-text').contains('Register').click();

        cy.get('.MuiTypography-h5').should('have.text', 'Register');
        cy.url().should('contain', '/register');
    })

    it.only('Unsuccessful login', () => {
        cy.get('#username').type('test');
        cy.get('#password').type('test');
        cy.get('.MuiButton-root').last().click();

        cy.get('.MuiAlert-message').should('have.text', 'Invalid username/password supplied');
    })
})
