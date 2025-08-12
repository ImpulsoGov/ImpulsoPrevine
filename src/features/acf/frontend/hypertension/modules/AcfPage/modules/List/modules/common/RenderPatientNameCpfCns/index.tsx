import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { cpf } from "cpf-cnpj-validator";
import type { JSX } from "react";
import { cnsFormatter } from "./modules/CnsFormatter";

type BaseRow = Pick<
    HypertensionAcfItem,
    "patientName" | "patientCpf" | "patientCns"
>;

export const RenderPatientNameCpfCns = ({
    row,
}: GridRenderCellParams<BaseRow>): JSX.Element => {
    const patientCpf = row.patientCpf.padStart(11, "0");
    const patientCns = row.patientCns.padStart(15, "0");

    return (
        <div>
            {nameFormatter(row.patientName)}
            <br />
            {cpf.format(patientCpf) || cnsFormatter(patientCns) || "-"}
        </div>
    );
};
