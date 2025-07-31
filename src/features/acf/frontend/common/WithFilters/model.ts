//TODO: Pensar melhor nesse import, tá muito nested.
import type * as Diabetes from "@/features/acf/frontend/diabetes";
import type {
    HypertensionCoeqAppliedFilters,
    HypertensionCoapsAppliedFilters,
} from "@/features/acf/frontend/hypertension";
/// Contém todos os possíveis conjuntos de filtros.
/// Eventualmente, este Union type deve ter um item para cada combinação indicador x perfil
//Não é possível utilizar o mesmo nome para os filtros em modulos diferentes, ex: CoeqAppliedFilters existir em diabetes e hipertensão
//Mesmo utilizando "as", o TS resolve para o nome original do tipo quando vamos utiliza-lo e isso faz com que ele não interprete que são tipos diferentes

export type AppliedFilters =
    | HypertensionCoeqAppliedFilters
    | HypertensionCoapsAppliedFilters
    | Diabetes.CoeqAppliedFilters
    | Diabetes.CoapsAppliedFilters;
