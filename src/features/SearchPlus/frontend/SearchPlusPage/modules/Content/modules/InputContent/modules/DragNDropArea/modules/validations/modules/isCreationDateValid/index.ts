import * as time from "@/features/common/shared/time";
import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

const CREATED_AT_DATE_INDEX = 1;
const CREATED_AT_TIME_INDEX = 3;

export const isCreationDateValid = (
    createdAtRowIndex: number,
    lines: Array<string>,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const splitCreatedAt = lines[createdAtRowIndex]?.split(";") ?? [];

    if (splitCreatedAt.length <= CREATED_AT_TIME_INDEX) {
        return false;
    }

    const createdAtDate = splitCreatedAt[CREATED_AT_DATE_INDEX];
    const createdAtTime = splitCreatedAt[CREATED_AT_TIME_INDEX];

    const isDateValid = time.isBrtDateStringValid(createdAtDate);
    const isTimeValid = time.isBrtTimeStringValid(createdAtTime);

    if (!isDateValid || !isTimeValid) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 06: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });

        trackFileUploadWithError("invalid_creation_date");

        return false;
    }

    return true;
};
