// import type { LocalDate } from "@js-joda/core";
import type {
    PregnancyAndPuerperiumCareCsvRow,
    PregnancyAndPuerperiumCareItem,
} from "./model";

// type HeaderData = {
//     createdAtDate: time.BRTDateString;
//     createdAtTime: time.BRTTimeString;
// };

export const csvRowToPregnancyAndPuerperiumCareItem = (
    csvRows: Array<PregnancyAndPuerperiumCareCsvRow>
    // headerData: HeaderData
): Array<PregnancyAndPuerperiumCareItem> => {
    // const createdAt = time.brtStringToLocalDate(headerData.createdAtDate);

    return csvRows.map((row) => {
        const appointmentsUntil12thWeek = Number(
            row["Quantidade de atendimentos até 12 semanas no pré-natal"]
        );

        return {
            appointmentsUntil12thWeek,
        };
    });
};
