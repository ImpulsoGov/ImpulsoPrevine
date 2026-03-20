import { hasInvalidBirthDate } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";

import * as time from "@/features/common/shared/time";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";

import type { ParseResult } from "papaparse";
import type { CsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/model";
import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";

jest.mock("@/features/common/shared/time");
jest.mock(
    "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track"
);

const createParseResult = (rows: Array<CsvRow>): ParseResult<CsvRow> => {
    return {
        data: rows,
        errors: [],
        meta: {
            aborted: false,
            cursor: 0,
            delimiter: ",",
            fields: [],
            linebreak: "\n",
            truncated: false,
        },
    };
};

describe("hasInvalidBirthDate", () => {
    const errorHandler = jest.fn() as jest.MockedFunction<
        (message: ErrorData) => void
    >;

    beforeEach((): void => {
        jest.clearAllMocks();
    });

    it("deve retornar false quando todas as datas de nascimento forem válidas", (): void => {
        jest.spyOn(time, "isBrtDateStringValid").mockReturnValue(true);

        const result = createParseResult([
            { "Data de nascimento": "01/01/2000" } as CsvRow,
        ]);

        const hasInvalidDate = hasInvalidBirthDate(result, errorHandler);

        expect(hasInvalidDate).toBe(false);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(trackFileUploadWithError).not.toHaveBeenCalled();
    });

    it("deve retornar true quando a data de nascimento for null", (): void => {
        const result = createParseResult([
            { "Data de nascimento": null } as unknown as CsvRow,
        ]);

        const hasInvalidDate = hasInvalidBirthDate(result, errorHandler);

        expect(hasInvalidDate).toBe(true);
        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_patient_birth_date"
        );
    });

    it("deve retornar true quando a data de nascimento estiver vazia", (): void => {
        const result = createParseResult([
            { "Data de nascimento": "" } as CsvRow,
        ]);

        const hasInvalidDate = hasInvalidBirthDate(result, errorHandler);

        expect(hasInvalidDate).toBe(true);
        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_patient_birth_date"
        );
    });

    it("deve retornar true quando a data de nascimento for inválida", (): void => {
        jest.spyOn(time, "isBrtDateStringValid").mockReturnValue(false);

        const result = createParseResult([
            { "Data de nascimento": "invalid-date" } as unknown as CsvRow,
        ]);

        const hasInvalidDate = hasInvalidBirthDate(result, errorHandler);

        expect(hasInvalidDate).toBe(true);
        expect(errorHandler).toHaveBeenCalledTimes(1);
        expect(trackFileUploadWithError).toHaveBeenCalledWith(
            "invalid_patient_birth_date"
        );
    });
});
