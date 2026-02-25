import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import { HomeVisitsCalculator } from "../HomeVisitsCalculator";
import type { InputData } from "../HomeVisitsCalculator";
const TARGET_HOME_VISITS_DURING_PREGNANCY = 3;

const baseInput = (): InputData => ({
    homeVisitsDuringPuerperium: 0,
    homeVisitsDuringPregnancy: 0,
    appointmentsDuringPuerperium: 0,
});

const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("HomeVisitsCalculator", () => {
    describe("computeHomeVisitsDuringPrenatal", () => {
        it("retorna o número de consultas informado", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 5,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeHomeVisitsDuringPrenatal()).toEqual({
                current: 5,
                total: TARGET_HOME_VISITS_DURING_PREGNANCY,
            });
        });
    });

    describe("computeStatus - dados inválidos", () => {
        it("retorna 'disabled' quando semanas são null", () => {
            const data = {
                ...baseInput(),
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: null,
                days: 1,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'disabled' quando dias são null", () => {
            const data = {
                ...baseInput(),
            };
            const gestationalAge = {
                ...baseGestationalAge,
                days: null,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal", () => {
        it("retorna 'danger' quando não há visitas", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });

        it("retorna 'warning' quando tem menos de 1 visita domiciliar", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 1,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "warning",
            });
        });

        it("retorna 'attention' quando tem 2 visitas domiciliares", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 2,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "attention",
            });
        });

        it("retorna 'success' quando tem 3 ou mais visitas domiciliares", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 3,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando semanas >= 42 + dias > 0 e visitas domiciliares < 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 2,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando semanas >= 42 + dias > 0 e visitas domiciliares >= 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 3,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 1,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("não entra na regra especial quando semanas = 42 e dias = 0", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 0,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 0,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "danger",
            });
        });
    });

    describe("computeStatus - há consulta ou visita domiciliar feita durante o puerpério", () => {
        it("retorna 'disabled' quando a quantidade de visitas domiciliares no pré-natal é menor que 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 0,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 1,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'success' quando a quantidade de visitas domiciliares no pré-natal é 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 3,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 1,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });

        it("retorna 'success' quando a quantidade de visitas domiciliares no pré-natal é maior que 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 4,
            };
            const gestationalAge = {
                ...baseGestationalAge,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });
});
