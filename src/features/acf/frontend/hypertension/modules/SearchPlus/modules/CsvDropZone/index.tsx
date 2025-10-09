"use client";

import React, { useCallback, useState } from "react";
import { parse, type ParseResult } from "papaparse";

type CsvRow = Record<string, string>;

export const CsvDropzone: React.FC = () => {
    const [jsonData, setJsonData] = useState<Array<CsvRow>>([]);
    const [error, setError] = useState<string | null>(null);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];

        if (!file.name.endsWith(".csv")) {
            setError("Por favor envie um arquivo CSV válido.");
            return;
        }
        console.log(file);
        const reader = new FileReader();
        reader.onload = (): void => {
            try {
                const text =
                    typeof reader.result === "string" ? reader.result : "";

                // Encontrar a linha que contém o cabeçalho real
                const lines = text.split(/\r?\n/);
                const headerIndex = lines.findIndex((line) =>
                    line.startsWith("Nome;Data de nascimento;")
                );

                if (headerIndex === -1) {
                    setError(
                        "Não foi possível encontrar o cabeçalho da tabela."
                    );
                    return;
                }

                // Pegar apenas o trecho da tabela (do cabeçalho até o fim)
                const cleanedText = lines.slice(headerIndex).join("\n");

                // Agora sim, parsear o conteúdo limpo
                const result: ParseResult<CsvRow> = parse<CsvRow>(cleanedText, {
                    header: true,
                    skipEmptyLines: true,
                    delimiter: ";",
                });

                setJsonData(result.data);
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
        reader.readAsText(file, "utf-8");
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };
    console.log(jsonData);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {!(jsonData.length > 0) && (
                <div
                    onDrop={handleDrop}
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
            )}

            {error && <p>{error}</p>}

            {jsonData.length > 0 && (
                <div>
                    <h2>Resultado JSON:</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};
