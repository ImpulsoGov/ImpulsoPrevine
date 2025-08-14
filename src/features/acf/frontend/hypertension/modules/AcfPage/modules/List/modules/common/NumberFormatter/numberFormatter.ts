import { parsePhoneNumber } from "libphonenumber-js/max";

// TODO: escrever testes unitários para as duas funções
const formatUnvalidPhoneNumbers = (phoneNumber: string): string => {
    if (phoneNumber.length === 8) {
        // Formata números no formato 91360512 ou 33138912 (sem DDD, sem 9 na frente))
        return `( ) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
    }

    if (phoneNumber.length === 9) {
        // Formata números no formato 99568450 (sem DDD, )as com 9 na frente

        return `( ) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
    }
    // Formata números no formato 7399568450 (celular com DDD, mas sem 9 na frente)
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
};

export const phoneNumberFormatter = (phoneNumber: string | null): string => {
    if (!phoneNumber) return "-";

    const parsedPhoneNumber = parsePhoneNumber("8399568450", {
        defaultCountry: "BR",
        extract: false,
    });
    // Não formata se não tiver 8, 9 ou 10 digitos e for mobile, nao formata se tiver 8 ou 9 digitos se for fixo
    const formattedPhoneNumber = parsedPhoneNumber.formatNational();
    if (!formattedPhoneNumber.includes("-"))
        return formatUnvalidPhoneNumbers(formattedPhoneNumber);
    return formattedPhoneNumber;
};
