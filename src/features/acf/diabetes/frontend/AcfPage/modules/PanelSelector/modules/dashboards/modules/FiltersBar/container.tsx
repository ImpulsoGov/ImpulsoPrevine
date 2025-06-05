import { filterOptionsCoeq } from "@/features/acf/diabetes/backend/filters/controller";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import { getServerSession } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
import { searchParamsToSelectedValuesCoeqs } from "./logic";
import * as Presentation from "./presentation";

type FiltersBarCoeqsProps = React.PropsWithChildren<{
    selectedValues: SelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedFilterValues>>;
    searchParams: URLSearchParams;
}>;

export const FiltersBarCoeqs: React.FC<FiltersBarCoeqsProps> = async ({
    selectedValues,
    setSelectedValues,
    searchParams,
}) => {
    const session = await getServerSession();
    //Na teoria, isso não deve ser mostrado nunca, pq este componente é renderizado no servidor,
    //e a usuária não consegue chegar aqui sem estar logada por conta do SessionGuard lá em cima.
    if (!session?.user) {
        return <span>Usuário não está logado.</span>;
    }

    //TODO rever nome do controller filterOptions
    //TODO: Chateado que temos que usar os nomes do token aqui.
    const filtersValues = await filterOptionsCoeq(
        session.user.municipio_id_sus,
        session.user.equipe
    );

    if (!selectedValues) {
        const initialSelectedValues =
            searchParamsToSelectedValuesCoeqs(searchParams);
        setSelectedValues(initialSelectedValues);
    }

    return (
        <Presentation.FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            filtersOptions={filtersValues}
        ></Presentation.FiltersBar>
    );
};
