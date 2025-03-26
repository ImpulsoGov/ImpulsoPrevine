const ULTIMA_EQUIPE = "SEM EQUIPE RESPONSÁVEL";
const ULTIMO_PROFISSIONAL = "SEM PROFISSIONAL RESPONSÁVEL";
const VALOR_NULL = "NULL";

export function ordenarGrupos(atual: string, seguinte: string) {
    const valorAtualMaiusculo = String(atual).toUpperCase();
    const valorSeguinteMaiusculo = String(seguinte).toUpperCase();

    if (
        valorSeguinteMaiusculo.includes(ULTIMA_EQUIPE) ||
        valorSeguinteMaiusculo.includes(ULTIMO_PROFISSIONAL) ||
        valorSeguinteMaiusculo === VALOR_NULL
    ) {
        return -1;
    }

    if (
        valorAtualMaiusculo.includes(ULTIMA_EQUIPE) ||
        valorAtualMaiusculo.includes(ULTIMO_PROFISSIONAL) ||
        valorAtualMaiusculo === VALOR_NULL
    ) {
        return 1;
    }

    return valorAtualMaiusculo.localeCompare(valorSeguinteMaiusculo);
}
