// TODO: Talvez esse arquivo devesse ser um logic
import {
    adaptersMap,
    csvListTitleToListKey,
    type ThematicList,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { parse } from "papaparse";
import type { CsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/InputContent/model";
import * as time from "@/features/common/shared/time";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";

// TODO: essa função só é usada no módulo TermsOfUse, faria sentido mover ela pra lá
export const handleClick = (
    file: File,
    setError: React.Dispatch<React.SetStateAction<ErrorData>>,
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>,
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>,
    setIsError: React.Dispatch<React.SetStateAction<string>>,
    header: HeaderData
): void => {
    const reader = new FileReader();
    reader.onload = (): void => {
        try {
            const text = typeof reader.result === "string" ? reader.result : "";

            const lines = text.split(/\r?\n/);
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
                setError({
                    title: "Ops, parece que algo não funcionou!",
                    message:
                        "Data de geração do arquivo inválida ou em formato incorreto.",
                });
                return;
            }

            const headerIndex = lines.findIndex((line) =>
                line.startsWith("Nome;Data de nascimento;")
            );
            const cleanedText = lines.slice(headerIndex).join("\n");

            const result = parse<CsvRow>(cleanedText, {
                header: true,
                skipEmptyLines: true,
                delimiter: ";",
            });

            const createdAt = {
                createdAtDate: createdAtDate as time.BRTDateString,
                createdAtTime: createdAtTime as time.BRTTimeString,
            };

            setHeader((prev) => ({
                ...prev,
                createdAtDate: createdAt.createdAtDate,
                createdAtTime: createdAt.createdAtTime,
            }));
            if (!header.thematicList) {
                setError({
                    title: "Ops! Parece que essa lista temática ainda não está disponível",
                    message:
                        "Por enquanto busca+mais funciona apenas com as lista de hipertensão, diabetes e saúde da mulher e do homem trans.",
                });
                return;
            }
            const adapter =
                adaptersMap[
                    csvListTitleToListKey[
                        header.thematicList
                    ] as keyof typeof adaptersMap
                ];

            const data: Array<SearchPlusItem> = adapter(result.data, createdAt);

            setJsonData(data);
        } catch (err) {
            console.error(err);
            setIsError(
                "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
            );
        }
    };

    reader.onerror = (): void => {
        setIsError(
            "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
        );
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};

export const handleFileUpload = (
    file: File,
    setError: React.Dispatch<React.SetStateAction<ErrorData>>,
    setRawFileContent: React.Dispatch<React.SetStateAction<File | null>>,
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>
): void => {
    if (!file.name.endsWith(".csv")) {
        setError({
            title: "Ops! Parece que esse arquivo não é compatível.",
            message:
                "O busca+mais funciona apenas com arquivos CSV baixados diretamente do PEC. Para saber como encontrar e baixar o arquivo certo, clique aqui.",
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
                setError({
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
                setError({
                    title: "Ops! Parece que essa lista temática ainda não está disponível",
                    message:
                        "Por enquanto busca+mais funciona apenas com as lista de hipertensão, diabetes e saúde da mulher e do homem trans.",
                });
                return;
            } else {
                setHeader((prev) => ({
                    ...prev,
                    thematicList: list,
                }));
            }

            setRawFileContent(file);
        } catch (err) {
            if (err instanceof Error) {
                setError({
                    title: "Ops, parece que algo não funcionou!",
                    message: `Erro ao processar arquivo: ${err.message}`,
                });
            } else {
                setError({
                    title: "Ops, parece que algo não funcionou!",
                    message: "Erro desconhecido ao processar arquivo.",
                });
            }
        }
    };

    reader.onerror = (): void => {
        setError({
            title: "Ops, parece que algo não funcionou!",
            message: "Erro desconhecido ao processar arquivo.",
        });
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};
