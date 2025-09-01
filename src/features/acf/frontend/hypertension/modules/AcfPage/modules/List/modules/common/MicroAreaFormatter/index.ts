export const microAreaFormatter = (areaCode: string | null | undefined) => {
    if (areaCode && !Number.isNaN(Number(areaCode))) {
        const parsed = parseInt(areaCode);
        return `Área ${parsed.toString()}`;
    }
    if (areaCode === "FA") return "Fora de área";
    return "Sem microárea";
};
