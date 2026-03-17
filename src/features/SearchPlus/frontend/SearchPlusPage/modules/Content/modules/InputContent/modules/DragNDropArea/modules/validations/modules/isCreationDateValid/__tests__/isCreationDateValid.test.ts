import { isCreationDateValid } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import * as time from "@/features/common/shared/time";
import { trackFileUploadWithError } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock("@/features/common/shared/time");
jest.mock(
    "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

describe("isCreationDateValid", () => {
    const errorHandler = jest.fn() as jest.MockedFunction<
        (message: ErrorData) => void
    >;

    beforeEach((): void => {
        jest.clearAllMocks();
    });

    it("deve retornar true quando a data e hora de criação forem válidas", (): void => {
        jest.spyOn(time, "isBrtDateStringValid").mockReturnValue(true);
        jest.spyOn(time, "isBrtTimeStringValid").mockReturnValue(true);

        const lines: Array<string> = ["col1;01/01/2024;col3;12:30"];

        const isValid = isCreationDateValid(0, lines, errorHandler);

        expect(isValid).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar false quando a data de criação for inválida", (): void => {
        jest.spyOn(time, "isBrtDateStringValid").mockReturnValue(false);
        jest.spyOn(time, "isBrtTimeStringValid").mockReturnValue(true);

        const lines: Array<string> = ["col1;invalid-date;col3;12:30"];

        const isValid = isCreationDateValid(0, lines, errorHandler);

        expect(isValid).toBe(false);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 06: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_creation_date"
        );
    });

    it("deve retornar false quando a hora de criação for inválida", (): void => {
        jest.spyOn(time, "isBrtDateStringValid").mockReturnValue(true);
        jest.spyOn(time, "isBrtTimeStringValid").mockReturnValue(false);

        const lines: Array<string> = ["col1;01/01/2024;col3;invalid-time"];

        const isValid = isCreationDateValid(0, lines, errorHandler);

        expect(isValid).toBe(false);

        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_creation_date"
        );
    });

    it("deve retornar true quando a linha não possuir colunas suficientes", (): void => {
        const lines: Array<string> = ["col1;01/01/2024"];

        const isValid = isCreationDateValid(0, lines, errorHandler);

        expect(isValid).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar true quando o índice da linha não existir", (): void => {
        const lines: Array<string> = [];

        const isValid = isCreationDateValid(2, lines, errorHandler);

        expect(isValid).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });
});
