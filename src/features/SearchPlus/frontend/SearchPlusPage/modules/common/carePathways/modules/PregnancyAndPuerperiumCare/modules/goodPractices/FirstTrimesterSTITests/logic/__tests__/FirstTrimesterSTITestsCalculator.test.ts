import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import { FirstTrimesterSTITestsCalculator } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/goodPractices/FirstTrimesterSTITests/logic/FirstTrimesterSTITestsCalculator";
import type { CalculatorInput } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/goodPractices/FirstTrimesterSTITests/logic/FirstTrimesterSTITestsCalculator";

const FIRST_TRIMESTER_WEEKS = 13;
const FIRST_TRIMESTER_DAYS = 6;
const TARGET_NUMBER_OF_TESTS = 4;

const baseInput: CalculatorInput = {
    didHivTestDuringFirstTrimester: false,
    didSyphilisTestDuringFirstTrimester: false,
    didHepatitisBTestDuringFirstTrimester: false,
    didHepatitisCTestDuringFirstTrimester: false,
    homeVisitsDuringPuerperium: 0,
    appointmentsDuringPuerperium: 0,
};
const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("FirstTrimesterSTITestsCalculator", () => {
    describe("computeSTITestsDuringFirstTrimester", () => {
        it("Retorna o número de exames de DST realizados no primeiro trimestre", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: false,
                didHepatitisCTestDuringFirstTrimester: true,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(calc.computeSTITestsDuringFirstTrimester()).toEqual({
                current: 3,
                total: TARGET_NUMBER_OF_TESTS,
            });
        });
    });
    describe("computeStatus - dados inválidos", () => {
        it("Retorna 'disabled' quando semanas são null", () => {
            const data = {
                ...baseInput,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(
                calc.computeStatus({ ...baseGestationalAge, weeks: null })
            ).toEqual({
                tagStatus: "disabled",
            });
        });
        it("Retorna 'disabled' quando dias são null", () => {
            const data = {
                ...baseInput,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(
                calc.computeStatus({ ...baseGestationalAge, days: null })
            ).toEqual({
                tagStatus: "disabled",
            });
        });
    });
    describe("computeStatus - durante o primeiro tri", () => {
        it("Retorna 'danger' quando nenhum exame de DST foi realizado", () => {
            const data = {
                ...baseInput,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(
                calc.computeStatus({
                    weeks: FIRST_TRIMESTER_WEEKS,
                    days: FIRST_TRIMESTER_DAYS,
                })
            ).toEqual({ tagStatus: "danger" });
        });
        it("Retorna 'warning' quando menos de 3 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: false,
                didHepatitisBTestDuringFirstTrimester: false,
                didHepatitisCTestDuringFirstTrimester: true,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(
                calc.computeStatus({
                    weeks: FIRST_TRIMESTER_WEEKS,
                    days: FIRST_TRIMESTER_DAYS,
                })
            ).toEqual({ tagStatus: "warning" });
        });
        it("Retorna 'attention' quando 3 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: false,
                didHepatitisCTestDuringFirstTrimester: true,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(
                calc.computeStatus({
                    weeks: FIRST_TRIMESTER_WEEKS - 1,
                    days: FIRST_TRIMESTER_DAYS,
                })
            ).toEqual({ tagStatus: "attention" });
        });
        it("Retorna 'success' quando os 4 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: true,
                didHepatitisCTestDuringFirstTrimester: true,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(
                calc.computeStatus({
                    weeks: FIRST_TRIMESTER_WEEKS,
                    days: FIRST_TRIMESTER_DAYS,
                })
            ).toEqual({ tagStatus: "success" });
        });
    });
    describe("computeStatus - após o primeiro trimestre", () => {
        it("Retorna 'disabled' quando menos de 4 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: false,
                didHepatitisCTestDuringFirstTrimester: true,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
        it("Retorna 'success' quando os 4 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: true,
                didHepatitisCTestDuringFirstTrimester: true,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(calc.computeStatus(baseGestationalAge)).toEqual({
                tagStatus: "success",
            });
        });
    });
    //Esse é outro caso de após o primeiro trimestre, mas achei que fazia sentido ter um describe específico para o puerpério,
    //para gente prestar atenção e acompanhar
    describe("computeStatus - durante o puerpério", () => {
        it("Retorna 'disabled' quando menos de 4 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: false,
                didHepatitisCTestDuringFirstTrimester: true,
                homeVisitsDuringPuerperium: 1,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(calc.computeStatus({ weeks: 44, days: 1 })).toEqual({
                tagStatus: "disabled",
            });
        });
        it("Retorna 'success' quando os 4 exames de DST foram realizados", () => {
            const data = {
                ...baseInput,
                didHivTestDuringFirstTrimester: true,
                didSyphilisTestDuringFirstTrimester: true,
                didHepatitisBTestDuringFirstTrimester: true,
                didHepatitisCTestDuringFirstTrimester: true,
                appointmentsDuringPuerperium: 1,
            };
            const calc = new FirstTrimesterSTITestsCalculator(data);
            expect(calc.computeStatus({ weeks: 42, days: 5 })).toEqual({
                tagStatus: "success",
            });
        });
    });
});
