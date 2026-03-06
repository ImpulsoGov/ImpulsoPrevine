import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import type { BRTDateString } from "@/features/common/shared/time";
import { brtStringToLocalDate } from "@/features/common/shared/time";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import type {
    Count,
    PregnancyAndPuerperiumCareItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";
import type { LocalDate } from "@js-joda/core";

const TARGET_NUMBER_OF_DOSES = 1;
const ZERO_APPOINTMENTS_DURING_PUERPERIUM = 0;
const ZERO_HOME_VISITS_DURING_PUERPERIUM = 0;

export type GestationalAgeNonNullable = {
    weeks: number;
    days: number;
};
export type Status = {
    tagStatus: PrintTagTheme;
};
export type InputData = {
    appointmentsDuringPuerperium: PregnancyAndPuerperiumCareItem["appointmentsDuringPuerperium"];
    homeVisitsDuringPuerperium: PregnancyAndPuerperiumCareItem["homeVisitsDuringPuerperium"];
    tetanusDiphtheriaPertussisVaccineDoses: PregnancyAndPuerperiumCareItem["tetanusDiphtheriaPertussisVaccineDoses"];
};

export class TetanusDiphtheriaPertussisVaccineCalculator {
    #data: InputData;

    constructor(data: InputData) {
        this.#data = data;
    }

    #isGestationalAgeUnavailable(gestationalAge: GestationalAge): boolean {
        return gestationalAge.weeks === null || gestationalAge.days === null;
    }

    #isGestationalUnder20weeks(
        gestationalAge: GestationalAgeNonNullable
    ): boolean {
        if (gestationalAge.weeks < 20) return true;

        if (gestationalAge.weeks === 19 && gestationalAge.days === 6)
            return true;
        return false;
    }

    #hasValidTetanusDiphtheriaPertussisVaccineDose(
        tetanusDiphtheriaPertussisVaccineDoses: string,
        gestationalAge: GestationalAgeNonNullable,
        createdAt: LocalDate
    ): boolean {
        const gestationStartDate = createdAt
            .minusWeeks(gestationalAge.weeks)
            .minusDays(gestationalAge.days);
        const validDoseDateLimit = gestationStartDate.plusWeeks(20);
        const doses = tetanusDiphtheriaPertussisVaccineDoses.split("|");
        console.log("doses", doses);
        if (doses.length === 1 && doses[0].trim() === "") return false;
        if (doses.length === 0) return false;
        if (doses.some((dose) => !dose.includes("-") || !dose.includes("/")))
            return false;
        const dosesDates = doses.map(
            (dose) =>
                brtStringToLocalDate(
                    dose.split("-")[1].trim() as BRTDateString
                ) as LocalDate
        );
        console.log("dosesDates", dosesDates);
        return dosesDates.some((doseDate) =>
            doseDate.isAfter(validDoseDateLimit)
        );
    }

    public computeTetanusDiphtheriaPertussisVaccine(
        gestationalAgeNonNullable: GestationalAgeNonNullable,
        createdAtDate: LocalDate
    ): Count {
        const tetanusDiphtheriaPertussisVaccineDoses =
            this.#data.tetanusDiphtheriaPertussisVaccineDoses;

        const isTetanusDiphtheriaPertussisVaccineDosesValid =
            this.#hasValidTetanusDiphtheriaPertussisVaccineDose(
                tetanusDiphtheriaPertussisVaccineDoses,
                gestationalAgeNonNullable,
                createdAtDate
            );
        return {
            current: isTetanusDiphtheriaPertussisVaccineDosesValid ? 1 : 0,
            total: TARGET_NUMBER_OF_DOSES,
        };
    }
    public computeStatus(
        gestationalAge: GestationalAge,
        createdAtDate: LocalDate
    ): Status {
        const appointmentsDuringPuerperium =
            this.#data.appointmentsDuringPuerperium;
        const homeVisitsDuringPuerperium =
            this.#data.homeVisitsDuringPuerperium;
        const tetanusDiphtheriaPertussisVaccineDoses =
            this.#data.tetanusDiphtheriaPertussisVaccineDoses;

        if (this.#isGestationalAgeUnavailable(gestationalAge))
            return { tagStatus: "disabled" };
        const gestationalAgeNonNullable =
            gestationalAge as GestationalAgeNonNullable;
        if (
            appointmentsDuringPuerperium >
                ZERO_APPOINTMENTS_DURING_PUERPERIUM ||
            homeVisitsDuringPuerperium > ZERO_HOME_VISITS_DURING_PUERPERIUM
        )
            return this.#hasValidTetanusDiphtheriaPertussisVaccineDose(
                tetanusDiphtheriaPertussisVaccineDoses,
                gestationalAgeNonNullable,
                createdAtDate
            )
                ? { tagStatus: "success" }
                : { tagStatus: "danger" };

        if (this.#isGestationalUnder20weeks(gestationalAgeNonNullable))
            return { tagStatus: "disabled" };

        return this.#hasValidTetanusDiphtheriaPertussisVaccineDose(
            tetanusDiphtheriaPertussisVaccineDoses,
            gestationalAgeNonNullable,
            createdAtDate
        )
            ? { tagStatus: "success" }
            : { tagStatus: "danger" };
    }
}
