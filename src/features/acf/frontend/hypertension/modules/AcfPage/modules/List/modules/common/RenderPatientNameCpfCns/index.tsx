import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { JSX } from "react";
import { cnsFormatter } from "./modules/Formatters/CnsFormatter";
import { cpfFormatter } from "./modules/Formatters/CpfFormatter";
export { cpfFormatter, cnsFormatter };

export type BaseRow = Pick<
    HypertensionAcfItem,
    "patientName" | "patientCpf" | "patientCns"
>;

export const RenderPatientNameCpfCns = ({
    row,
}: GridRenderCellParams<BaseRow>): JSX.Element => {
    return (
        <div>
            <span data-testid="patient-name">
                {nameFormatter(row.patientName)}
            </span>
            <br />
            <span data-testid="patient-cpf-cns">
                {cpfFormatter(row.patientCpf) ||
                    cnsFormatter(row.patientCns) ||
                    "-"}
            </span>
        </div>
    );
};
