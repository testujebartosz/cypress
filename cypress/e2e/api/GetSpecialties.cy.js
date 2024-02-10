import {getRandomUser} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";

describe('Get specific specialities', () => {
    beforeEach(() => {
    })

    it('Should get specific speciality with valid token', () => {
        // given
        const user = getRandomUser();
        register(user)
        login(user)

        // when
        cy.api({
            method: 'GET',
            url: 'http://localhost:4001/specialties/11',
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal({ id: 11, name: 'Endocrinologist'});
        })
    })
})