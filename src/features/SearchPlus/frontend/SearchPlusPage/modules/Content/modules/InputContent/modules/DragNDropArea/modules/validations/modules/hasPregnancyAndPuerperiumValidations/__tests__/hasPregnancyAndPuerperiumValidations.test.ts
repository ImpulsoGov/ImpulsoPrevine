import { hasPregnancyAndPuerperiumValidations } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import type { PregnancyAndPuerperiumCareCsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

describe("hasPregnancyAndPuerperiumValidations", () => {
    const errorHandler = jest.fn() as jest.MockedFunction<
        (message: ErrorData) => void
    >;

    beforeEach((): void => {
        jest.clearAllMocks();
    });

    const createValidRow = (): PregnancyAndPuerperiumCareCsvRow => {
        return {
            "Quantidade de atendimentos até 12 semanas no pré-natal": "1",
            "Quantidade de atendimentos no pré-natal": "2",
            "Quantidade de visitas domiciliares no puerpério": "1",
            "Quantidade de atendimentos no puerpério": "1",
            "IG (DUM) (semanas)": "20",
            "IG (DUM) (dias)": "3",
            "IG (ecografia obstétrica) (semanas)": "",
            "IG (ecografia obstétrica) (dias)": "",
        } as PregnancyAndPuerperiumCareCsvRow;
    };

    it("deve retornar true quando todos os dados forem válidos", (): void => {
        const data: Array<PregnancyAndPuerperiumCareCsvRow> = [
            createValidRow(),
        ];

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            data,
            errorHandler
        );

        expect(hasValidData).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
    });

    it("deve retornar false quando 'Quantidade de atendimentos até 12 semanas no pré-natal' for '-'", (): void => {
        const row = createValidRow();
        row["Quantidade de atendimentos até 12 semanas no pré-natal"] = "-";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(false);
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it("deve retornar false quando 'Quantidade de atendimentos no pré-natal' for '-'", (): void => {
        const row = createValidRow();
        row["Quantidade de atendimentos no pré-natal"] = "-";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(false);
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it("deve retornar false quando 'Quantidade de visitas domiciliares no puerpério' for '-'", (): void => {
        const row = createValidRow();
        row["Quantidade de visitas domiciliares no puerpério"] = "-";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(false);
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it("deve retornar false quando 'Quantidade de atendimentos no puerpério' for '-'", (): void => {
        const row = createValidRow();
        row["Quantidade de atendimentos no puerpério"] = "-";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(false);
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it("deve retornar false quando não existir idade gestacional válida", (): void => {
        const row = createValidRow();

        row["IG (DUM) (semanas)"] = "";
        row["IG (DUM) (dias)"] = "";
        row["IG (ecografia obstétrica) (semanas)"] = "";
        row["IG (ecografia obstétrica) (dias)"] = "";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(false);
        expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it("deve retornar true quando idade gestacional por DUM for válida, mas idade gestacional por ecografia for inválida", (): void => {
        const row = createValidRow();

        row["IG (DUM) (semanas)"] = "10";
        row["IG (DUM) (dias)"] = "2";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
    });

    it("deve retornar true quando idade gestacional por ecografia for válida, mas idade gestacional por DUM for inválida", (): void => {
        const row = createValidRow();

        row["IG (DUM) (semanas)"] = "";
        row["IG (DUM) (dias)"] = "";
        row["IG (ecografia obstétrica) (semanas)"] = "12";
        row["IG (ecografia obstétrica) (dias)"] = "3";

        const hasValidData = hasPregnancyAndPuerperiumValidations(
            [row],
            errorHandler
        );

        expect(hasValidData).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
    });
});
