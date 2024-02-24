export const getAllUsers = () => {
    return cy.api({
        method: 'GET',
        url: 'http://localhost:4001/users',
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response;
    })
}