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
            const isNephrologist = response.body.find(speciality => speciality.name === 'Nephrologist');
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            isNephrologist ?
                expect(isNephrologist, 'Nephrologist was found').to.exist
                :
                expect(isNephrologist, 'Nephrologist was NOT found').to.exist
        })
    })

    it('Unsuccessful fetching of all specialties - user not logged in', () => {
        cy.api({
            failOnStatusCode: false,
            method: 'GET',
            url: 'http://localhost:4001/specialties',
        }).then((response) => {
            expect(response.status).to.eq(403);
        })
    })
})