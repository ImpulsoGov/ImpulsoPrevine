import {
    adaptersMap,
    csvListTitleToListKey,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { parse } from "papaparse";
import type { CsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/InputContent/model";
import type * as time from "@/features/common/shared/time";
import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";

export const handleClick = (
    file: File,
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>,
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>,
    setRawFileContent: React.Dispatch<React.SetStateAction<File | null>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
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
                setJsonData([]);
                setRawFileContent(null);
                setHeader({
                    thematicList: null,
                    createdAtDate: "01/01/1970",
                    createdAtTime: "00:00",
                });
                setErrorMessage(
                    "Por enquanto busca+mais funciona apenas com a lista de saúde da mulher e do homem trans."
                );
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
            setJsonData([]);
            setRawFileContent(null);
            setHeader({
                thematicList: null,
                createdAtDate: "01/01/1970",
                createdAtTime: "00:00",
            });
            setErrorMessage(
                "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
            );
        }
    };

    reader.onerror = (): void => {
        setRawFileContent(null);
        setJsonData([]);
        setHeader({
            thematicList: null,
            createdAtDate: "01/01/1970",
            createdAtTime: "00:00",
        });

        setErrorMessage(
            "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
        );
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};
