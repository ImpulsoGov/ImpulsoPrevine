import type { SearchPlusItem } from "../../model";
import { DropHandler } from "../DropHandler";
import { useCallback } from "react";

type DropZoneProps = {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
};

export const DropZone: React.FC<DropZoneProps> = ({
    setError,
    setJsonData,
}) => {
    const handleDrop = useCallback(
        (
            event: React.DragEvent<HTMLDivElement>,
            setError: React.Dispatch<React.SetStateAction<string | null>>,
            setJsonData: React.Dispatch<
                React.SetStateAction<Array<SearchPlusItem>>
            >
        ): void => {
            DropHandler(event, setError, setJsonData);
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
