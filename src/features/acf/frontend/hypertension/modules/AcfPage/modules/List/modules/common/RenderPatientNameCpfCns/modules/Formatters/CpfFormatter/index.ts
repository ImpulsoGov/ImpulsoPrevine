import { cpf } from "cpf-cnpj-validator";

export const cpfFormatter = (cpfString: string | null): string => {
    if (!cpfString) return "";
    const paddedCpf = cpfString.padStart(11, "0");
    if (!cpf.isValid(paddedCpf)) return "";
    return cpf.format(paddedCpf);
};
