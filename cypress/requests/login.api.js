export const login = (user) => {
    loginWithBody({
        username: user.username,
        password: user.password
    })
}

export const loginAdmin = () => {
    loginWithBody({
        username: 'admin',
        password: 'admin'
    })
}

export const loginDoctor = () => {
    loginWithBody({
        username: 'doctor',
        password: 'doctor'
    })
}

const loginWithBody = (body) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: body
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
}