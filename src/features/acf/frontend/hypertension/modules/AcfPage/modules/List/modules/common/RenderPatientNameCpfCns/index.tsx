import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { cpf } from "cpf-cnpj-validator";
import type { JSX } from "react";
import { cnsFormatter } from "./modules/CnsFormatter";

const CPF_LENGTH = 11;
const CNS_LENGTH = 15;

export type BaseRow = Pick<
    HypertensionAcfItem,
    "patientName" | "patientCpf" | "patientCns"
>;

export const RenderPatientNameCpfCns = ({
    row,
}: GridRenderCellParams<BaseRow>): JSX.Element => {
    const patientCpf = row.patientCpf.padStart(CPF_LENGTH, "0");
    const patientCns = row.patientCns.padStart(CNS_LENGTH, "0");

    return (
        <div>
            <span>{nameFormatter(row.patientName)}</span>
            <br />
            <span>
                {cpf.format(patientCpf) || cnsFormatter(patientCns) || "-"}
            </span>
        </div>
    );
};
