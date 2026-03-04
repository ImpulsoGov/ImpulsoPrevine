import { AppointmentsAtPuerperiumCalculator } from "../AppointmentsAtPuerperiumCalculator";
import type { GestationalAge } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/modules/common/GestationalAge";

const createGestationalAge = (
    weeks: number | null,
    days: number | null
): GestationalAge =>
    ({
        weeks,
        days,
    }) as GestationalAge;

const createCalculator = (
    appointmentsDuringPuerperium: number
): AppointmentsAtPuerperiumCalculator =>
    new AppointmentsAtPuerperiumCalculator({
        appointmentsDuringPuerperium,
    });

describe("AppointmentsAtPuerperiumCalculator", (): void => {
    describe("computeAppointmentsAtPuerperium", (): void => {
        it("deve retornar current e total corretamente", (): void => {
            const calculator = createCalculator(0);

            const result = calculator.computeAppointmentsAtPuerperium();

            expect(result).toEqual({
                current: 0,
                total: 1,
            });
        });

        it("deve refletir o número de consultas realizadas", (): void => {
            const calculator = createCalculator(2);

            const result = calculator.computeAppointmentsAtPuerperium();

            expect(result).toEqual({
                current: 2,
                total: 1,
            });
        });
    });

    describe("computeStatus", (): void => {
        it("deve retornar disabled quando a idade gestacional for maior que 42 semanas", (): void => {
            const calculator = createCalculator(1);

            const result = calculator.computeStatus(
                createGestationalAge(42, 1)
            );

            expect(result).toEqual({ tagStatus: "disabled" });
        });

        it("deve retornar disabled quando a idade gestacional for maior que 42 semanas independentemente do número de consultas", (): void => {
            const calculator = createCalculator(0);

            const result = calculator.computeStatus(
                createGestationalAge(43, 0)
            );

            expect(result).toEqual({ tagStatus: "disabled" });
        });

        it("deve retornar success quando o período estiver concluído e houver pelo menos uma consulta", (): void => {
            const calculator = createCalculator(1);

            const result = calculator.computeStatus(
                createGestationalAge(40, 3)
            );

            expect(result).toEqual({ tagStatus: "success" });
        });

        it("deve retornar danger quando o período estiver concluído e não houver consultas", (): void => {
            const calculator = createCalculator(0);

            const result = calculator.computeStatus(
                createGestationalAge(41, 6)
            );

            expect(result).toEqual({ tagStatus: "danger" });
        });

        it("deve considerar o período concluído quando weeks for null", (): void => {
            const calculator = createCalculator(1);

            const result = calculator.computeStatus(
                createGestationalAge(null, 0)
            );

            expect(result).toEqual({ tagStatus: "success" });
        });

        it("deve considerar o período concluído quando days for null", (): void => {
            const calculator = createCalculator(0);

            const result = calculator.computeStatus(
                createGestationalAge(40, null)
            );

            expect(result).toEqual({ tagStatus: "danger" });
        });

        it("deve considerar o período concluído quando for exatamente 42 semanas e 0 dias", (): void => {
            const calculator = createCalculator(1);

            const result = calculator.computeStatus(
                createGestationalAge(42, 0)
            );

            expect(result).toEqual({ tagStatus: "success" });
        });
    });
});
