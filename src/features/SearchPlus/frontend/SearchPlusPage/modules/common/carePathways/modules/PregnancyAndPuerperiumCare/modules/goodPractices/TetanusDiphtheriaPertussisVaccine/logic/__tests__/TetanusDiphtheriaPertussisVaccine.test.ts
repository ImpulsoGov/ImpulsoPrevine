import { LocalDate } from "@js-joda/core";
import { TetanusDiphtheriaPertussisVaccineCalculator } from "../TetanusDiphtheriaPertussisVaccineCalculator";

describe("TetanusDiphtheriaPertussisVaccineCalculator", () => {
    const createdAt = LocalDate.parse("2026-02-01");

    const baseInput = {
        appointmentsDuringPuerperium: 0,
        homeVisitsDuringPuerperium: 0,
        tetanusDiphtheriaPertussisVaccineDoses: [],
    };

    const validDose = [LocalDate.parse("2026-01-21")];

    const multipleDoses = [
        LocalDate.parse("2026-08-21"),
        LocalDate.parse("2026-08-22"),
    ];

    describe("computeTetanusDiphtheriaPertussisVaccine", () => {
        it("deve retornar 0 quando não há doses registradas", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator(
                baseInput
            );

            const result = calculator.computeTetanusDiphtheriaPertussisVaccine(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result).toEqual({
                current: 0,
                total: 1,
            });
        });

        it("deve retornar 1 quando existe dose válida após 20 semanas", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator({
                ...baseInput,
                tetanusDiphtheriaPertussisVaccineDoses: [
                    LocalDate.parse("2026-01-21"),
                ],
            });

            const result = calculator.computeTetanusDiphtheriaPertussisVaccine(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result).toEqual({
                current: 1,
                total: 1,
            });
        });

        it("deve considerar válido quando há múltiplas doses", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator({
                ...baseInput,
                tetanusDiphtheriaPertussisVaccineDoses: multipleDoses,
            });

            const result = calculator.computeTetanusDiphtheriaPertussisVaccine(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result.current).toBe(1);
        });

        it("deve retornar 0 quando formato de dose é inválido", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator({
                ...baseInput,
                tetanusDiphtheriaPertussisVaccineDoses: [],
            });

            const result = calculator.computeTetanusDiphtheriaPertussisVaccine(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result.current).toBe(0);
        });
    });

    describe("computeStatus", () => {
        it("deve retornar disabled quando idade gestacional é indisponível", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator(
                baseInput
            );

            const result = calculator.computeStatus(
                { weeks: null, days: null },
                createdAt
            );

            expect(result.tagStatus).toBe("inapplicable");
        });

        it("deve retornar inapplicable quando gestação tem menos de 20 semanas", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator(
                baseInput
            );

            const result = calculator.computeStatus(
                { weeks: 19, days: 6 },
                createdAt
            );

            expect(result.tagStatus).toBe("inapplicable");
        });

        it("deve retornar success quando existe dose válida", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator({
                ...baseInput,
                tetanusDiphtheriaPertussisVaccineDoses: validDose,
            });

            const result = calculator.computeStatus(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result.tagStatus).toBe("success");
        });

        it("deve retornar danger quando não existe dose válida", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator(
                baseInput
            );

            const result = calculator.computeStatus(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result.tagStatus).toBe("danger");
        });

        it("deve retornar success quando há atendimento no puerpério e dose válida", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator({
                appointmentsDuringPuerperium: 1,
                homeVisitsDuringPuerperium: 0,
                tetanusDiphtheriaPertussisVaccineDoses: validDose,
            });

            const result = calculator.computeStatus(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result.tagStatus).toBe("success");
        });

        it("deve retornar danger quando há atendimento no puerpério e não existe dose válida", () => {
            const calculator = new TetanusDiphtheriaPertussisVaccineCalculator({
                appointmentsDuringPuerperium: 1,
                homeVisitsDuringPuerperium: 0,
                tetanusDiphtheriaPertussisVaccineDoses: [],
            });

            const result = calculator.computeStatus(
                { weeks: 30, days: 0 },
                createdAt
            );

            expect(result.tagStatus).toBe("danger");
        });
    });
});
