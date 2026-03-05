import { AppointmentsAtPuerperiumCalculator } from "../AppointmentsAtPuerperiumCalculator";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

type TestInput = {
    appointmentsDuringPuerperium: number;
    homeVisitsDuringPuerperium: number;
};

const createCalculator = (
    data: TestInput
): AppointmentsAtPuerperiumCalculator =>
    new AppointmentsAtPuerperiumCalculator({
        appointmentsDuringPuerperium: data.appointmentsDuringPuerperium,
        homeVisitsDuringPuerperium: data.homeVisitsDuringPuerperium,
    });

const createGestationalAge = (
    weeks: number | null,
    days: number | null
): GestationalAge =>
    ({
        weeks,
        days,
    }) as GestationalAge;

describe("AppointmentsAtPuerperiumCalculator", () => {
    describe("computeAppointmentsAtPuerperium", () => {
        it("deve retornar a quantidade atual de consultas e o total esperado", () => {
            const calculator = createCalculator({
                appointmentsDuringPuerperium: 1,
                homeVisitsDuringPuerperium: 0,
            });

            const result = calculator.computeAppointmentsAtPuerperium();

            expect(result).toEqual({
                current: 1,
                total: 1,
            });
        });
    });

    describe("computeStatus", () => {
        it("deve retornar success quando existir pelo menos uma visita domiciliar", () => {
            const calculator = createCalculator({
                appointmentsDuringPuerperium: 0,
                homeVisitsDuringPuerperium: 1,
            });

            const gestationalAge = createGestationalAge(40, 0);

            const result = calculator.computeStatus(gestationalAge);

            expect(result.tagStatus).toBe("success");
        });

        it("deve retornar danger quando não houver consultas nem visitas no puerpério", () => {
            const calculator = createCalculator({
                appointmentsDuringPuerperium: 0,
                homeVisitsDuringPuerperium: 0,
            });

            const gestationalAge = createGestationalAge(40, 0);

            const result = calculator.computeStatus(gestationalAge);

            expect(result.tagStatus).toBe("danger");
        });

        it("deve retornar danger quando não houver consultas nem visitas domiciliares", () => {
            const calculator = createCalculator({
                appointmentsDuringPuerperium: 0,
                homeVisitsDuringPuerperium: 0,
            });

            const gestationalAge = createGestationalAge(40, 0);

            const result = calculator.computeStatus(gestationalAge);

            expect(result.tagStatus).toBe("danger");
        });

        it("deve retornar disabled quando semanas ou dias forem nulos", () => {
            const calculator = createCalculator({
                appointmentsDuringPuerperium: 0,
                homeVisitsDuringPuerperium: 1,
            });

            const gestationalAge = createGestationalAge(null, null);

            const result = calculator.computeStatus(gestationalAge);

            expect(result.tagStatus).toBe("disabled");
        });

        it("deve retornar danger quando o período gestacional estiver concluído e não houver consultas nem visitas domiciliares", () => {
            const calculator = createCalculator({
                appointmentsDuringPuerperium: 0,
                homeVisitsDuringPuerperium: 0,
            });

            const gestationalAge = createGestationalAge(42, 1);

            const result = calculator.computeStatus(gestationalAge);

            expect(result.tagStatus).toBe("danger");
        });
    });
});
