import {
    adaptersMap,
    csvListTitleToListKey,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { parse } from "papaparse";
import type { CsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/Content";
import type * as time from "@/features/common/shared/time";
import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";

const createdAt = (
    lines: Array<string>
): { createdAtDate: time.BRTDateString; createdAtTime: time.BRTTimeString } => {
    const createdAtRowIndex = lines.findIndex((line) =>
        line.startsWith("Gerado em")
    );
    const splitCreatedAt = lines[createdAtRowIndex]?.split(";");

    const createdAtDate = splitCreatedAt[1];
    const createdAtTime = splitCreatedAt[3];
    return {
        createdAtDate: createdAtDate as time.BRTDateString,
        createdAtTime: createdAtTime as time.BRTTimeString,
    };
};

const csvContent = (lines: Array<string>): string => {
    const headerIndex = lines.findIndex((line) =>
        line.startsWith("Nome;Data de nascimento;")
    );
    return lines.slice(headerIndex).join("\n");
};

export const handleClick = (
    file: File,
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>,
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>,
    header: HeaderData,
    resetStates: (message: string) => void
): void => {
    const reader = new FileReader();
    reader.onload = (): void => {
        try {
            const text = typeof reader.result === "string" ? reader.result : "";

            const lines = text.split(/\r?\n/);

            const { createdAtDate, createdAtTime } = createdAt(lines);

            const cleanedText = csvContent(lines);

            const result = parse<CsvRow>(cleanedText, {
                header: true,
                skipEmptyLines: true,
                delimiter: ";",
            });

            setHeader((prev) => ({
                ...prev,
                createdAtDate: createdAtDate,
                createdAtTime: createdAtTime,
            }));
            if (!header.thematicList) {
                resetStates(
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

            const data: Array<SearchPlusItem> = adapter(result.data, {
                createdAtDate,
                createdAtTime,
            });

            setJsonData(data);
        } catch (err) {
            console.error(err);
            resetStates(
                "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
            );
        }
    };

    reader.onerror = (): void => {
        resetStates(
            "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
        );
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};
