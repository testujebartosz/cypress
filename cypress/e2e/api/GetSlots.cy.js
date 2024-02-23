import {getRandomAdmin} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login} from "../../requests/login.api";
import {deleteUser} from "../../requests/deleteUser.api";
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
        const queryParams = {
            startTime: '2024-02-01T08:00:00',
            endTime: '2024-02-29T08:00:00',
            slotStatus: 'AVAILABLE',
            specialtyId: 29
        };
        // when
        cy.api({
            method: 'GET',
            url: 'http://localhost:4001/slots',
            qs: queryParams
        }).then((response) => {
            expect(response.status).to.eq(200);

            cy.wrap(response.body).each((appointment) => {
                expect(appointment.doctorFullName).to.equal('Leila Altenwerth');
                expect(appointment.doctorSpecialties).to.deep.equal(['Infectious disease specialist']);
                expect(appointment.status).to.equal('AVAILABLE');

                if (appointment.id ===  16066) {
                    expect(appointment.startTime).to.equal("2024-02-26T08:00:00");
                    expect(appointment.endTime).to.equal("2024-02-26T09:00:00");
                } else if (appointment.id ===  16067) {
                    expect(appointment.startTime).to.equal("2024-02-26T09:00:00");
                    expect(appointment.endTime).to.equal("2024-02-26T10:00:00");
                }
            });
        })
    })
})
