/// <reference types="cypress" />

import {login, loginAdmin} from "../../requests/login.api";
import {getRandomSpeciality} from "../../generator/specialityGenerator";
import {getRandomDoctor} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {deleteUser} from "../../requests/deleteUser.api";
import {assignSpeciality, getAllSpeciality} from "../../requests/specialities.api";
import {drawTwoRandomIds} from "../../utils/ranodm.array";

describe('Specialties page', () => {

    let user;

    beforeEach(() => {
        user = getRandomDoctor();
        register(user);
        login(user);
        cy.visit('/specialties');
    })

    afterEach(() => {
        loginAdmin();
        deleteUser(user.username);
    })

    it('Should add new specialty', () => {
        const newSpecialty = getRandomSpeciality();
        cy.get('.MuiOutlinedInput-input').type(newSpecialty);
        cy.get('button').contains('Add').click();

        cy.get('.MuiAlert-message').should('have.text', 'Doctor type created and applied successfully!');
        cy.get(`[name=${newSpecialty}`).should('be.checked');
    })

    it('New doctor should have zero specialties', () => {
        cy.get('.MuiGrid-item .MuiCheckbox-root').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        })
    })

    it('New doctor should have one speciality', () => {
        cy.get('[name="Neurologist"]').check();
        cy.reload();

        cy.get('[name="Neurologist"]').should('be.checked');
    })

    it('New doctor should have two specialties', () => {

        getAllSpeciality().then((response) => {
            const ids = response.body.map(specialty => specialty.id)
            const randomIds = drawTwoRandomIds(ids)
            assignSpeciality(randomIds).then((response) => {
                const specialtyNames = response.body.specialties.map(specialty => specialty.name);
                cy.wrap(specialtyNames).as('specialtyNames');
            });
        });
        cy.reload();
        cy.get('@specialtyNames').then((specialtyNames) => {
            specialtyNames.forEach(specialtyName => {
                cy.get(`[name="${specialtyName}"]`).should('be.checked');
            });
        });
    })
});