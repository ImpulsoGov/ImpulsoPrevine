// import { ordenarGrupos } from "@/helpers/lista-nominal/impressao/OrderGroups";
import type { ColumnsProps } from "../model";
import { UnitTable } from "./UnitTable";
import type { PropsWithChildren, ReactNode } from "react";
import { SplitByProp } from "./SplitByProp";
import type { AcfItem } from "@/features/acf/shared/schema";

export type MultipleTeamsPerPageProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: Array<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        propSplit: keyof TAcfItem;
    }>;

export const MultipleTeamsPerPage = <TAcfItem extends AcfItem>({
    data,
    columns,
    children,
    propSplit,
}: MultipleTeamsPerPageProps<TAcfItem>): ReactNode => {
    const splitedByProp = SplitByProp(data, propSplit);
    return (
        <div key="multiple-teams-per-page">
            {children}
            {Object.keys(splitedByProp)
                // .sort(ordenarGrupos)
                .map((record, index) => {
                    return (
                        <div key={record + String(index)}>
                            <div key={`${record}${index.toString()}`}>
                                <p
                                    style={{
                                        fontSize: "11px",
                                        fontFamily: `Inter, sans-serif`,
                                        marginTop: "40px",
                                        marginBottom: "17px",
                                    }}
                                >
                                    <b>{record}</b>
                                </p>
                                <UnitTable
                                    data={splitedByProp[record]}
                                    columns={columns}
                                    layoutOrientation="portrait"
                                />
                                <UnitTable
                                    data={splitedByProp[record]}
                                    columns={columns}
                                    layoutOrientation="landscape"
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
