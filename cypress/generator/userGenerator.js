import {faker} from '@faker-js/faker';

export const getRandomAdmin = () => {
    return {
        ...getCommonFields(),
        roles: ['ROLE_ADMIN'],
    }
}

export const getRandomClient = () => {
    return {
        ...getCommonFields(),
        roles: ['ROLE_CLIENT'],
    }
}

export const getRandomDoctor = () => {
    return {
        ...getCommonFields(),
        roles: ['ROLE_DOCTOR'],
    }
}

const getCommonFields = () => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
    }
}
