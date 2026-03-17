import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

export const isHeaderValid = (
    lines: Array<string>,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const headerIndex = lines.findIndex((line) =>
        line.startsWith("Nome;Data de nascimento;")
    );
    if (headerIndex === -1) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 01: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("invalid_file_header");
        return false;
    }
    return true;
};
