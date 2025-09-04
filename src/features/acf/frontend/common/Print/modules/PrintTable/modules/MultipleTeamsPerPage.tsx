import type { ColumnsProps, SortCallback } from "../model";
import { UnitTable } from "./UnitTable";
import type { PropsWithChildren, ReactNode } from "react";
import { SplitByProp } from "./SplitByProp";
import type { AcfItem } from "@/features/acf/shared/schema";

export type MultipleTeamsPerPageProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: Array<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        splitBy: keyof TAcfItem;
        orderGroup: SortCallback<keyof TAcfItem>;
    }>;

export const MultipleTeamsPerPage = <TAcfItem extends AcfItem>({
    data,
    columns,
    orderGroup,
    children,
    splitBy,
}: MultipleTeamsPerPageProps<TAcfItem>): ReactNode => {
    const splitedByProp = SplitByProp(data, splitBy);
    return (
        <div key="multiple-teams-per-page">
            {children}
            {(Object.keys(splitedByProp) as Array<keyof TAcfItem>)
                .sort(orderGroup)
                .map((record: keyof TAcfItem, index) => {
                    const recordString = record.toString();
                    const column = columns.find((col) =>
                        col.fields.includes(splitBy)
                    );
                    const titleFormatter = column?.titleFormatter;
                    return (
                        <div key={`${recordString}-${index.toString()}`}>
                            <div key={`${recordString}${index.toString()}`}>
                                <p
                                    style={{
                                        fontSize: "11px",
                                        fontFamily: `Inter, sans-serif`,
                                        marginTop: "40px",
                                        marginBottom: "17px",
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
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
