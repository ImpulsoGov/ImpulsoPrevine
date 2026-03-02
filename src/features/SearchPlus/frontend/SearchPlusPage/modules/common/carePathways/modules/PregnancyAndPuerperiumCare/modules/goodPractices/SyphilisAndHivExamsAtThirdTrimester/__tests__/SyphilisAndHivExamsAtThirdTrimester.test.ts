import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";
import {
    SyphilisAndHivExamsAtThirdTrimesterCalculator,
    type CalculatorInput,
} from "../SyphilisAndHivExamsAtThirdTrimesterCalculator";

const TARGET_NUMBER_OF_EXAMS = 2;

const baseInput: CalculatorInput = {
    homeVisitsDuringPuerperium: 0,
    appointmentsDuringPuerperium: 0,
    didHivExamAtThirdTrimester: false,
    didSyphilisExamAtThirdTrimester: false,
};

const baseGestationalAge: GestationalAge = {
    weeks: 20,
    days: 0,
};

describe("SyphilisAndHivExamsAtThirdTrimesterCalculator", () => {
    describe("computeTotalExamsDoneAtThirdTrimester", () => {
        it("retorna 0 quando nenhum exame foi realizado e o total de exames esperados", () => {
            const data = {
                ...baseInput,
            };

            const calc = new SyphilisAndHivExamsAtThirdTrimesterCalculator(
                data
            );

            expect(calc.computeTotalExamsDoneAtThirdTrimester()).toEqual({
                current: 0,
                total: TARGET_NUMBER_OF_EXAMS,
            });
        });

        it("retorna 1 quando apenas o exame de sífilis foi realizado e o total de exames esperados", () => {
            const data = {
                ...baseInput,
                didSyphilisExamAtThirdTrimester: true,
            };

            const calc = new SyphilisAndHivExamsAtThirdTrimesterCalculator(
                data
            );

            expect(calc.computeTotalExamsDoneAtThirdTrimester()).toEqual({
                current: 1,
                total: TARGET_NUMBER_OF_EXAMS,
            });
        });

        it("retorna 1 quando apenas o exame de HIV foi realizado e o total de exames esperados", () => {
            const data = {
                ...baseInput,
                didHivExamAtThirdTrimester: true,
            };

            const calc = new SyphilisAndHivExamsAtThirdTrimesterCalculator(
                data
            );

            expect(calc.computeTotalExamsDoneAtThirdTrimester()).toEqual({
                current: 1,
                total: TARGET_NUMBER_OF_EXAMS,
            });
        });

        it("retorna 2 quando ambos os exames foram realizados e o total de exames esperados", () => {
            const data = {
                ...baseInput,
                didSyphilisExamAtThirdTrimester: true,
                didHivExamAtThirdTrimester: true,
            };

            const calc = new SyphilisAndHivExamsAtThirdTrimesterCalculator(
                data
            );

            expect(calc.computeTotalExamsDoneAtThirdTrimester()).toEqual({
                current: 2,
                total: TARGET_NUMBER_OF_EXAMS,
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
            };
            const calc = new SyphilisAndHivExamsAtThirdTrimesterCalculator(
                data
            );

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
            const calc = new SyphilisAndHivExamsAtThirdTrimesterCalculator(
                data
            );

            expect(calc.computeStatus(gestationalAge)).toEqual({
                tagStatus: "disabled",
            });
        });
    });
});
