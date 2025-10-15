import type {
    BreastAndUterusCareCsvRow,
    BreastAndUterusCareItem,
} from "./model";

export const csvRowToBreastAndUterusCareItem = (
    csvRows: Array<BreastAndUterusCareCsvRow>
): Array<BreastAndUterusCareItem> => {
    return csvRows.map((row) => {
        return {
            patientName: row["Nome"],
            patientCpf: row["CPF"],
            patientCns: row["CNS"],
            patientAge: row["Idade"],
            patientPhoneNumber:
                row["Telefone celular"] ||
                row["Telefone residencial"] ||
                row["Telefone de contato"],
            microAreaName: row["Microárea"],
        };
    });
};
