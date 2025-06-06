import React from "react";
import type { AcfDashboardType } from "../../../../../../common/model";
import { List } from "./List";
import { DataTable } from "./modules/DataTable";
import { InternalCardsCoaps, InternalCardsCoeq } from "./modules/Internalcards";
import { ToolBar } from "./modules/ToolBar";
import { WithFilters } from "./modules/WithFilters";
import { WithPagination } from "./modules/WithPagination";
import { WithSearch } from "./modules/WithSearch";
import { WithSorting } from "./modules/WithSorting";
import { FiltersBarCoeqs } from "./modules/FiltersBar";

export type ListContainerProps = {
    list: AcfDashboardType;
    municipalitySusId: string;
    teamIne: string;
    visao: "coaps" | "coeq";
    // title: string;
};

// type ContentCoapsProps = {
//     municipalitySusId: string;
//     list: AcfDashboardType;
// };

// const ContentCoaps: React.FC<ContentCoapsProps> = ({
//     municipalitySusId,
//     list,
// }) => {
//     return (
//         <>
//             <InternalCardsCoaps municipalitySusId={municipalitySusId} />
//             <List list={list}>
//                 <WithSearch SearchComponent={ToolBar}>
//                     <hr style={{ width: "100%" }} />
//                     <WithSorting>
//                         <WithFilters
//                             municipalitySusID={municipalitySusId}
//                             FiltersBar={FiltersBarCoaps}
//                         >
//                             <WithPagination>
//                                 <DataTable />
//                             </WithPagination>
//                         </WithFilters>
//                     </WithSorting>
//                 </WithSearch>
//             </List>
//         </>
//     );
// };

type ContentCoeqProps = {
    municipalitySusId: string;
    teamIne: string;
    list: AcfDashboardType;
};

const ContentCoeq: React.FC<ContentCoeqProps> = ({
    municipalitySusId,
    teamIne,
    list,
}) => {
    return (
        <>
            <InternalCardsCoeq
                municipalitySusId={municipalitySusId}
                teamIne={teamIne}
            />
            <List list={list}>
                <WithSearch SearchComponent={ToolBar}>
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <WithFilters
                            FiltersBar={FiltersBarCoeqs}
                            municipalitySusID={municipalitySusId}
                        >
                            {/* <FiltersBarCoeqs /> */}
                            <WithPagination>
                                <DataTable />
                            </WithPagination>
                        </WithFilters>
                    </WithSorting>
                </WithSearch>
            </List>
        </>
    );
};

export const ListContainer: React.FC<ListContainerProps> = ({
    // title,
    list,
    municipalitySusId,
    teamIne,
    _visao,
}) => {
    return (
        <ContentCoeq
            municipalitySusId={municipalitySusId}
            teamIne={teamIne}
            list={list}
        />
    );

    // return visao == "coaps" ? (
    //     <ContentCoaps municipalitySusId={municipalitySusId} list={list} />
    // ) : (
    //     <ContentCoeq
    //         municipalitySusId={municipalitySusId}
    //         teamIne={teamIne}
    //         list={list}
    //     />
    // );
};
