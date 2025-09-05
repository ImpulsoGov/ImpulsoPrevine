import type { AcfItem } from "@/features/acf/shared/schema";
import { UnitTable } from "./UnitTable";
import type { ColumnsProps, SortCallback } from "../model";
import type { PropsWithChildren, ReactNode } from "react";
import type { SplitedByProp } from "./SplitByProp";

export type SingleTeamPerPageProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: SplitedByProp<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        orderGroup: SortCallback<keyof TAcfItem>;
    }>;

export const SingleGroupPerPage = <TAcfItem extends AcfItem>({
    data,
    columns,
    orderGroup,
    children,
}: SingleTeamPerPageProps<TAcfItem>): ReactNode => {
    return (Object.keys(data) as Array<keyof TAcfItem>)
        .sort(orderGroup)
        .map((record, index) => {
            const recordString = record.toString();
            const currentColumn = data[recordString];
            return (
                <div key={`${recordString}-page-${index.toString()}`}>
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
                                <b>{currentColumn.title}</b>
                            </p>
                            <UnitTable
                                data={currentColumn.data}
                                columns={columns}
                                layoutOrientation="portrait"
                            />
                            <UnitTable
                                data={currentColumn.data}
                                columns={columns}
                                layoutOrientation="landscape"
                            />
                        </>
                    </div>
                </div>
            );
        });
};
