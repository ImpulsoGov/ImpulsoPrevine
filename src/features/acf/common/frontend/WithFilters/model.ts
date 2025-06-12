//TODO: Pensar melhor nesse import, tá muito nested.
import type * as diabetes from "@features/acf/diabetes/frontend/AcfPage/modules/PanelSelector/modules/dashboards/modules/CoeqDataTable";

//TODO: Trocar pelo tipo real quando ele existir
export type SelectedFilterValuesCoaps = diabetes.SelectedFilterValuesCoeq & {
    campoDeCoaps: Array<string>;
};

/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
export type PossibleSelectedFilterValues =
    | diabetes.SelectedFilterValuesCoeq
    | SelectedFilterValuesCoaps;
