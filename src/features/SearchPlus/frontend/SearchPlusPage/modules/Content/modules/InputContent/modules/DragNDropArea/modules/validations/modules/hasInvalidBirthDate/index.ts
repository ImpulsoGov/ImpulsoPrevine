import * as time from "@/features/common/shared/time";
import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import type { CsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/model";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";
import type { ParseResult } from "papaparse";

export const hasInvalidBirthDate = (
    result: ParseResult<CsvRow>,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const hasInvalidDate = result.data.some((item) => {
        return (
            item["Data de nascimento"] === null ||
            !time.isBrtDateStringValid(item["Data de nascimento"]) ||
            !item["Data de nascimento"]
        );
    });
    if (hasInvalidDate) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 07: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("invalid_patient_birth_date");
        return true;
    }
    return false;
};
