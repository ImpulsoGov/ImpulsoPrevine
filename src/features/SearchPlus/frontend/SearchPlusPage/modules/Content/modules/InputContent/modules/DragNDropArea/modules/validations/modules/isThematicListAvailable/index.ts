import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import {
    type ThematicList,
    csvListTitleToListKey,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

export const isThematicListAvailable = (
    list: ThematicList | null,
    isSearchPlusNewCarePathwayEnabled: boolean,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const availableLists = (
        isSearchPlusNewCarePathwayEnabled
            ? Object.keys(csvListTitleToListKey)
            : Object.keys(csvListTitleToListKey).slice(0, 1)
    ) as Array<ThematicList>;
    if (!list || !availableLists.includes(list)) {
        errorHandler({
            title: "Ops! Parece que essa lista temática ainda não está disponível",
            message: isSearchPlusNewCarePathwayEnabled
                ? "Erro 03: Por enquanto busca+mais funciona apenas com a lista temática de Cuidado da Mulher e do Homem Transgênero Na Prevenção do Câncer e Cuidado da Gestante e Puérpera."
                : "Erro 03: Por enquanto busca+mais funciona apenas com a lista temática de Cuidado da Mulher e do Homem Transgênero Na Prevenção do Câncer.",
        });
        trackFileUploadWithError("invalid_thematic_list");
        return false;
    }
    return true;
};
