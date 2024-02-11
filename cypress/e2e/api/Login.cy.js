/// <reference types="cypress" />
import {register} from "../../requests/register.api";
import {getRandomUser} from "../../generator/userGenerator";
import {deleteUser} from "../../requests/deleteUser.api";

describe('Login to app', () => {
    it('successful login', () => {
        // given
        const user = getRandomUser();
        register(user)

        // when
        cy.api({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: user.username,
                password: user.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })

        // clean up
        deleteUser(user.username)
    })

    it('unsuccessful login', () => {
        cy.api({
            failOnStatusCode: false,
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'wrong',
                password: 'wrong'
            }
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.message).to.eq('Invalid username/password supplied');
        })
    })
})
