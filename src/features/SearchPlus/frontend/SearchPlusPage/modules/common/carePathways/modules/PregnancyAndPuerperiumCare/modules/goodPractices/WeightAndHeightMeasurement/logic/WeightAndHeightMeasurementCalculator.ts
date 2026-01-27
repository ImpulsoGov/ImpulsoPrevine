import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { PregnancyAndPuerperiumCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

// TODO: mover as constantes de MAX_GESTATIONAL_AGE para um arquivo comum
const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_MEASUREMENTS = 7;
const ZERO_MEASUREMENTS = 0;
const FOUR_MEASUREMENTS = 4;

// TODO: usar Pick para selecionar os campos necessários ao invés de repetir a definição
export type InputData = {
    gestationalAgeByLastMenstrualPeriodWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodWeeks"];
    gestationalAgeByLastMenstrualPeriodDays: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodDays"];
    gestationalAgeByObstreticalUltrasoundWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundWeeks"];
    gestationalAgeByObstreticalUltrasoundDays: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundDays"];
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    weightAndHeightMeasurements: PregnancyAndPuerperiumCareItem["weightAndHeightMeasurements"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

type GestationalAge = {
    weeks: number | null;
    days: number | null;
};

export class WeightAndHeightMeasurementCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #isObstreticalUltrasoundAvailable(): boolean {
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;
        return (
            gestationalAgeByObstreticalUltrasoundWeeks !== null &&
            gestationalAgeByObstreticalUltrasoundDays !== null
        );
    }

    public computeMeasurements(): number {
        const measurements = this.#data.weightAndHeightMeasurements;
        return measurements;
    }

    #statusCalcInPrenatalPeriod(): Status {
        const measurements = this.#data.weightAndHeightMeasurements;
        if (measurements == ZERO_MEASUREMENTS) {
            return {
                tagStatus: "danger",
            };
        }
        if (measurements < FOUR_MEASUREMENTS) {
            return {
                tagStatus: "warning",
            };
        }
        if (measurements < TARGET_NUMBER_OF_MEASUREMENTS) {
            return {
                tagStatus: "attention",
            };
        }
        return {
            tagStatus: "success",
        };
    }

    #statusCalcInPuerperalPeriod(): Status {
        return this.#data.weightAndHeightMeasurements <
            TARGET_NUMBER_OF_MEASUREMENTS
            ? { tagStatus: "disabled" }
            : { tagStatus: "success" };
    }

    public computeStatus(): Status {
        const gestationalAgeByLastMenstrualPeriodWeeks =
            this.#data.gestationalAgeByLastMenstrualPeriodWeeks;
        const gestationalAgeByLastMenstrualPeriodDays =
            this.#data.gestationalAgeByLastMenstrualPeriodDays;
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;

        // TODO: mover a lógica de seleção da idade gestacional para um método separado
        let gestationalAge: GestationalAge = {
            weeks: null,
            days: null,
        };

        if (this.#isObstreticalUltrasoundAvailable()) {
            gestationalAge = {
                weeks: gestationalAgeByObstreticalUltrasoundWeeks,
                days: gestationalAgeByObstreticalUltrasoundDays,
            };
        } else {
            gestationalAge = {
                weeks: gestationalAgeByLastMenstrualPeriodWeeks,
                days: gestationalAgeByLastMenstrualPeriodDays,
            };
        }
        if (
            gestationalAge["weeks"] === null ||
            gestationalAge["days"] === null
        ) {
            return {
                tagStatus: "disabled",
            };
        }
        const isPuerperalPeriod =
            this.#data.homeVisitsDuringPuerperium > 0 ||
            this.#data.appointmentsDuringPuerperium > 0;
        // TODO: criar essas variáveis apenas caso isPuerperalPeriod seja false
        const isGestationalAgeAtOrAboveMaxWeeks =
            gestationalAge["weeks"] >= MAX_GESTATIONAL_AGE_WEEKS;
        const isGestationalAgeAboveMaxDays =
            gestationalAge["days"] > MAX_GESTATIONAL_AGE_DAYS;

        if (isPuerperalPeriod) return this.#statusCalcInPuerperalPeriod();

        if (isGestationalAgeAtOrAboveMaxWeeks) {
            if (isGestationalAgeAboveMaxDays) {
                return this.#statusCalcInPuerperalPeriod();
            }
        }

        return this.#statusCalcInPrenatalPeriod();
    }
}
