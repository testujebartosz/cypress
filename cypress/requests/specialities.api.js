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
