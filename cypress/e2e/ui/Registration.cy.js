/// <reference types="cypress" />

import {getRandomAdmin} from "../../generator/userGenerator";

describe('Register to app', () => {
    beforeEach(() => {
        cy.visit('/register');
    })

    it('Successful register', () => {
        const user = getRandomAdmin();

        cy.get('#firstName').type(user.firstName);
        cy.get('#lastName').type(user.lastName);
        cy.get('#username').type(user.username);
        cy.get('#password').type(user.password);
        cy.get('#email').type(user.email);
        cy.get('[name="ROLE_ADMIN"]').check();
        cy.get('.MuiButton-fullWidth').click();

        cy.get('.MuiAlert-message').should('have.text', 'Registration successful!');
        cy.url().should('contain', '/login');

    })
})
