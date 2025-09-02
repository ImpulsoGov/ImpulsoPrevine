import { ordenarGrupos } from "@/helpers/lista-nominal/impressao/OrderGroups";
import type { ColumnsProps } from "../model";
import { UnitTable } from "./UnitTable";
import type { PropsWithChildren, ReactNode } from "react";
import { SplitByProp } from "./SplitByProp";
import type { AllPagesResponse } from "@/features/acf/shared/schema";

export type MultipleTeamsPerPageProps<TResponse extends AllPagesResponse> =
    PropsWithChildren<{
        data: Array<TResponse>;
        columns: Array<ColumnsProps>;
        propSplit: keyof TResponse;
    }>;

export const MultipleTeamsPerPage = <TResponse extends AllPagesResponse>({
    data,
    columns,
    children,
    propSplit,
}: MultipleTeamsPerPageProps<TResponse>): ReactNode => {
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
