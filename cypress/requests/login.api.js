export const login = (user) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: user.username,
            password: user.password
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
}