import type {
    PregnancyAndPuerperiumCareCsvRow,
    PregnancyAndPuerperiumCareItem,
} from "./model";

export const csvRowToPregnancyAndPuerperiumCareItem = (
    csvRows: Array<PregnancyAndPuerperiumCareCsvRow>
): Array<PregnancyAndPuerperiumCareItem> => {
    return csvRows.map((row) => {
        const appointmentsUntil12thWeek = Number(
            row["Quantidade de atendimentos até 12 semanas no pré-natal"]
        );

        return {
            appointmentsUntil12thWeek,
        };
    });
};
