import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { PregnancyAndPuerperiumCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/pregnancyAndPuerperiumCare/model";

const MAX_GESTATIONAL_AGE_WEEKS = 42;
const MAX_GESTATIONAL_AGE_DAYS = 0;
const TARGET_NUMBER_OF_APPOINTMENTS = 7;
const ZERO_APPOINTMENTS = 0;
const FOUR_APPOINTMENTS = 4;

export type InputData = {
    gestationalAgeByLastMenstrualPeriodWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodWeeks"];
    gestationalAgeByLastMenstrualPeriodDays: PregnancyAndPuerperiumCareItem["gestationalAgeByLastMenstrualPeriodDays"];
    gestationalAgeByObstreticalUltrasoundWeeks: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundWeeks"];
    gestationalAgeByObstreticalUltrasoundDays: PregnancyAndPuerperiumCareItem["gestationalAgeByObstreticalUltrasoundDays"];
    appointmentsDuringPrenatal: PregnancyAndPuerperiumCareItem["appointmentsDuringPrenatal"];
};

export type Status = {
    tagStatus: PrintTagTheme;
};

type GestationalAge = {
    weeks: number | null;
    days: number | null;
};

export class SevenAppointmentsCalculator {
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

    public computeAppointmentsDuringPrenatal(): number {
        const appointmentsDuringPrenatal =
            this.#data.appointmentsDuringPrenatal;
        return appointmentsDuringPrenatal;
    }

    #StatusCalcInPrenatalPeriod(): Status {
        const appointmentsDuringPrenatal =
            this.#data.appointmentsDuringPrenatal;
        if (appointmentsDuringPrenatal == ZERO_APPOINTMENTS) {
            return {
                tagStatus: "danger",
            };
        }
        if (appointmentsDuringPrenatal < FOUR_APPOINTMENTS) {
            return {
                tagStatus: "warning",
            };
        }
        if (appointmentsDuringPrenatal < TARGET_NUMBER_OF_APPOINTMENTS) {
            return {
                tagStatus: "attention",
            };
        }
        return {
            tagStatus: "success",
        };
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
        const appointmentsDuringPrenatal =
            this.#data.appointmentsDuringPrenatal;

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
        if (gestationalAge["weeks"] >= MAX_GESTATIONAL_AGE_WEEKS) {
            if (gestationalAge["days"] > MAX_GESTATIONAL_AGE_DAYS) {
                if (
                    appointmentsDuringPrenatal < TARGET_NUMBER_OF_APPOINTMENTS
                ) {
                    return {
                        tagStatus: "disabled",
                    };
                } else {
                    return {
                        tagStatus: "success",
                    };
                }
            }
        }
        return this.#StatusCalcInPrenatalPeriod();
    }
}
