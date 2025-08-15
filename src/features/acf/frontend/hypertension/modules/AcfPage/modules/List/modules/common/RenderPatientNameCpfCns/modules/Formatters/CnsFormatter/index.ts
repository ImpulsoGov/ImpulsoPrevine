export const cnsFormatter = (cns: string): string => {
    if (!cns) return "";
    cns = cns.padStart(15, "0");
    const part1 = cns.slice(0, 3);
    const part2 = cns.slice(3, 7);
    const part3 = cns.slice(7, 11);
    const part4 = cns.slice(11, 15);
    return `${part1} ${part2} ${part3} ${part4}`;
};
