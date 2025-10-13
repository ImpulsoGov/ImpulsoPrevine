import { CsvDropzone } from "./common/CsvDropZone";

export const SearchPlusPage: React.FC = () => {
    return (
        <>
            <div
                style={{
                    padding: "20px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Busca+
            </div>
            <CsvDropzone />
        </>
    );
};
