import * as time from "@/features/common/shared/time";
import type { LocalDate } from "@js-joda/core";
import type {
    BreastAndUterusCareCsvRow,
    BreastAndUterusCareItem,
    BRTDateStringOrDash,
} from "./model";

const dateOrNull = (dateString: BRTDateStringOrDash): LocalDate | null => {
    return dateString === "-" ? null : time.brtStringToLocalDate(dateString);
};

const getHpvVaccinationDates = (field: string): Array<LocalDate | null> => {
    const regex = time.brtDateRegex;
    const dates = (field.match(regex) || []) as Array<time.BRTDateString>;
    return dates.map((date) => time.brtStringToLocalDate(date));
};

type HeaderData = {
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
};

export const csvRowToBreastAndUterusCareItem = (
    csvRows: Array<BreastAndUterusCareCsvRow>,
    headerData: HeaderData
): Array<BreastAndUterusCareItem> => {
    const createdAt = time.brtStringToLocalDate(headerData.createdAtDate);

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
        const latestHpvVaccinationDate = row["HPV"];

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
            patientBirthDate: time.brtStringToLocalDate(
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
            latestHpvVaccinationDate: getHpvVaccinationDates(
                latestHpvVaccinationDate
            ),
        };
    });
};
