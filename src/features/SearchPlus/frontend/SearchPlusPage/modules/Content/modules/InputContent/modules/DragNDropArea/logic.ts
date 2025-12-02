import {
    csvListTitleToListKey,
    type ThematicList,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import * as time from "@/features/common/shared/time";
import { parse } from "papaparse";
import type { CsvRow } from "@features/SearchPlus/frontend/SearchPlusPage/modules/Content/modules/InputContent/model";
import mixpanel from "mixpanel-browser";

// TODO: revisar os tipos de erro
type ErrorType =
    | "invalid_file_extension"
    | "invalid_thematic_list"
    | "invalid_file_encoding"
    | "invalid_file_header"
    | "invalid_creation_date"
    | "invalid_patient_birth_date"
    | "team_name_not_found"
    | "creation_date_not_found"
    | "unknown_error";

// TODO: pensar se faz sentido que errorType seja errorCode
const trackFileUploadWithError = (errorType: ErrorType | null = null): void => {
    mixpanel.track("file_upload", {
        status: "error",
        error_type: errorType,
        thematic_list: null,
    });
};

const trackFileUploadWithSuccess = (thematicList: ThematicList): void => {
    mixpanel.track("file_upload", {
        status: "success",
        error_type: null,
        thematic_list: thematicList,
    });
};

const hasInvalidEncoding = (content: string): boolean => {
    // Caracteres e combinações típicas de UTF-8 lido como ISO-8859-1
    const suspiciousPatterns = /[�Ã¢ÃªÃ©Ã£Ã³ÃºÃ±]|Ã./;
    return suspiciousPatterns.test(content);
};
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
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>
): void => {
    if (!file.name.endsWith(".csv")) {
        errorHandler({
            title: "Ops! Parece que esse arquivo não é compatível.",
            message:
                "<div>O busca+mais funciona apenas com arquivos CSV baixados diretamente do PEC. Para saber como encontrar e baixar o arquivo certo, <a href='www.google.com' style='text-decoration: underline;' >clique aqui.</a></div>",
        });
        trackFileUploadWithError("invalid_file_extension");
        return;
    }
    const reader = new FileReader();
    reader.onload = (): void => {
        try {
            const rawFile =
                typeof reader.result === "string" ? reader.result : "";

            if (hasInvalidEncoding(rawFile)) {
                errorHandler({
                    title: "Ops! Parece que esse arquivo está em formato incorreto.",
                    message:
                        "O arquivo não parece estar em ISO-8859-1. Baixe novamente o CSV diretamente do PEC antes de tentar novamente, não edite ou abra o arquivo em outros editores.",
                });
                trackFileUploadWithError("invalid_file_encoding");
                return;
            }

            const lines = rawFile.split(/\r?\n/);
            const listRowIndex = lines.findIndex((line) =>
                line.startsWith("Lista temática")
            );
            const headerIndex = lines.findIndex((line) =>
                line.startsWith("Nome;Data de nascimento;")
            );

            if (headerIndex === -1) {
                errorHandler({
                    title: "Ops, parece que algo não funcionou!",
                    message:
                        "Cabeçalho do arquivo CSV não encontrado ou em formato incorreto.",
                });
                trackFileUploadWithError("invalid_file_header");
                return;
            }

            const list = lines[listRowIndex]?.split(
                ";"
            )[1] as ThematicList | null;
            if (!list || !(list in csvListTitleToListKey)) {
                errorHandler({
                    title: "Ops! Parece que essa lista temática ainda não está disponível",
                    message:
                        "Por enquanto busca+mais funciona apenas com a lista de saúde da mulher e do homem trans.",
                });
                trackFileUploadWithError("invalid_thematic_list");
                return;
            } else {
                setHeader((prev) => ({
                    ...prev,
                    thematicList: list,
                }));
            }

            const teamRowIndex = lines.findIndex((line) =>
                line.startsWith("Equipe responsável (Nome/INE)")
            );
            if (teamRowIndex === -1) {
                errorHandler({
                    title: "Ops, parece que algo não funcionou!",
                    message: "Equipe responsável não encontrada",
                });
                trackFileUploadWithError("team_name_not_found");
                return;
            }

            const createdAtRowIndex = lines.findIndex((line) =>
                line.startsWith("Gerado em")
            );
            if (createdAtRowIndex === -1) {
                errorHandler({
                    title: "Ops, parece que algo não funcionou!",
                    message: "Data de geração do arquivo não encontrada",
                });
                trackFileUploadWithError("creation_date_not_found");
                return;
            }
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
                    message: "Data de geração em formato incorreto.",
                });
                trackFileUploadWithError("invalid_creation_date");
                return;
            }

            const cleanedText = csvContent(lines);
            const result = parse<CsvRow>(cleanedText, {
                header: true,
                skipEmptyLines: true,
                delimiter: ";",
            });

            const hasNullBirthDate = result.data.some((item) => {
                return (
                    item["Data de nascimento"] === null ||
                    !item["Data de nascimento"]
                );
            });

            if (hasNullBirthDate) {
                errorHandler({
                    title: "Ops, parece que algo não funcionou!",
                    message: "Um paciente possui data de nascimento inválida.",
                });
                trackFileUploadWithError("invalid_patient_birth_date");
                return;
            }

            setRawFileContent(file);
            trackFileUploadWithSuccess(list);
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
