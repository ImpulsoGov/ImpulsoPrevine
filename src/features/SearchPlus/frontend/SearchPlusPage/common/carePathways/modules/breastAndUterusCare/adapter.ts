import * as time from "@/features/common/shared/time";
import type {
    BreastAndUterusCareCsvRow,
    BreastAndUterusCareItem,
} from "./model";

export const csvRowToBreastAndUterusCareItem = (
    csvRows: Array<BreastAndUterusCareCsvRow>
): Array<BreastAndUterusCareItem> => {
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
            patientBirthDate: new Date(
                time.nonStandardToISO(row["Data de nascimento"])
            ),
            // createdAt: new Date(time.nonStandardToISO(row["Gerado em"])),
            papTestLatestRequestDate:
                papTestLatestRequestDate === "-"
                    ? null
                    : new Date(time.nonStandardToISO(papTestLatestRequestDate)),
            papTestLatestEvaluationDate:
                papTestLatestEvaluationDate === "-"
                    ? null
                    : new Date(
                          time.nonStandardToISO(papTestLatestEvaluationDate)
                      ),
            mammographyLatestRequestDate:
                mammographyLatestRequestDate === "-"
                    ? null
                    : new Date(
                          time.nonStandardToISO(mammographyLatestRequestDate)
                      ),
            mammographyLatestEvaluationDate:
                mammographyLatestEvaluationDate === "-"
                    ? null
                    : new Date(
                          time.nonStandardToISO(mammographyLatestEvaluationDate)
                      ),
            latestSexualAndReproductiveHealthAppointmentDate:
                latestSexualAndReproductiveHealthAppointmentDate === "-"
                    ? null
                    : new Date(
                          time.nonStandardToISO(
                              latestSexualAndReproductiveHealthAppointmentDate
                          )
                      ),
        };
    });
};
