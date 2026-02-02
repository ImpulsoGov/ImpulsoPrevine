import { HomeVisitsCalculator } from "../HomeVisitsCalculator";
import type { InputData } from "../HomeVisitsCalculator";
const TARGET_HOME_VISITS_DURING_PREGNANCY = 3;

const baseInput = (): InputData => ({
    gestationalAgeByLastMenstrualPeriodWeeks: 20,
    gestationalAgeByLastMenstrualPeriodDays: 0,
    gestationalAgeByObstreticalUltrasoundWeeks: null,
    gestationalAgeByObstreticalUltrasoundDays: null,
    homeVisitsDuringPuerperium: 0,
    homeVisitsDuringPregnancy: 0,
    appointmentsDuringPuerperium: 0,
});

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
                gestationalAgeByLastMenstrualPeriodWeeks: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'disabled' quando dias são null", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodDays: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });
    });

    describe("computeStatus - cálculo durante o pré-natal", () => {
        it("retorna 'danger' quando não há visitas e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 0,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });

        it("retorna 'warning' quando tem menos de 1 visita domiciliar e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 1,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "warning" });
        });

        it("retorna 'attention' quando tem 2 visitas domiciliares e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 2,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "attention" });
        });

        it("retorna 'success' quando tem 3 ou mais visitas domiciliar e IG maior que 42 semanas e 0 dias", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 3,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });
    });

    describe("computeStatus - uso de ultrassom obstétrico", () => {
        it("prioriza idade gestacional por ultrassom quando disponível", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 10,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                gestationalAgeByObstreticalUltrasoundWeeks: 30,
                gestationalAgeByObstreticalUltrasoundDays: 0,
                homeVisitsDuringPregnancy: 0,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
        });
    });

    describe("computeStatus - limite máximo de idade gestacional", () => {
        it("retorna 'disabled' quando >= 42 semanas + dias > 0 e visitas domiciliares < 3", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
                homeVisitsDuringPregnancy: 2,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'success' quando >= 42 semanas + dias > 0 e visitas domiciliares >= 3", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 1,
                homeVisitsDuringPregnancy: 3,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });

        it("não entra na regra especial quando semanas = 42 e dias = 0", () => {
            const data = {
                ...baseInput(),
                gestationalAgeByLastMenstrualPeriodWeeks: 42,
                gestationalAgeByLastMenstrualPeriodDays: 0,
                homeVisitsDuringPregnancy: 0,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "danger" });
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

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "disabled" });
        });

        it("retorna 'success' quando a quantidade de visitas domiciliares no pré-natal é 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 3,
                homeVisitsDuringPuerperium: 1,
                appointmentsDuringPuerperium: 1,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });

        it("retorna 'success' quando a quantidade de visitas domiciliares no pré-natal é maior que 3", () => {
            const data = {
                ...baseInput(),
                homeVisitsDuringPregnancy: 4,
            };

            const calc = new HomeVisitsCalculator(data);

            expect(calc.computeStatus()).toEqual({ tagStatus: "success" });
        });
    });
});
