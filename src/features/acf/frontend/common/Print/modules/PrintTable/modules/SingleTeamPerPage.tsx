import type { AcfItem } from "@/features/acf/shared/schema";
import { UnitTable } from "./UnitTable";
import type { ColumnsProps, SortCallback } from "../model";
import type { PropsWithChildren, ReactNode } from "react";
import { SplitByProp } from "./SplitByProp";

export type SingleTeamPerPageProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: Array<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        splitBy: keyof TAcfItem;
        orderGroup: SortCallback<keyof TAcfItem>;
    }>;

export const SingleTeamPerPage = <TAcfItem extends AcfItem>({
    data,
    columns,
    splitBy,
    orderGroup,
    children,
}: SingleTeamPerPageProps<TAcfItem>): ReactNode => {
    const splitedByProp = SplitByProp(data, splitBy);
    return (Object.keys(splitedByProp) as Array<keyof TAcfItem>)
        .sort(orderGroup)
        .map((record, index) => {
            const recordString = record.toString();
            const column = columns.find((col) => col.fields.includes(splitBy));
            const titleFormatter = column?.titleFormatter;

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
                                <b>
                                    {titleFormatter
                                        ? titleFormatter(recordString)
                                        : recordString}
                                </b>
                            </p>
                            <UnitTable
                                data={splitedByProp[recordString]}
                                columns={columns}
                                layoutOrientation="portrait"
                            />
                            <UnitTable
                                data={splitedByProp[recordString]}
                                columns={columns}
                                layoutOrientation="landscape"
                            />
                        </>
                    </div>
                </div>
            );
        });
};
