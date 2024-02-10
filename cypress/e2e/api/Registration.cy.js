import {getRandomUser} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";

describe('Create user', () => {
    beforeEach(() => {
    })

    it('successful registration', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: getRandomUser()
        }).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('unsuccessful registration', () => {
        // given
        const user = getRandomUser();
        register(user)

        // when + // then
        cy.api({
            failOnStatusCode: false,
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: user
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.message).to.eq('Username is already in use');
        })
    })
})