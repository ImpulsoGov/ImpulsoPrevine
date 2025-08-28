"use client";
export { ContentCoeq } from "./container";
export type { CoeqAppliedFilters } from "./modules/CoeqDataTable";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import { PrintTable } from "@/features/acf/frontend/common/Print";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import { getCoeqData } from "./modules/Print/service";
import { coeqLabelsModal } from "./modules/Print/consts";
import { coeqColumns } from "./modules/CoeqDataTable";
import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
export type ListProps = {
    list: AcfDashboardType;
    // title: string;
};

export const ListCoeq: React.FC<React.PropsWithChildren<ListProps>> = ({
    children,
}) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "35px",
                    padding: "0px 0px 150px 0px",
                    marginTop: "50px",
                }}
            >
                {children}
            </div>
            <WithPrintModal>
                <WithCustomPrint>
                    <PrintModal modalLabels={coeqLabelsModal}>
                        <PrintTable
                            columns={coeqColumns}
                            serviceGetData={getCoeqData}
                            // customization={customization}

                            // {...customization} ref={ref}
                        />
                    </PrintModal>
                </WithCustomPrint>
            </WithPrintModal>
        </>
    );
};
