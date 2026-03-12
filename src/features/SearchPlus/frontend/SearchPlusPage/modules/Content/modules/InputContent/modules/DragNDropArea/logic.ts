import { type ThematicList } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import { parse } from "papaparse";
import type { CsvRow } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/model";
import {
    trackFileUploadWithError,
    trackFileUploadWithSuccess,
} from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";
import * as validations from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/validations";
import type { PregnancyAndPuerperiumCareCsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const csvContent = (lines: Array<string>): string => {
    const headerIndex = lines.findIndex((line) =>
        line.startsWith("Nome;Data de nascimento;")
    );
    return lines.slice(headerIndex).join("\n");
};

export const handleFileUpload = (
    file: File,
    errorHandler: (message: ErrorData) => void,
    setRawFileContent: React.Dispatch<React.SetStateAction<File | null>>,
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>,
    setSuccessSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
    isSearchPlusNewCarePathwayEnabled: boolean
): void => {
    if (validations.isFileExtensionValid(file.name, errorHandler)) return;

    const reader = new FileReader();
    reader.onload = (): void => {
        try {
            const rawFile =
                typeof reader.result === "string" ? reader.result : "";
            const lines = rawFile.split(/\r?\n/);
            const listRowIndex = lines.findIndex((line) =>
                line.startsWith("Lista temática")
            );

            validations.isHeaderValid(lines, errorHandler);

            const list = lines[listRowIndex]?.split(
                ";"
            )[1] as ThematicList | null;

            if (
                validations.isThematicListAvailable(
                    list,
                    isSearchPlusNewCarePathwayEnabled,
                    errorHandler
                )
            ) {
                return;
            } else {
                setHeader((prev) => ({
                    ...prev,
                    thematicList: list,
                }));
            }

            if (!validations.isTeamLineAvailable(lines, errorHandler)) return;

            const createdAtRowIndex = lines.findIndex((line) =>
                line.startsWith("Gerado em")
            );

            if (
                !validations.isCreationDateAvailable(
                    createdAtRowIndex,
                    errorHandler
                )
            )
                return;

            if (
                !validations.isCreationDateValid(
                    createdAtRowIndex,
                    lines,
                    errorHandler
                )
            )
                return;

            const cleanedText = csvContent(lines);
            const result = parse<CsvRow>(cleanedText, {
                header: true,
                skipEmptyLines: true,
                delimiter: ";",
            });

            if (validations.hasInvalidBirthDate(result, errorHandler)) return;

            //TODO: adicionar validacao de numero e nao deixar o csv ser valido quando o numero estiver errado (NaN) ou for um -

            if (list === "Gestação e puerpério")
                validations.validationsPregnancyAndPuerperium(
                    result.data as Array<PregnancyAndPuerperiumCareCsvRow>,
                    errorHandler
                );

            setRawFileContent(file);
            setSuccessSnackbar(true);
            trackFileUploadWithSuccess(list as ThematicList);
        } catch (err) {
            if (err instanceof Error) {
                errorHandler({
                    title: "Ops, parece que algo não funcionou!",
                    message: `Erro ao processar arquivo: ${err.message}`,
                });
            } else {
                errorHandler({
                    title: "Ops, parece que algo não funcionou!",
                    message: "Erro desconhecido ao processar arquivo.",
                });
            }
            trackFileUploadWithError("unknown_error");
        }
    };

    reader.onerror = (): void => {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message: "Erro desconhecido ao processar arquivo.",
        });
        trackFileUploadWithError("unknown_error");
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};
