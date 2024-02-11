export const deleteUser = (username) => {
    cy.api({
        method: 'DELETE',
        url: `http://localhost:4001/users/${username}`,
    }).then((response) => {
        expect(response.status).to.eq(204);
    })
}