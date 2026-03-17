import { isHeaderValid } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import { trackFileUploadWithError } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock(
    "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

describe("isHeaderValid", () => {
    let errorHandler: jest.MockedFunction<(message: ErrorData) => void>;

    beforeEach((): void => {
        jest.clearAllMocks();
        errorHandler = jest.fn();
    });

    it("deve retornar true quando o header esperado existir", (): void => {
        const lines: Array<string> = [
            "Alguma linha inicial",
            "Nome;Data de nascimento;CPF",
            "João;01/01/2000;123",
        ];

        const isValid = isHeaderValid(lines, errorHandler);

        expect(isValid).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar false quando o header esperado não existir", (): void => {
        const lines: Array<string> = [
            "Outra linha",
            "Nome;CPF;Telefone",
            "João;123;999999",
        ];

        const isValid = isHeaderValid(lines, errorHandler);

        expect(isValid).toBe(false);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 01: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_file_header"
        );
    });

    it("deve retornar false quando o arquivo estiver vazio", (): void => {
        const lines: Array<string> = [];

        const isValid = isHeaderValid(lines, errorHandler);

        expect(isValid).toBe(false);

        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_file_header"
        );
    });
});
