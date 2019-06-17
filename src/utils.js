export const random = (min, max) => {
    const ranNum =  Math.random() * (max - min) + min;
    return Math.floor(ranNum);
};
