import {getRandomDoctor} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";
import {getAllSpeciality} from "../../requests/specialities.api";
import {drawTwoRandomIds} from "../../utils/ranodm.array";

describe('Assign specialties', () => {

    it('Should assign specialities to doctor', () => {
        // given
        const user = getRandomDoctor();
        register(user)
        login(user)

        // when
        getAllSpeciality().then((response) => {
            const ids = response.body.map(specialty => specialty.id)
            const randomIds = drawTwoRandomIds(ids)

            cy.api({
                method: 'PUT',
                url: 'http://localhost:4001/users/specialties',
                body: {
                    specialtyIds: randomIds
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })
    })
})