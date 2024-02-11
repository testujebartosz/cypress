import {getRandomAdmin, getRandomClient} from "../../generator/userGenerator";
import {register} from "../../requests/register.api";
import {login, loginAdmin} from "../../requests/login.api";
import {createSpeciality, getSpeciality} from "../../requests/specialities.api";
import {deleteUser} from "../../requests/deleteUser.api";
import {getRandomSpeciality} from "../../generator/specialityGenerator";

describe('Create a new speciality', () => {

    let user;

    afterEach(() => {
        loginAdmin()
        deleteUser(user.username)
    })

    it('Admin should create a new speciality with valid token', () => {
        // given
        user = getRandomAdmin();
        const specialtyName = getRandomSpeciality();
        register(user)
        login(user)

        // when
        cy.api({
            method: 'POST',
            url: 'http://localhost:4001/specialties',
            body: {
                name: specialtyName
            }
        }).then((response) => {
            const specialtyId = response.body.id;
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id').and.be.a('number');

            // then
            getSpeciality(specialtyId).then((response) => {
                expect(response.body).to.deep.equal({id: specialtyId, name: specialtyName});
            })
        })
    })

    it('Client should not be able to create a new speciality', () => {
        // given
        user = getRandomClient();
        register(user)
        login(user)

        // when
        cy.api({
            failOnStatusCode: false,
            method: 'POST',
            url: 'http://localhost:4001/specialties',
            body: {
                name: 'TestName'
            }
        }).then((response) => {
            expect(response.status).to.eq(403);
        })
    })
})