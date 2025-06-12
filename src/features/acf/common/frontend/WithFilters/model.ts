//TODO: Pensar melhor nesse import, tá muito nested.
import type * as diabetes from "@/features/acf/diabetes/frontend/AcfPage/modules/PanelSelector/modules/List/modules/CoeqDataTable";

/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
export type AppliedFilters =
    | diabetes.AppliedFiltersCoeq
    | diabetes.AppliedFiltersCoaps;
