// TODO: escrever teste
export const microAreaFormatter = (areaCode: string | null): string => {
    if (areaCode === "FA") return "Fora de área";
    if (!Number.isNaN(Number(areaCode)) && areaCode) {
        return `Área ${areaCode}`;
    }
    return "-";
};
