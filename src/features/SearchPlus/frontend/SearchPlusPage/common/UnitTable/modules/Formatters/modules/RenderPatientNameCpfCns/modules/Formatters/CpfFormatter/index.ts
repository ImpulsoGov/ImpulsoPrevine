import { cpf } from "cpf-cnpj-validator";

export const cpfFormatter = (cpfString: string | null): string => {
    if (!cpfString) return "";
    const cleanedCpf = cpfString.replace(".", "").replace("-", "");
    if (!cpf.isValid(cleanedCpf)) return "";
    return cpf.format(cleanedCpf);
};
