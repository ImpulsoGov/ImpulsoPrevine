import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import {
    HomeVisitsAtPuerperiumCalculator,
    type CalculatorInput,
} from "../HomeVisitsAtPuerperiumCalculator";

const TARGET_HOME_VISITS_DURING_PUERPERIUM = 1;

const baseInput: CalculatorInput = {
    homeVisitsDuringPuerperium: 0,
    appointmentsDuringPuerperium: 0,
};

const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("HomeVisitsAtPuerperiumCalculator", () => {
    describe("computeHomeVisits", () => {
        it("retorna o número de visitas domiciliares de puerpério feitas e o total esperado", () => {
            const data = {
                ...baseInput,
                homeVisitsDuringPuerperium: 5,
            };

            const calc = new HomeVisitsAtPuerperiumCalculator(data);

            expect(calc.computeHomeVisits()).toEqual({
                current: 5,
                total: TARGET_HOME_VISITS_DURING_PUERPERIUM,
            });
        });
    });

    describe("computeStatus - idade gestacional (IG) inválida", () => {
        it("retorna 'disabled' quando semanas são null", () => {
            const data = {
                ...baseInput,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: null,
                days: 1,
            };

            const calc = new HomeVisitsAtPuerperiumCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });

        it("retorna 'disabled' quando dias são null", () => {
            const data = {
                ...baseInput,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                days: null,
            };

            const calc = new HomeVisitsAtPuerperiumCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
    });

    describe("computeStatus - no pré-natal (IG <= 42 semanas + 0 dias)", () => {
        it("retorna 'inapplicable' quando IG = 0 semanas + 3 dias", () => {
            const data = {
                ...baseInput,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 0,
                days: 3,
            };

            const calc = new HomeVisitsAtPuerperiumCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "inapplicable",
            });
        });

        it("retorna 'inapplicable' quando IG = 30 semanas + 0 dias", () => {
            const data = {
                ...baseInput,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 30,
                days: 0,
            };

            const calc = new HomeVisitsAtPuerperiumCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "inapplicable",
            });
        });

        it("retorna 'inapplicable' quando IG = 42 semanas + 0 dias", () => {
            const data = {
                ...baseInput,
            };
            const gestationalAge = {
                ...baseGestationalAge,
                weeks: 42,
                days: 0,
            };

            const calc = new HomeVisitsAtPuerperiumCalculator(data);

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "inapplicable",
            });
        });
    });

    describe("computeStatus - no puerpério (consulta/visita domiciliar de puerpério feita ou IG >= 42 semanas + 1 dia)", () => {
        describe("quando visita domiciliar de puerpério é feita", () => {
            it("retorna 'success' se não há consulta de puerpério feita", () => {
                const data = {
                    ...baseInput,
                    homeVisitsDuringPuerperium: 1,
                    appointmentsDuringPuerperium: 0,
                };
                const gestationalAge = {
                    ...baseGestationalAge,
                };

                const calc = new HomeVisitsAtPuerperiumCalculator(data);

                expect(calc.computeStatus(gestationalAge)).toEqual({
                    tagStatus: "success",
                });
            });

            it("retorna 'success' se consulta de puerpério também é feita", () => {
                const data = {
                    ...baseInput,
                    homeVisitsDuringPuerperium: 1,
                    appointmentsDuringPuerperium: 1,
                };
                const gestationalAge = {
                    ...baseGestationalAge,
                };

                const calc = new HomeVisitsAtPuerperiumCalculator(data);

                expect(calc.computeStatus(gestationalAge)).toEqual({
                    tagStatus: "success",
                });
            });
        });

        describe("quando visita domiciliar de puerpério não é feita", () => {
            it("retorna 'danger' se há consulta de puerpério feita", () => {
                const data = {
                    ...baseInput,
                    homeVisitsDuringPuerperium: 0,
                    appointmentsDuringPuerperium: 1,
                };
                const gestationalAge = {
                    ...baseGestationalAge,
                };

                const calc = new HomeVisitsAtPuerperiumCalculator(data);

                expect(calc.computeStatus(gestationalAge)).toEqual({
                    tagStatus: "danger",
                });
            });

            it("retorna 'danger' se IG = 42 semanas + 1 dia", () => {
                const data = {
                    ...baseInput,
                    homeVisitsDuringPuerperium: 0,
                };
                const gestationalAge = {
                    ...baseGestationalAge,
                    weeks: 42,
                    days: 1,
                };

                const calc = new HomeVisitsAtPuerperiumCalculator(data);

                expect(calc.computeStatus(gestationalAge)).toEqual({
                    tagStatus: "danger",
                });
            });

            it("retorna 'danger' se IG = 43 semanas + 0 dias", () => {
                const data = {
                    ...baseInput,
                    homeVisitsDuringPuerperium: 0,
                };
                const gestationalAge = {
                    ...baseGestationalAge,
                    weeks: 43,
                    days: 0,
                };

                const calc = new HomeVisitsAtPuerperiumCalculator(data);

                expect(calc.computeStatus(gestationalAge)).toEqual({
                    tagStatus: "danger",
                });
            });

            it("retorna 'danger' se IG = 43 semanas + 5 dias", () => {
                const data = {
                    ...baseInput,
                    homeVisitsDuringPuerperium: 0,
                };
                const gestationalAge = {
                    ...baseGestationalAge,
                    weeks: 43,
                    days: 5,
                };

                const calc = new HomeVisitsAtPuerperiumCalculator(data);

                expect(calc.computeStatus(gestationalAge)).toEqual({
                    tagStatus: "danger",
                });
            });
        });
    });
});
