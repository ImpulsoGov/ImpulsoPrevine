export const getCurrentQuadrimester = (date = new Date()): number => {
    const month = date.getMonth() + 1;
    return Math.ceil(month / 4);
};
