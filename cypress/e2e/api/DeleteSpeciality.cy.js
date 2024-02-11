import {getRandomUser} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";
import {createSpeciality, getSpeciality} from "../../requests/specialities.api";

describe('Create a new speciality', () => {
    beforeEach(() => {
    })

    it('User should be able to delete a speciality', () => {
        // given
        const user = getRandomUser();
        register(user)
        login(user)

        // when
        createSpeciality('TestSpeciality').then((response) => {
            const specialtyId = response.body.id
            expect(response.body).to.have.property('id').and.be.a('number');

            cy.api({
                method: 'DELETE',
                url: `http://localhost:4001/specialties/${specialtyId}`,
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })
    })
})