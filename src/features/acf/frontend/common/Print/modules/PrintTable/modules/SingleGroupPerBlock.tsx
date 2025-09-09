import type { AcfItem } from "@/features/acf/shared/schema";
import { UnitTable } from "./UnitTable";
import type { SplitedGroupPerBlockProps } from "../model";
import type { ReactNode } from "react";

export const SingleGroupPerBlock = <TAcfItem extends AcfItem>({
    data,
    columns,
    children,
    sortedKeys,
}: SplitedGroupPerBlockProps<TAcfItem>): ReactNode => {
    return sortedKeys.map((record, index) => {
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
