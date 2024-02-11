import {faker} from '@faker-js/faker';

export const getRandomSpeciality = () => {
    const randomWord = faker.word.noun({length: {min: 3, max: 10}})
    return capitalizeFirstLetter(randomWord);
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);