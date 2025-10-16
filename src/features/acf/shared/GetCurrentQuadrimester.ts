// TODO: usar getUTCMonth e formatar para BRT nos lugares onde for usada
export const getCurrentQuadrimester = (date = new Date()): 1 | 2 | 3 => {
    const month = date.getMonth() + 1;
    return Math.ceil(month / 4) as 1 | 2 | 3;
};
