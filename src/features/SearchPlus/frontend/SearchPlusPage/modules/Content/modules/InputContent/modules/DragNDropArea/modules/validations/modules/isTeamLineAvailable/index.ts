import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

export const isTeamLineAvailable = (
    lines: Array<string>,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const teamRowIndex = lines.findIndex((line) =>
        line.startsWith("Equipe responsável (Nome/INE)")
    );
    if (teamRowIndex === -1) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 04: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("team_name_not_found");
        return false;
    }
    return true;
};
