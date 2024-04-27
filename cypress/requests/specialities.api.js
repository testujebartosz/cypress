export const getSpeciality = (id) => {
    return cy.api({
        method: 'GET',
        url: `http://localhost:4001/specialties/${id}`,
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response;
    })
}

export const createSpeciality = (specialityName) => {
    return cy.api({
        method: 'POST',
        url: 'http://localhost:4001/specialties',
        body: {
            name: specialityName
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        return response;
    })
}

export const getAllSpeciality = () => {
    return cy.api({
        method: 'GET',
        url: 'http://localhost:4001/specialties'
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response;
    })
}

export const assignSpeciality = (id) => {
    return cy.api({
        method: 'PUT',
        url: 'http://localhost:4001/users/specialties',
        body: {
            specialtyIds: id
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
}
