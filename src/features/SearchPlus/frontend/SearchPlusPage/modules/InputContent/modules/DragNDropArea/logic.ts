import {
    csvListTitleToListKey,
    type ThematicList,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import * as time from "@/features/common/shared/time";

export const handleFileUpload = (
    file: File,
    setSnackbarError: React.Dispatch<React.SetStateAction<ErrorData>>,
    setRawFileContent: React.Dispatch<React.SetStateAction<File | null>>,
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>
): void => {
    if (!file.name.endsWith(".csv")) {
        setSnackbarError({
            title: "Ops! Parece que esse arquivo não é compatível.",
            message:
                "<div>O busca+mais funciona apenas com arquivos CSV baixados diretamente do PEC. Para saber como encontrar e baixar o arquivo certo, <a href='www.google.com' style='text-decoration: underline;' >clique aqui.</a></div>",
        });
        return;
    }
    const reader = new FileReader();
    reader.onload = (): void => {
        try {
            const rawFile =
                typeof reader.result === "string" ? reader.result : "";

            const lines = rawFile.split(/\r?\n/);
            const listRowIndex = lines.findIndex((line) =>
                line.startsWith("Lista temática")
            );
            const headerIndex = lines.findIndex((line) =>
                line.startsWith("Nome;Data de nascimento;")
            );

            if (headerIndex === -1) {
                setSnackbarError({
                    title: "Ops, parece que algo não funcionou!",
                    message:
                        "Cabeçalho do arquivo CSV não encontrado ou em formato incorreto.",
                });
                return;
            }
            const list = lines[listRowIndex]?.split(
                ";"
            )[1] as ThematicList | null;

            if (!list || !(list in csvListTitleToListKey)) {
                setSnackbarError({
                    title: "Ops! Parece que essa lista temática ainda não está disponível",
                    message:
                        "Por enquanto busca+mais funciona apenas com a lista de saúde da mulher e do homem trans.",
                });
                return;
            } else {
                setHeader((prev) => ({
                    ...prev,
                    thematicList: list,
                }));
            }

            const createdAtRowIndex = lines.findIndex((line) =>
                line.startsWith("Gerado em")
            );

            const splitCreatedAt = lines[createdAtRowIndex]?.split(";");

            const createdAtDate = splitCreatedAt[1];
            const createdAtTime = splitCreatedAt[3];

            if (
                !time.isBrtDateStringValid(createdAtDate) ||
                !time.isBrtTimeStringValid(createdAtTime)
            ) {
                setSnackbarError({
                    title: "Ops, parece que algo não funcionou!",
                    message:
                        "Data de geração do arquivo inválida ou em formato incorreto.",
                });
                return;
            }
            setRawFileContent(file);
        } catch (err) {
            if (err instanceof Error) {
                setSnackbarError({
                    title: "Ops, parece que algo não funcionou!",
                    message: `Erro ao processar arquivo: ${err.message}`,
                });
            } else {
                setSnackbarError({
                    title: "Ops, parece que algo não funcionou!",
                    message: "Erro desconhecido ao processar arquivo.",
                });
            }
        }
    };

    reader.onerror = (): void => {
        setSnackbarError({
            title: "Ops, parece que algo não funcionou!",
            message: "Erro desconhecido ao processar arquivo.",
        });
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};
