import { Thead } from "./modules/Thead";
import { TableRow } from "./modules/TableRow";
import type { LayoutOrientation } from "./model";
import type { ColumnsProps } from "../carePathways";
import type { BreastAndUterusCareItem } from "../carePathways/modules/breastAndUterusCare";
import type { PregnancyAndPuerperiumCareItem } from "../carePathways/modules/pregnancyAndPuerperiumCare";

export type UnitTableProps = {
    // TODO: criar type alias para esse union e usar nos locais onde aparece
    data:
        | Array<BreastAndUterusCareItem>
        | Array<PregnancyAndPuerperiumCareItem>;
    columns: Array<ColumnsProps>;
    layoutOrientation: LayoutOrientation;
};

export const UnitTable = ({
    data,
    columns,
    layoutOrientation,
}: UnitTableProps): React.ReactNode => {
    return (
        <div
            className={
                layoutOrientation === "landscape" ? "landscape" : "portrait"
            }
            style={{
                display: layoutOrientation === "landscape" ? "block" : "none",
            }}
        >
            <table
                style={{
                    borderCollapse: "collapse",
                    color: "#1F1F1F",
                    textAlign: "center",
                    fontSize: "10px",
                    fontFamily: `Inter, sans-serif`,
                    letterSpacing: "-0.12px",
                    width: "fit-content",
                    marginBottom: "10px",
                }}
            >
                <Thead
                    columns={columns}
                    layoutOrientation={layoutOrientation}
                />
                <tbody>
                    {Array.isArray(data) &&
                        data.map((item, index) => (
                            <tr
                                key={`row-${index.toString()}`}
                                style={{
                                    borderBottom: "solid 1px #757574",
                                }}
                            >
                                <TableRow
                                    item={item}
                                    columns={columns}
                                    layoutOrientation={layoutOrientation}
                                />
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
