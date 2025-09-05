import type { ColumnsProps, SortCallback } from "../model";
import { UnitTable } from "./UnitTable";
import type { PropsWithChildren, ReactNode } from "react";
import type { SplitedByProp } from "./SplitByProp";
import type { AcfItem } from "@/features/acf/shared/schema";

export type MultipleTeamsPerPageProps<TAcfItem extends AcfItem> =
    PropsWithChildren<{
        data: SplitedByProp<TAcfItem>;
        columns: Array<ColumnsProps<TAcfItem>>;
        splitBy: keyof TAcfItem;
        orderGroup: SortCallback<keyof TAcfItem>;
    }>;

export const MultipleGroupsPerPage = <TAcfItem extends AcfItem>({
    data,
    columns,
    orderGroup,
    children,
}: MultipleTeamsPerPageProps<TAcfItem>): ReactNode => {
    return (
        <div key="multiple-teams-per-page">
            {children}
            {(Object.keys(data) as Array<keyof TAcfItem>)
                .sort(orderGroup)
                .map((record: keyof TAcfItem, index) => {
                    const recordString = record.toString();
                    const currentColumn = data[recordString];
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
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
