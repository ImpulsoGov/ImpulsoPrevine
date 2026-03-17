import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

export const isCreationDateAvailable = (
    createdAtRowIndex: number,
    errorHandler: (message: ErrorData) => void
): boolean => {
    if (createdAtRowIndex === -1) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 05: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("creation_date_not_found");
        return false;
    }
    return true;
};
