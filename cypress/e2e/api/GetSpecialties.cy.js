import {getRandomAdmin} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";
import {getSpeciality} from "../../requests/specialities.api";

describe('Get specific specialities', () => {
    beforeEach(() => {
    })

    it('Should get specific speciality with valid token', () => {
        // given
        const user = getRandomAdmin();
        register(user)
        login(user)

        // when
        getSpeciality(11).then((response) => {
            expect(response.body).to.have.property('id', 11);
        })
    })
})