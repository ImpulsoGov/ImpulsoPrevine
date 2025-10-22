import {
    adaptersMap,
    csvListTitleToListKey,
    type ListTitles,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/common/carePathways";
import { useCallback } from "react";
import { parse } from "papaparse";
import type { CsvRow } from "./model";

type DropZoneProps = {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
};

export const InputContent: React.FC<DropZoneProps> = ({
    setError,
    setJsonData,
}) => {
    //Todo: pensar onde colocar essa lógica, aqui no meio tá muito grande
    const handleDrop = useCallback(
        (
            event: React.DragEvent<HTMLDivElement>,
            setError: React.Dispatch<React.SetStateAction<string | null>>,
            setJsonData: React.Dispatch<
                React.SetStateAction<Array<SearchPlusItem>>
            >
        ): void => {
            event.preventDefault();
            event.stopPropagation();

            const file = event.dataTransfer.files[0];

            if (!file.name.endsWith(".csv")) {
                setError("Por favor envie um arquivo CSV válido.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (): void => {
                try {
                    const text =
                        typeof reader.result === "string" ? reader.result : "";

                    const lines = text.split(/\r?\n/);
                    const listRowIndex = lines.findIndex((line) =>
                        line.startsWith("Lista temática")
                    );
                    const list = lines[listRowIndex]?.split(";")[1] as
                        | ListTitles
                        | undefined;

                    // const createdAtRowIndex = lines.findIndex((line) =>
                    //     line.startsWith("Gerado em")
                    // );
                    // const splitCreatedAt = lines[createdAtRowIndex]?.split(";");
                    // const createdAtDate = splitCreatedAt[1];
                    // const createdAtTime = splitCreatedAt[3];

                    const headerIndex = lines.findIndex((line) =>
                        line.startsWith("Nome;Data de nascimento;")
                    );

                    if (headerIndex === -1) {
                        setError(
                            "Não foi possível encontrar o cabeçalho da tabela."
                        );
                        return;
                    }

                    const cleanedText = lines.slice(headerIndex).join("\n");

                    const result = parse<CsvRow>(cleanedText, {
                        header: true,
                        skipEmptyLines: true,
                        delimiter: ";",
                    });
                    if (!list || !(list in csvListTitleToListKey)) {
                        setError(
                            "Lista temática não reconhecida ou não suportada."
                        );
                        return;
                    }
                    const adapter =
                        adaptersMap[
                            csvListTitleToListKey[
                                list
                            ] as keyof typeof adaptersMap
                        ];
                    const data: Array<SearchPlusItem> = adapter(result.data);

                    setJsonData(data);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(`Erro ao processar arquivo: ${err.message}`);
                    } else {
                        setError("Erro desconhecido ao processar arquivo.");
                    }
                }
            };

            reader.onerror = (): void => {
                setError("Erro ao ler o arquivo.");
            };
            //TODO: verificar encoding oficial do CSV originario do PEC
            reader.readAsText(file, "ISO-8859-1");
        },
        []
    );

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };
    return (
        <div
            onDrop={(event) => {
                handleDrop(event, setError, setJsonData);
            }}
            onDragOver={handleDragOver}
            style={{
                border: "2px dashed #ccc",
                borderRadius: "10px",
                padding: "80px",
                margin: "30px",
                width: "80%",
                textAlign: "center",
            }}
        >
            <p>Arraste e solte um arquivo CSV aqui</p>
        </div>
    );
};
