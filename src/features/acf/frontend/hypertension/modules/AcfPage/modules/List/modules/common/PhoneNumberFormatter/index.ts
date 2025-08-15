import parsePhoneNumber from "libphonenumber-js";

const invalidPhoneNumberFormatter = (phoneNumber: string): string => {
    if (phoneNumber.length === 8) {
        // Formata números no formato 91360512 ou 33138912 (sem DDD, sem 9 na frente)
        return `( ) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
    }

    if (phoneNumber.length === 9) {
        // Formata números no formato 99568450 (sem DDD, mas com 9 na frente)

        return `( ) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
    }
    // Formata números no formato 7399568450 (celular com DDD, mas sem 9 na frente)
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
};

export const phoneNumberFormatter = (phoneNumber: string | null): string => {
    if (!phoneNumber) return "-";

    const parsedPhoneNumber = parsePhoneNumber(phoneNumber.replace(/\D/g, ""), {
        defaultCountry: "BR",
        defaultCallingCode: "55",
        extract: true,
    });

    // Na teoria, esse caso não deve acontecer
    if (!parsedPhoneNumber) return "-";

    // Não formata se receber telefone sem DDD (fixo e celular)
    // ou com DDD, mas sem o 9 na frente (celular)
    const formattedPhoneNumber = parsedPhoneNumber.formatNational();

    if (!formattedPhoneNumber.includes("-"))
        return invalidPhoneNumberFormatter(formattedPhoneNumber);

    return formattedPhoneNumber;
};
