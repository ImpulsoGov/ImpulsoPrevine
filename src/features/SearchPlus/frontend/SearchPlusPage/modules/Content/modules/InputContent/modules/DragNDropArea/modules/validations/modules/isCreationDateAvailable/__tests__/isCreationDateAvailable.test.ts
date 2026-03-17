import { isCreationDateAvailable } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import { trackFileUploadWithError } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock(
    "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

describe("isCreationDateAvailable", () => {
    const errorHandler = jest.fn() as jest.MockedFunction<
        (message: ErrorData) => void
    >;

    beforeEach((): void => {
        jest.clearAllMocks();
    });

    it("deve retornar true quando o índice da data de criação for válido", (): void => {
        const isDateAvailable = isCreationDateAvailable(3, errorHandler);

        expect(isDateAvailable).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar false quando o índice da data de criação for -1", (): void => {
        const isDateAvailable = isCreationDateAvailable(-1, errorHandler);

        expect(isDateAvailable).toBe(false);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 05: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "creation_date_not_found"
        );
    });
});
