import {getRandomUser} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";

describe('Get all specialties', () => {
    beforeEach(() => {
    })

    it('Should get all specialities with valid token', () => {
        // given
        const user = getRandomUser();
        register(user)
        login(user)

        // when
        cy.api({
            method: 'GET',
            url: 'http://localhost:4001/specialties',
        }).then((response) => {
            const isNephrologist = response.body.find(speciality => speciality.id === 2 && speciality.name === 'Nephrologist');
            expect(response.status).to.eq(200);
            expect(isNephrologist, 'Nephrologist was found').to.exist;
        })
    })
})