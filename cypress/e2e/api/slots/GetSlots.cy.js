import { getRandomAdmin } from "../../../generator/userGenerator";
import { register } from "../../../requests/register.api";
import { login } from "../../../requests/login.api";
import { deleteUser } from "../../../requests/deleteUser.api";
import { getSlot } from "../../../requests/getSlot.api";
import { generateDateDaysAhead } from "../../../utils/date";
import { assertSlots } from "../../../assertions/slots";
import { getSpeciality } from "../../../requests/specialities.api";
import { getAllUsers } from "../../../requests/getUsers.api";

describe('Get available slots', () => {
    let user;
    beforeEach(() => {
        user = getRandomAdmin();
        register(user);
        login(user);
    })

    afterEach(() => {
        deleteUser(user.username);
    })

    it('Should get available slots', () => {
        // given
        const idToQuery = 1
        const queryParams = {
            startTime: generateDateDaysAhead(1),
            endTime: generateDateDaysAhead(8),
            slotStatus: 'AVAILABLE',
            specialtyId: idToQuery
        };

        // when
        getSpeciality(idToQuery).then(specialtyResponse => {
            getAllUsers().then((getAllUsersResponse) => {
                const userToPass = getAllUsersResponse.body.find((user) => user.specialties.length > 0 && user.specialties[0].id === idToQuery);
                cy.wrap(userToPass).then(user => {
                    getSlot(queryParams).then((slotsResponse) => {
                        assertSlots(slotsResponse.body, specialtyResponse.body, user)
                    })
                });
            })
        })
    })
})


