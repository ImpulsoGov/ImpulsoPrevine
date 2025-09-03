import type { AcfItem } from "@/features/acf/shared/schema";
import { UnitTable } from "./UnitTable";
import type { ColumnsProps } from "../model";
import type { PropsWithChildren, ReactNode } from "react";
import { SplitByProp } from "./SplitByProp";

export type SingleTeamPerPageProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: Array<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        splitBy: keyof TAcfItem;
    }>;

export const SingleTeamPerPage = <TAcfItem extends AcfItem>({
    data,
    columns,
    splitBy,
    children,
}: SingleTeamPerPageProps<TAcfItem>): ReactNode => {
    const splitedByProp = SplitByProp(data, splitBy);
    return (
        Object.keys(splitedByProp)
            // .sort(ordenarGrupos)
            .map((record, index) => {
                return (
                    <div key={record + String(index)}>
                        <div
                            style={{
                                pageBreakAfter: "always",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {children}
                            <>
                                <p
                                    style={{
                                        fontSize: "11px",
                                        fontFamily: `Inter, sans-serif`,
                                        marginTop: "16px",
                                        marginBottom: "0px",
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
                            </>
                        </div>
                    </div>
                );
            })
    );
};
