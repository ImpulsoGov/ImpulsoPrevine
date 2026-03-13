import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import type { ThematicList } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { csvListTitleToListKey } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type { CsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/model";
import { trackFileUploadWithError } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/modules/DragNDropArea/modules/track";
import type { ParseResult } from "papaparse";
import * as time from "@/features/common/shared/time";
import type { PregnancyAndPuerperiumCareCsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

export const isHeaderValid = (
    lines: Array<string>,
    errorHandler: (message: ErrorData) => void
): void => {
    const headerIndex = lines.findIndex((line) =>
        line.startsWith("Nome;Data de nascimento;")
    );
    if (headerIndex === -1) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("invalid_file_header");
    }
};

export const isFileExtensionValid = (
    fileName: string,
    errorHandler: (message: ErrorData) => void
): boolean => {
    if (!fileName.endsWith(".csv")) {
        errorHandler({
            title: "Ops! Parece que esse arquivo não é compatível.",
            message:
                "O busca+mais funciona apenas com arquivos no formato CSV, baixados diretamente do PEC. Tente novamente.",
        });
        trackFileUploadWithError("invalid_file_extension");
        return true;
    }
    return false;
};

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
                ? "Por enquanto busca+mais funciona apenas com a lista temática de Cuidado da Mulher e do Homem Transgênero Na Prevenção do Câncer e Cuidado da Gestante e Puérpera."
                : "Por enquanto busca+mais funciona apenas com a lista temática de Cuidado da Mulher e do Homem Transgênero Na Prevenção do Câncer.",
        });
        trackFileUploadWithError("invalid_thematic_list");
        return false;
    }
    return true;
};

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
                "Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("team_name_not_found");
        return false;
    }
    return true;
};

export const isCreationDateAvailable = (
    createdAtRowIndex: number,
    errorHandler: (message: ErrorData) => void
): boolean => {
    if (createdAtRowIndex === -1) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("creation_date_not_found");
        return false;
    }
    return true;
};

export const isCreationDateValid = (
    createdAtRowIndex: number,
    lines: Array<string>,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const splitCreatedAt = lines[createdAtRowIndex]?.split(";");
    let createdAtDate;
    let createdAtTime;

    if (splitCreatedAt.length >= 4) {
        createdAtDate = splitCreatedAt[1];
        createdAtTime = splitCreatedAt[3];
    }

    if (
        createdAtDate &&
        createdAtTime &&
        (!time.isBrtDateStringValid(createdAtDate) ||
            !time.isBrtTimeStringValid(createdAtTime))
    ) {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("invalid_creation_date");
        return false;
    }
    return true;
};

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
                "Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
        trackFileUploadWithError("invalid_patient_birth_date");
        return true;
    }
    return false;
};

export const validationsPregnancyAndPuerperium = (
    data: Array<PregnancyAndPuerperiumCareCsvRow>,
    errorHandler: (message: ErrorData) => void
): void => {
    const raiseError = (): void => {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
    };
    if (
        data.some((item) => {
            return (
                item[
                    "Quantidade de atendimentos até 12 semanas no pré-natal"
                ] === "-" ||
                item["Quantidade de atendimentos no pré-natal"] === "-" ||
                item["Quantidade de visitas domiciliares no puerpério"] ===
                    "-" ||
                item["Quantidade de atendimentos no puerpério"] === "-" ||
                item["IG (DUM) (dias)"] === "-" ||
                item["IG (DUM) (semanas)"] === "-" ||
                item["IG (ecografia obstétrica) (semanas)"] === "-" ||
                item["IG (ecografia obstétrica) (dias)"] === "-"
            );
        })
    )
        raiseError();
};
