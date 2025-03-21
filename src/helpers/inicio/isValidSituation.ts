import type { SituacaoPorIndicador } from '../../types/inicio';
import type { Indicadores } from '../../types/inicio';

// null | value 
export const isValidSituation = (
	situacaoPorIndicador: SituacaoPorIndicador,
	indicador: Indicadores,
): boolean => {
	return !!(
		situacaoPorIndicador[indicador]?.total &&
		situacaoPorIndicador[indicador]?.pendente 
	);
};
