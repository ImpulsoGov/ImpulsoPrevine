import { isFileExtensionInvalid } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import { trackFileUploadWithError } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock(
    "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

describe("isFileExtensionInvalid", () => {
    let errorHandler: jest.MockedFunction<(message: ErrorData) => void>;

    beforeEach((): void => {
        jest.clearAllMocks();
        errorHandler = jest.fn();
    });

    it("deve retornar false quando o arquivo possuir extensão .csv", (): void => {
        const isInvalid = isFileExtensionInvalid("patients.csv", errorHandler);

        expect(isInvalid).toBe(false);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar true quando o arquivo possuir extensão diferente de .csv", (): void => {
        const isInvalid = isFileExtensionInvalid("patients.txt", errorHandler);

        expect(isInvalid).toBe(true);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops! Parece que esse arquivo não é compatível.",
            message:
                "Erro 02: busca+mais funciona apenas com arquivos no formato CSV, baixados diretamente do PEC. Tente novamente.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_file_extension"
        );
    });

    it("deve retornar true quando o arquivo não possuir extensão", (): void => {
        const isInvalid = isFileExtensionInvalid("patients", errorHandler);

        expect(isInvalid).toBe(true);

        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_file_extension"
        );
    });
});
