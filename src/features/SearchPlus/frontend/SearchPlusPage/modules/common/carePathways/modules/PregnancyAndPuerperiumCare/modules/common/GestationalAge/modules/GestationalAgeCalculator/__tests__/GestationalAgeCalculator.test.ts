import type { InputData } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge/model";
import { GestationalAgeCalculator } from "..";

describe("GestacionalAgeCalculator", () => {
    describe("computeGestacionalAge", () => {
        it("deve retornar idade gestacional baseada no ultrassom quando disponível", () => {
            const input: InputData = {
                gestationalAgeByLastMenstrualPeriodWeeks: 10,
                gestationalAgeByLastMenstrualPeriodDays: 3,
                gestationalAgeByObstreticalUltrasoundWeeks: 12,
                gestationalAgeByObstreticalUltrasoundDays: 1,
            };
            const calculator = new GestationalAgeCalculator(input);
            const result = calculator.computeGestacionalAge();
            expect(result).toEqual({ weeks: 12, days: 1 });
        });

        it("deve retornar idade gestacional baseada na data da última menstruação quando ultrassom não está disponível", () => {
            const input: InputData = {
                gestationalAgeByLastMenstrualPeriodWeeks: 9,
                gestationalAgeByLastMenstrualPeriodDays: 5,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };
            const calculator = new GestationalAgeCalculator(input);
            const result = calculator.computeGestacionalAge();
            expect(result).toEqual({ weeks: 9, days: 5 });
        });

        it("deve retornar idade gestacional baseada na data da última menstruação quando uma das informações do ultrassom não está disponível", () => {
            const input: InputData = {
                gestationalAgeByLastMenstrualPeriodWeeks: 8,
                gestationalAgeByLastMenstrualPeriodDays: 2,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: 6,
            };
            const calculator = new GestationalAgeCalculator(input);
            const result = calculator.computeGestacionalAge();
            expect(result).toEqual({ weeks: 8, days: 2 });
        });

        it("deve retornar null para semanas e dias se ambos métodos não estão disponíveis", () => {
            const input: InputData = {
                gestationalAgeByLastMenstrualPeriodWeeks: null,
                gestationalAgeByLastMenstrualPeriodDays: null,
                gestationalAgeByObstreticalUltrasoundWeeks: null,
                gestationalAgeByObstreticalUltrasoundDays: null,
            };
            const calculator = new GestationalAgeCalculator(input);
            const result = calculator.computeGestacionalAge();
            expect(result).toEqual({ weeks: null, days: null });
        });
    });
});
