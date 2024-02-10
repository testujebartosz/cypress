/// <reference types="cypress" />
import {register} from "../../requests/register.api";
import {getRandomUser} from "../../generator/userGenerator";

describe('Login to app', () => {
    beforeEach(() => {
    })

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
