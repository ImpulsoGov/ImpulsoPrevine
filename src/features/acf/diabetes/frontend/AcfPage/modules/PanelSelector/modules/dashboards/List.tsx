"use client";
// import { ToolBarMounted } from "@/componentes/mounted/lista-nominal/ToolBarMounted";
import type { FilterItem, } from "@/services/lista-nominal/ListaNominal";
import type { GridSortModel } from "@mui/x-data-grid";
import { useState } from "react";
// import { clearFiltersArgs } from "./modules/filters/clearFiltersArgs";
// import { urlSearchParamsHook } from "./modules/urlSearchParams.hook";
import { DEFAULT_SORTING } from "./modules/sorting/handleSortModelChange";
import type { AcfDashboardType } from "@/features/acf/diabetes/common/model";
// import { buildPrintProps } from "./modules/print/buildPrintProps";

// Adicionar união de valores quando soubermos as listas que teremos
export type ListProps = {
    list: AcfDashboardType;
    // title: string;
};
export type PrintStatesType= {
    value: FilterItem;
    list: AcfDashboardType;
    sorting: GridSortModel;
    search: string;
}


export const List: React.FC<React.PropsWithChildren<ListProps>> = ({
    // title,
    // list,
    children
}) => {
    //TODO: Esse codigo não deve ser removido, será utilizado quando a impressão for implementado
    // const [isPrintModalVisible, setPrintModalVisibility] = useState(false);
    // const closePrintModal = () => setPrintModalVisibility(false);

    // eslint-disable-next-line react/hook-use-state
    const [_sorting, _setSorting] = useState<GridSortModel>([...DEFAULT_SORTING]);

    // const [inputValue, setInputValue] = useState<string>("");
    // const [search, _setSearch] = useState<string>("");
    // const handleSearchClick = () => setSearch(inputValue);
    // const [printStates, setPrintStates] = useState<PrintStatesType>({
    //     value,
    //     list,
    //     sorting,
    //     search,
    // });
    // const propPrintGrouping = user?.perfis.includes(9)
    //     ? propPrintGroupingCoeqFunction(list)
    //     : propPrintGroupingCoapsFunction(list);

    //atualiza a url
    // value são os valores do filtro cujo estado foi movido para TableWithFilters
    // useEffect(
    //     () => urlSearchParamsHook(searchParams, sorting, router, value, list),
    //     [
    //         searchParams,
    //         router,
    //         value,
    //         searchParams.toString,
    //         router.push,
    //         sorting,
    //         list
    //     ],
    // );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    // useEffect(() => {
    //     setPrintStates({
    //         value,
    //         list,
    //         sorting,
    //         search,
    //     });
    // }, [user, value, list, sorting, search]);

    // const handleSortModelChange = () => handleSortModelChangeFunction(sorting, setSorting);

    // const handlePrintClick = () => {
    //     if (user)
    //         handlePrint(
    //             value,
    //             setPrintModalVisibility,
    //             buildPrintProps(
    //                 list,
    //                 tableData.data, //resolver conflito de tipo depois
    //                 user.perfis,
    //                 value,
    //                 ),
    //         );
    // };
    // if (status === "loading") return <Spinner/>;

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "35px",
                    padding: "0px 0px 150px 0px",
                    marginTop: "75px",
                }}
            >
                {/* <p
                    style={{
                        fontSize: "26px",
                        margin: "75px 0 15px 0",
                        lineHeight: "130%",
                    }}
                >
                    {title}
                </p> */}
                {/* <div style={{ marginTop: "15px" }}>
                    <ToolBarMounted
                        updateDate={
                            tableData.data[0]?.atualizacao_data &&
                            typeof tableData.data[0].atualizacao_data !==
                                "boolean"
                                ? new Date(tableData.data[0].atualizacao_data)
                                : undefined
                        }
                        // print={handlePrintClick}
                        print={()=> alert("Impressão será implementada em breve")}
                        inputProps={{
                            value: inputValue,
                            onChange: setInputValue,
                        }}
                        handleSearchClick={handleSearchClick}
                    />
                </div> */}
                {/* <hr style={{ border: "1px solid #C6CFD4", margin: "0" }} /> */}
                {/* <TableWithFilters>
                    <PaginatedTable acfDashboardType={list} />
                </TableWithFilters> */}
                {children}
            </div>
            {/* {
                user &&
                <PrintModal
                    isPrintModalVisible={isPrintModalVisible}
                    closePrintModal={closePrintModal}
                    handleCostumizePrint={handleCostumizePrint}
                    userProfiles={user.perfis}
                />
            } */}
        </>
    );
};
