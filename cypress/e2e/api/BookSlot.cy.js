import {getRandomClient} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login, loginAdmin} from "../../requests/login.api";
import {deleteUser} from "../../requests/deleteUser.api";
import {getSlot} from "../../requests/getSlot.api";

describe('Book a slot', () => {
    let user;

    beforeEach(() => {
        user = getRandomClient();
        register(user);
        login(user);
    })

    afterEach(() => {
        loginAdmin();
        deleteUser(user.username);
    })

    it('Client should be able to book a slot', () => {

        const queryParams = {
            startTime: '2024-02-01T08:00:00',
            endTime: '2024-02-29T08:00:00',
            slotStatus: 'AVAILABLE',
            specialtyId: 29
        };
        getSlot(queryParams).then((response) => {
            const ids = response.body.map(appointmentId => appointmentId.id)
            expect(response.status).to.eq(200);
            expect(ids).to.include(15071);
        })

        cy.api({
            method: 'PUT',
            url: 'http://localhost:4001/slots/15071/book'
        }).then((response) => {
            expect(response.status, 'response status').to.eq(200);
        });

        getSlot(queryParams).then((response) => {
            const ids = response.body.map(appointmentId => appointmentId.id)
            expect(response.status).to.eq(200);
            expect(ids).to.not.include(15071);
        })

        cy.api({
            method: 'PUT',
            url: 'http://localhost:4001/slots/15071/cancel'
        }).then((response) => {
            expect(response.status, 'response status').to.eq(200);
        });

    })
})
