import type { SituacaoPorIndicador } from "../types/inicio";
import type { Indicadores } from "../types/inicio";

const isValid = (
    situacaoPorIndicador: SituacaoPorIndicador,
    indicador: Indicadores,
): boolean => {
    if (
        situacaoPorIndicador[indicador]?.total > 0 ||
        situacaoPorIndicador[indicador]?.pendente > 0
    )
        return true;
    if (
        situacaoPorIndicador[indicador]?.total === 0 ||
        situacaoPorIndicador[indicador]?.pendente === 0
    )
        return true;
    return false;
};

export { isValid };
