import { faker } from '@faker-js/faker';

export const getRandomUser = () => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: ['ROLE_ADMIN'],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
    }
}