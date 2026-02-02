import type {
    PregnancyAndPuerperiumCareCsvRow,
    PregnancyAndPuerperiumCareItem,
} from "./model";

const numberOrNull = (value: string): number | null => {
    return Number.isNaN(Number(value)) ? null : Number(value);
};

export const csvRowToPregnancyAndPuerperiumCareItem = (
    csvRows: Array<PregnancyAndPuerperiumCareCsvRow>
): Array<PregnancyAndPuerperiumCareItem> => {
    return csvRows.map((row) => {
        const appointmentsUntil12thWeek = Number(
            row["Quantidade de atendimentos até 12 semanas no pré-natal"]
        );
        const gestationalAgeByLastMenstrualPeriodWeeks = numberOrNull(
            row["IG (DUM) (semanas)"]
        );
        const gestationalAgeByLastMenstrualPeriodDays = numberOrNull(
            row["IG (DUM) (dias)"]
        );
        const gestationalAgeByObstreticalUltrasoundWeeks = numberOrNull(
            row["IG (ecografia obstétrica) (semanas)"]
        );
        const gestationalAgeByObstreticalUltrasoundDays = numberOrNull(
            row["IG (ecografia obstétrica) (dias)"]
        );
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
        const patientName = row["Nome"];
        const patientCpf = row["CPF"];
        const patientCns = row["CNS"];
        const patientPhoneNumber =
            row["Telefone celular"] ||
            row["Telefone residencial"] ||
            row["Telefone de contato"];
        const patientAge = row["Idade"];
        const microAreaName = row["Microárea"];

        return {
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
        };
    });
};
