import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

export const isFileExtensionInvalid = (
    fileName: string,
    errorHandler: (message: ErrorData) => void
): boolean => {
    if (!fileName.endsWith(".csv")) {
        errorHandler({
            title: "Ops! Parece que esse arquivo não é compatível.",
            message:
                "Erro 02: busca+mais funciona apenas com arquivos no formato CSV, baixados diretamente do PEC. Tente novamente.",
        });
        trackFileUploadWithError("invalid_file_extension");
        return true;
    }
    return false;
};
