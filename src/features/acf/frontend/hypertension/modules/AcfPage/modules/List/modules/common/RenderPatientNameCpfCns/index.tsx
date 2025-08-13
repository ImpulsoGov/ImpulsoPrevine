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
    const { patientCpf, patientCns, patientName } = row;

    return (
        <div>
            <span>{nameFormatter(patientName)}</span>
            <br />
            {patientCpf !== "" && (
                <span>{cpf.format(patientCpf.padStart(CPF_LENGTH, "0"))}</span>
            )}
            {patientCpf === "" && patientCns !== "" ? (
                <span>
                    {cnsFormatter(patientCns.padStart(CNS_LENGTH, "0"))}
                </span>
            ) : (
                <span>-</span>
            )}
        </div>
    );
};
