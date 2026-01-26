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
        const homeVisitsDuringPregnancy = Number(
            row["Quantidade de visitas domiciliares no pré-natal"]
        );
        const weightAndHeightMeasurements = Number(
            row["Quantidade de medições simultâneas de peso e altura"]
        );

        return {
            appointmentsUntil12thWeek,
            gestationalAgeByLastMenstrualPeriodWeeks,
            gestationalAgeByLastMenstrualPeriodDays,
            gestationalAgeByObstreticalUltrasoundWeeks,
            gestationalAgeByObstreticalUltrasoundDays,
            appointmentsDuringPrenatal,
            homeVisitsDuringPuerperium,
            appointmentsDuringPuerperium,
            homeVisitsDuringPregnancy,
            weightAndHeightMeasurements,
        };
    });
};
