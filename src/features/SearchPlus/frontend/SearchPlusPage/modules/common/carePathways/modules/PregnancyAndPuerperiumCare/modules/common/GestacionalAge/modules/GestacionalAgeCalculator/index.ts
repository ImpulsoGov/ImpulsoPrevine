import type { InputData, GestationalAge } from "../../model";

export class GestacionalAgeCalculator {
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

    public computeGestacionalAge(): GestationalAge {
        const gestationalAgeByLastMenstrualPeriodWeeks =
            this.#data.gestationalAgeByLastMenstrualPeriodWeeks;
        const gestationalAgeByLastMenstrualPeriodDays =
            this.#data.gestationalAgeByLastMenstrualPeriodDays;
        const gestationalAgeByObstreticalUltrasoundWeeks =
            this.#data.gestationalAgeByObstreticalUltrasoundWeeks;
        const gestationalAgeByObstreticalUltrasoundDays =
            this.#data.gestationalAgeByObstreticalUltrasoundDays;

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

        return gestationalAge;
    }
}
