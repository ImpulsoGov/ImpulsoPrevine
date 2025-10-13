import { parse } from "papaparse";
import type { SearchPlusItem, CsvRow } from "../../model";
import { adaptersMap, csvListTitleToListKey } from "../../../adaptersMap";
import type { ListTitles } from "../../../adaptersMap";

export const DropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>
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
            const text = typeof reader.result === "string" ? reader.result : "";

            const lines = text.split(/\r?\n/);
            const listRowIndex = lines.findIndex((line) =>
                line.startsWith("Lista temática")
            );
            const list = lines[listRowIndex]?.split(";")[1] as
                | ListTitles
                | undefined;

            const headerIndex = lines.findIndex((line) =>
                line.startsWith("Nome;Data de nascimento;")
            );

            if (headerIndex === -1) {
                setError("Não foi possível encontrar o cabeçalho da tabela.");
                return;
            }

            const cleanedText = lines.slice(headerIndex).join("\n");

            const result = parse<CsvRow>(cleanedText, {
                header: true,
                skipEmptyLines: true,
                delimiter: ";",
            });
            if (!list || !(list in csvListTitleToListKey)) {
                setError("Lista temática não reconhecida ou não suportada.");
                return;
            }
            const adapter =
                adaptersMap[
                    csvListTitleToListKey[list] as keyof typeof adaptersMap
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
    reader.readAsText(file, "ISO-8859-1");
};
