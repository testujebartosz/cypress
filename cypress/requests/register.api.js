export const register = (user) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    }).then((response) => {
        expect(response.status).to.eq(201);
    })
}