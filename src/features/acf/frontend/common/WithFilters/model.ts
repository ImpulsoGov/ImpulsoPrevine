//TODO: Pensar melhor nesse import, tá muito nested.
import type {
    CoapsAppliedFilters,
    CoeqAppliedFilters,
} from "@/features/acf/frontend/diabetes";

/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
export type AppliedFilters = CoeqAppliedFilters | CoapsAppliedFilters;
