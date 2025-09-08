import type { ReactNode } from "react";
import type { SplitedGroupPerBlockProps } from "../model";
import { UnitTable } from "./UnitTable";
import type { AcfItem } from "@/features/acf/shared/schema";

export const MultipleGroupsPerBlock = <TAcfItem extends AcfItem>({
    data,
    columns,
    sortedKeys,
    children,
}: SplitedGroupPerBlockProps<TAcfItem>): ReactNode => {
    return (
        <div key="multiple-groups-per-block">
            {children}
            {sortedKeys.map((record: keyof TAcfItem, index) => {
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
