import { isTeamLineAvailable } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import { trackFileUploadWithError } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock(
    "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

describe("isTeamLineAvailable", () => {
    let errorHandler: jest.MockedFunction<(message: ErrorData) => void>;

    beforeEach((): void => {
        jest.clearAllMocks();
        errorHandler = jest.fn();
    });

    it("deve retornar true quando a linha da equipe estiver presente", (): void => {
        const lines: Array<string> = [
            "Alguma linha inicial",
            "Equipe responsável (Nome/INE);Equipe A",
            "Outra linha",
        ];

        const isAvailable = isTeamLineAvailable(lines, errorHandler);

        expect(isAvailable).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar false quando a linha da equipe não estiver presente", (): void => {
        const lines: Array<string> = [
            "Linha qualquer",
            "Nome;Data de nascimento;CPF",
        ];

        const isAvailable = isTeamLineAvailable(lines, errorHandler);

        expect(isAvailable).toBe(false);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 04: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "team_name_not_found"
        );
    });

    it("deve retornar false quando o arquivo estiver vazio", (): void => {
        const lines: Array<string> = [];

        const isAvailable = isTeamLineAvailable(lines, errorHandler);

        expect(isAvailable).toBe(false);

        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "team_name_not_found"
        );
    });
});
