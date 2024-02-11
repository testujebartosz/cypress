import {getRandomAdmin} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";
import {deleteUser} from "../../requests/deleteUser.api";

describe('Get users', () => {
    let user;
    beforeEach(() => {
        user = getRandomAdmin();
        register(user);
        login(user);
    })

    afterEach(() => {
        deleteUser(user.username);
    })

    it('Should get users with valid cookie', () => {
        // when
        cy.api({
            method: 'GET',
            url: 'http://localhost:4001/users',
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
})
