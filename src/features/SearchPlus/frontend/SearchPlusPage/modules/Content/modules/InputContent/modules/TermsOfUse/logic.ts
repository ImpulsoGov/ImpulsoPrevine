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

const getFilter = (lines: Array<string>, filter: string): string | null => {
    const filterRowIndex = lines.findIndex((line) => line.startsWith(filter));
    if (filterRowIndex === -1) return null;
    const splitFilter = lines[filterRowIndex]?.split(";");
    return splitFilter[1] || null;
};

const getFilters = (lines: Array<string>): Record<string, string | null> => {
    const filtersToGet = [
        "Microárea",
        "Grupo de condições prioritários",
        "Buscar problemas/condições",
        "CIAP2 e CID10",
        "Sexo",
        "Identidade de gênero",
        "Faixa etária",
        "Raça/Cor",
        "Período do último atendimento",
    ];
    const filters: Record<string, string | null> = {};
    filtersToGet.forEach((filter) => {
        filters[filter] = getFilter(lines, filter);
    });
    return filters;
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
    errorHandler: (message: string) => void
): void => {
    const reader = new FileReader();
    reader.onload = (): void => {
        try {
            const text = typeof reader.result === "string" ? reader.result : "";
            const lines = text.split(/\r?\n/);

            const { createdAtDate, createdAtTime } = createdAt(lines);
            const filters = getFilters(lines);

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
                filters: filters,
            }));
            if (!header.thematicList) {
                errorHandler(
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
            errorHandler(
                "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
            );
        }
    };

    reader.onerror = (): void => {
        errorHandler(
            "Ops, parece que algo não funcionou! tente enviar um novo arquivo."
        );
    };
    //TODO: verificar encoding oficial do CSV originario do PEC
    reader.readAsText(file, "ISO-8859-1");
};
