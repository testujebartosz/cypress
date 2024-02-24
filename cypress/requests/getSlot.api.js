export const getSlot = (queryParams) => {
   return cy.api({
        method: 'GET',
        url: 'http://localhost:4001/slots',
        qs: queryParams
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response;
    })
}