import { nameFormatter } from "@/features/acf/frontend/common/Formatters/modules/NameFormatter";
import { cnsFormatter } from "./modules/Formatters/CnsFormatter";
import { cpfFormatter } from "./modules/Formatters/CpfFormatter";
export { cpfFormatter, cnsFormatter };

type Props = {
    name: string;
    cpf: string | null;
    cns: string | null;
};

export const RenderPatientNameCpfCns: React.FC<Props> = ({
    name,
    cpf,
    cns,
}) => {
    return (
        <div>
            <span data-testid="patient-name">{nameFormatter(name)}</span>
            <br />
            <span data-testid="patient-cpf-cns">
                {cpfFormatter(cpf) || cnsFormatter(cns) || "-"}
            </span>
        </div>
    );
};
