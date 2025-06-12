import type { SelectedFilterValuesCoeq } from "./AcfPage/modules/PanelSelector/modules/dashboards/modules/CoeqDataTable";

//TODO: Trocar pelo tipo real quando ele existir
export type SelectedFilterValuesCoaps = SelectedFilterValuesCoeq & {
    campoDeCoaps: Array<string>;
};

/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
export type SelectedFilterValues =
    | SelectedFilterValuesCoeq
    | SelectedFilterValuesCoaps;
