import {getRandomUser} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";
import {createSpeciality, getSpeciality} from "../../requests/specialities.api";

describe('Create a new speciality', () => {
    beforeEach(() => {
    })

    it('User should create a new speciality with valid token', () => {
        // given
        const user = getRandomUser();
        register(user)
        login(user)

        // when
        createSpeciality('Dietician').then((response) => {
            const specialtyId = response.body.id
            expect(response.body).to.have.property('id').and.be.a('number');

            getSpeciality(specialtyId).then((response) => {
                expect(response.body).to.deep.equal({id: specialtyId, name: 'Dietician'});
            })
        })
    })
})