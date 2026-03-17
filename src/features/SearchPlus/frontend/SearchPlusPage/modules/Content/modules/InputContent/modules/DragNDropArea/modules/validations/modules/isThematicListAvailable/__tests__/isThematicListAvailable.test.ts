import { isThematicListAvailable } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import {
    csvListTitleToListKey,
    type ThematicList,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";

import { trackFileUploadWithError } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock(
    "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

describe("isThematicListAvailable", () => {
    let errorHandler: jest.MockedFunction<(message: ErrorData) => void>;

    const availableLists = Object.keys(
        csvListTitleToListKey
    ) as Array<ThematicList>;

    beforeEach((): void => {
        jest.clearAllMocks();
        errorHandler = jest.fn();
    });

    it("deve retornar true quando a lista for válida com feature flag habilitada", (): void => {
        const list = availableLists[0];

        const isAvailable = isThematicListAvailable(list, true, errorHandler);

        expect(isAvailable).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar true quando a lista for a primeira lista disponível com feature flag desabilitada", (): void => {
        const list = availableLists[0];

        const isAvailable = isThematicListAvailable(list, false, errorHandler);

        expect(isAvailable).toBe(true);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar false quando a lista não estiver disponível", (): void => {
        const invalidList = "invalid_list" as ThematicList;

        const isAvailable = isThematicListAvailable(
            invalidList,
            true,
            errorHandler
        );

        expect(isAvailable).toBe(false);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops! Parece que essa lista temática ainda não está disponível",
            message:
                "Erro 03: Por enquanto busca+mais funciona apenas com a lista temática de Cuidado da Mulher e do Homem Transgênero Na Prevenção do Câncer e Cuidado da Gestante e Puérpera.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_thematic_list"
        );
    });

    it("deve retornar false quando a lista for null", (): void => {
        const isAvailable = isThematicListAvailable(null, true, errorHandler);

        expect(isAvailable).toBe(false);

        expect(errorHandler).toHaveBeenCalled();
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_thematic_list"
        );
    });

    it("deve retornar false quando feature flag estiver desabilitada e a lista não for a primeira", (): void => {
        if (availableLists.length < 2) return;

        const secondList = availableLists[1];

        const isAvailable = isThematicListAvailable(
            secondList,
            false,
            errorHandler
        );

        expect(isAvailable).toBe(false);

        expect(errorHandler).toHaveBeenCalledWith({
            title: "Ops! Parece que essa lista temática ainda não está disponível",
            message:
                "Erro 03: Por enquanto busca+mais funciona apenas com a lista temática de Cuidado da Mulher e do Homem Transgênero Na Prevenção do Câncer.",
        });

        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_thematic_list"
        );
    });
});
