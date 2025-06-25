//TODO: Pensar melhor nesse import, tá muito nested.
import type { AppliedFiltersCoaps } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/CoapsDataTable";
import type { AppliedFiltersCoeq } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/CoeqDataTable";

/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
export type AppliedFilters = AppliedFiltersCoeq | AppliedFiltersCoaps;
