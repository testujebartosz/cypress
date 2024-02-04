import {getRandomUser} from "../../generator/usergenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";

describe('Get users', () => {
    beforeEach(() => {
    })

    it('Should get users with valid cookie', () => {
        // given
        const user = getRandomUser();
        register(user)
        login(user)

        // when
        cy.api({
            method: 'GET',
            url: 'http://localhost:4001/users',
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body)
        })
    })
})
