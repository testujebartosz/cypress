import {getRandomAdmin, getRandomClient} from "../../../generator/userGenerator";
import {register} from "../../../requests/register.api";
import {login, loginAdmin} from "../../../requests/login.api";
import {deleteUser} from "../../../requests/deleteUser.api";
import {getSlot} from "../../../requests/getSlot.api";
import {generateDateDaysAhead} from "../../../utils/date";

describe('Book a slot', () => {
    let user;

    beforeEach(() => {
        user = getRandomClient();
        register(user);
        login(user);
    })

    afterEach(() => {
        loginAdmin()
        deleteUser(user.username)
    })

    it('Client should be able to book a slot', () => {

        const idToQuery = 1
        const queryParams = {
            startTime: generateDateDaysAhead(1),
            endTime: generateDateDaysAhead(8),
            slotStatus: 'AVAILABLE',
            specialtyId: idToQuery
        };

        getSlot(queryParams).then((response) => {
            const slots = response.body;
            const availableSlot = slots.find(slot => slot.status === 'AVAILABLE');
            cy.api({
                method: 'PUT',
                url: `http://localhost:4001/slots/${availableSlot.id}/book`
            }).then((response) => {
                expect(response.status, 'response status').to.eq(200);
            });
            getSlot(queryParams).then((response) => {
                const ids = response.body.map(appointmentId => appointmentId.id)
                expect(response.status).to.eq(200);
                expect(ids).to.not.include(availableSlot.id);
            })
        });
    })
})
