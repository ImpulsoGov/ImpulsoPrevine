import { Button } from "@/features/common/frontend/atoms";
import { UnitTable } from "../UnitTable";
import { columns } from "../../consts";
import type { SearchPlusItem } from "../../model";

type NominalListProps = {
    jsonData: Array<SearchPlusItem>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
};

export const NominalList: React.FC<NominalListProps> = ({
    jsonData,
    setJsonData,
}) => {
    return (
        <div
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button
                onClick={() => {
                    setJsonData([]);
                }}
            >
                Usar outro arquivo
            </Button>
            <h2>Lista Nominal</h2>
            <div>
                <UnitTable
                    data={jsonData}
                    columns={columns["breastAndUterusCare"]}
                    layoutOrientation="landscape"
                />
            </div>
        </div>
    );
};
