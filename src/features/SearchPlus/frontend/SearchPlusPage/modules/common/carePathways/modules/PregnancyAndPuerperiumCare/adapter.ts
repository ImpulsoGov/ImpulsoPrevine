import type { BRTDateString } from "@/features/common/shared/time";
import { brtStringToLocalDate } from "@/features/common/shared/time";
import type {
    PregnancyAndPuerperiumCareCsvRow,
    PregnancyAndPuerperiumCareItem,
    WeekDayIndex,
} from "./model";
import type { LocalDate } from "@js-joda/core";

const numberOrNull = (value: string): number | null => {
    return Number.isNaN(Number(value)) ? null : Number(value);
};

const isStringYes = (value: string): boolean => {
    return value.toLowerCase() === "sim";
};

const gestationalAgeDayOrNull = (value: string): WeekDayIndex | null => {
    const number = numberOrNull(value);
    if (number === null || (number >= 0 && number <= 6)) {
        return number as WeekDayIndex | null;
    }
    return null;
};
//TODO: criar testes unitários para essa função
const parseDtpaDoseDates = (
    tetanusDiphtheriaPertussisVaccineDoses: string
): Array<LocalDate> => {
    const doses = tetanusDiphtheriaPertussisVaccineDoses.split("|");
    if (doses.length === 1 && doses[0].trim() === "") return [];
    if (doses.length === 0) return [];
    if (doses.some((dose) => !dose.includes("-") || !dose.includes("/")))
        return [];
    const dosesDates = doses.map(
        (dose) =>
            brtStringToLocalDate(
                dose.split("-")[1].trim() as BRTDateString
            ) as LocalDate
    );
    return dosesDates;
};

export const csvRowToPregnancyAndPuerperiumCareItem = (
    csvRows: Array<PregnancyAndPuerperiumCareCsvRow>,
    createdAtString: string
): Array<PregnancyAndPuerperiumCareItem> => {
    const createdAt = brtStringToLocalDate(
        createdAtString as BRTDateString
    ) as LocalDate;

    return csvRows.map((row) => {
        const appointmentsUntil12thWeek = Number(
            row["Quantidade de atendimentos até 12 semanas no pré-natal"]
        );
        const gestationalAgeByLastMenstrualPeriodWeeks = numberOrNull(
            row["IG (DUM) (semanas)"]
        );
        const gestationalAgeByLastMenstrualPeriodDays = gestationalAgeDayOrNull(
            row["IG (DUM) (dias)"]
        );
        const gestationalAgeByObstreticalUltrasoundWeeks = numberOrNull(
            row["IG (ecografia obstétrica) (semanas)"]
        );
        const gestationalAgeByObstreticalUltrasoundDays =
            gestationalAgeDayOrNull(row["IG (ecografia obstétrica) (dias)"]);
        const appointmentsDuringPrenatal = Number(
            row["Quantidade de atendimentos no pré-natal"]
        );
        const homeVisitsDuringPuerperium = Number(
            row["Quantidade de visitas domiciliares no puerpério"]
        );
        const appointmentsDuringPuerperium = Number(
            row["Quantidade de atendimentos no puerpério"]
        );
        const bloodPressureMeasurements = Number(
            row["Quantidade de medições de pressão arterial"]
        );
        const homeVisitsDuringPregnancy = Number(
            row["Quantidade de visitas domiciliares no pré-natal"]
        );
        const weightAndHeightMeasurements = Number(
            row["Quantidade de medições simultâneas de peso e altura"]
        );
        const dentalAppointmentsDuringPrenatal = Number(
            row["Quantidade de atendimentos odontológicos no pré-natal"]
        );
        const didHivTestDuringFirstTrimester = isStringYes(
            row["Exame de HIV no primeiro trimestre"]
        );
        const didSyphilisTestDuringFirstTrimester = isStringYes(
            row["Exame de Sífilis no primeiro trimestre"]
        );
        const didHepatitisBTestDuringFirstTrimester = isStringYes(
            row["Exame de Hepatite B no primeiro trimestre"]
        );
        const didHepatitisCTestDuringFirstTrimester = isStringYes(
            row["Exame de Hepatite C no primeiro trimestre"]
        );
        const patientName = row["Nome"];
        const patientCpf = row["CPF"];
        const patientCns = row["CNS"];
        const patientPhoneNumber =
            row["Telefone celular"] ||
            row["Telefone residencial"] ||
            row["Telefone de contato"];
        const patientAge = row["Idade"];
        const microAreaName = row["Microárea"];
        const didHivExamAtThirdTrimester = isStringYes(
            row["Exame de HIV no terceiro trimestre"]
        );
        const didSyphilisExamAtThirdTrimester = isStringYes(
            row["Exame de Sifilis no terceiro trimestre"]
        );
        const tetanusDiphtheriaPertussisVaccineDoses = parseDtpaDoseDates(
            row["dTpa"]
        );

        return {
            didHivTestDuringFirstTrimester,
            didSyphilisTestDuringFirstTrimester,
            didHepatitisBTestDuringFirstTrimester,
            didHepatitisCTestDuringFirstTrimester,
            appointmentsUntil12thWeek,
            gestationalAgeByLastMenstrualPeriodWeeks,
            gestationalAgeByLastMenstrualPeriodDays,
            gestationalAgeByObstreticalUltrasoundWeeks,
            gestationalAgeByObstreticalUltrasoundDays,
            appointmentsDuringPrenatal,
            homeVisitsDuringPuerperium,
            appointmentsDuringPuerperium,
            bloodPressureMeasurements,
            homeVisitsDuringPregnancy,
            weightAndHeightMeasurements,
            dentalAppointmentsDuringPrenatal,
            patientName,
            patientCpf,
            patientCns,
            patientPhoneNumber,
            patientAge,
            microAreaName,
            didHivExamAtThirdTrimester,
            didSyphilisExamAtThirdTrimester,
            tetanusDiphtheriaPertussisVaccineDoses,
            createdAt,
        };
    });
};
