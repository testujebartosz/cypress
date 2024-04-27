/// <reference types="cypress" />

import {loginAdmin} from "../../requests/login.api";

describe('Home page', () => {
    beforeEach(() => {
        loginAdmin();
        cy.visit('');
    })

    it('Should display gallery', () => {
        cy.get('.image-gallery-image').should('be.visible');

    })

    it('Should logout', () => {
        cy.get('.MuiAvatar-circular').click();
        cy.get('.MuiTypography-body1').contains('Logout').click();

        cy.url().should('contain', '/login');
    })

    it.only('Should be redirect to Specialties page', () => {
        cy.get('.MuiButton-text').contains('Specialties').click();

        cy.get('.MuiTypography-h4').should('have.text', 'Please select your specialties');
        cy.url().should('contain', '/specialties');
    })
})
