import * as time from "@/features/common/shared/time";
import type {
    BreastAndUterusCareCsvRow,
    BreastAndUterusCareItem,
    BRTDateStringOrDash,
} from "./model";

const dateOrNull = (dateString: BRTDateStringOrDash): Date | null => {
    return dateString === "-" ? null : time.brtStringToUtcDate(dateString);
};

type HeaderData = {
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
};

export const csvRowToBreastAndUterusCareItem = (
    csvRows: Array<BreastAndUterusCareCsvRow>,
    headerData: HeaderData
): Array<BreastAndUterusCareItem> => {
    const createdAt = time.brtStringToUtcDate(
        headerData.createdAtDate,
        headerData.createdAtTime
    );

    return csvRows.map((row) => {
        const papTestLatestRequestDate =
            row[
                "Exame de rastreamento de câncer de colo de útero data última solicitação"
            ];
        const papTestLatestEvaluationDate =
            row[
                "Exame de rastreamento de câncer de colo de útero data última avaliação"
            ];
        const mammographyLatestRequestDate =
            row[
                "Exame de rastreamento de câncer de mama data Última solicitação"
            ];
        const mammographyLatestEvaluationDate =
            row[
                "Exame de rastreamento de câncer de mama data Última avaliação"
            ];
        const latestSexualAndReproductiveHealthAppointmentDate =
            row["Data da última consulta de saúde sexual e reprodutiva"];

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
            patientBirthDate: time.brtStringToUtcDate(
                row["Data de nascimento"]
            ),
            createdAt: createdAt,
            papTestLatestRequestDate: dateOrNull(papTestLatestRequestDate),
            papTestLatestEvaluationDate: dateOrNull(
                papTestLatestEvaluationDate
            ),
            mammographyLatestRequestDate: dateOrNull(
                mammographyLatestRequestDate
            ),
            mammographyLatestEvaluationDate: dateOrNull(
                mammographyLatestEvaluationDate
            ),
            latestSexualAndReproductiveHealthAppointmentDate: dateOrNull(
                latestSexualAndReproductiveHealthAppointmentDate
            ),
        };
    });
};
