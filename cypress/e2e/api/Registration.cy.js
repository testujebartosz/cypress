import {getRandomUser} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {deleteUser} from "../../requests/deleteUser.api";
import {login} from "../../requests/login.api";

describe('Create user', () => {

    let user;
    beforeEach(() => {
        user = getRandomUser();
    })

    afterEach(() => {
        login(user);
        deleteUser(user.username);
    })

    it('successful registration', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: user
        }).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('unsuccessful registration', () => {
        // given
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