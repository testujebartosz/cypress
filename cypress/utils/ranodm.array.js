export const drawTwoRandomIds = (array) => {
    const index1 = Math.floor(Math.random() * array.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * array.length);
    } while (index2 === index1); // Ensure the second index is different from the first

    return [array[index1], array[index2]];
};