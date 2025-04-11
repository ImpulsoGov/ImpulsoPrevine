
// import { ToolBarMounted } from "@/componentes/mounted/lista-nominal/ToolBarMounted";
import {
} from "@/helpers/larguraColunasHipertensao";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { filterData } from "@/utils/FilterData";
import {
    CardGrid,
    // ClearFilters,
    // FilterBar,
    // SelectDropdown,
    Table,
} from "@impulsogov/design-system";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { AcfDashboardType } from "../../../../types";
import { getCardsDataResponse } from "./modules/cards/getCardsDataResponse";
// import { clearFiltersArgs } from "./modules/filters/clearFiltersArgs";
import { filtersBuilder } from "./modules/filters/filtersBuilder";
import {
    // type Filter,
    initialFiltersBuilder,
} from "./modules/filters/initialFilters";
import {
} from "./modules/print/propPrintGrouping";
import { sessionHook } from "./modules/sessionHook";
import {
    DEFAULT_SORTING,
    handleSortModelChangeFunction,
} from "./modules/sorting/handleSortModelChange";
import { EmptyTableMessage } from "./modules/table/modules/EmptyTableMessage";
import { columns } from "./modules/table/modules/diabetes/columns";
import {
    type ListData,
    getListDataResponse,
} from "./modules/table/modules/diabetes/getListData";
import { urlSearchParamsHook } from "./modules/urlSearchParamsHook";
// import { buildPrintProps } from "./modules/print/buildPrintProps";

// Adicionar união de valores quando soubermos as listas que teremos
export type ListContainerProps = {
    list: AcfDashboardType;
    title: string;
};
export type PrintStatesType= {
    value: FilterItem;
    list: AcfDashboardType;
    sorting: GridSortModel;
    search: string;
}

export const ListContainer = ({
    title,
    list,
}: ListContainerProps) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<Session["user"]>();
    const searchParams = useSearchParams();
    const router = useRouter();
    //TODO: Esse codigo não deve ser removido, será utilizado quando a impressão for implementado
    // const [isPrintModalVisible, setPrintModalVisibility] = useState(false);
    // const closePrintModal = () => setPrintModalVisibility(false);
    const filters = filtersBuilder(session?.user);
    const initialFilters = initialFiltersBuilder(searchParams, filters);
    const [value, _setValue] = useState<FilterItem>(initialFilters);
    const [response, setResponse] = useState<ListData>({
        data: [],
        totalRows: 0,
    });
    const [tableData, setTableData] = useState<ListData>({
        data: [],
        totalRows: 0,
    });
    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });

    const [sorting, setSorting] = useState<GridSortModel>([...DEFAULT_SORTING]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [cards, setCards] = useState<CardProps[]>([]);

    // const [inputValue, setInputValue] = useState<string>("");
    const [search, _setSearch] = useState<string>("");
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
    useEffect(() => setUser(session?.user), [session?.user]);
    useEffect(
        () => urlSearchParamsHook(searchParams, sorting, router, value),
        [
            searchParams,
            router,
            value,
            searchParams.toString,
            router.push,
            sorting,
        ],
    );
    useEffect(() => {
        sessionHook(session?.user, setUser);
    }, [session?.user]);

    useEffect(() => {
        if (user)
            getListDataResponse(
                user,
                setResponse,
                setIsLoading,
                setErrorMessage,
                list,
                sorting,
                value,
                pagination,
                search,
            );
    }, [user, value, list, pagination, sorting, search]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    // useEffect(() => {
    //     setPrintStates({
    //         value,
    //         list,
    //         sorting,
    //         search,
    //     });
    // }, [user, value, list, sorting, search]);

    useEffect(() => {
        setTableData({
            data: filterData(response.data, value),
            totalRows: response.totalRows,
        });
    }, [response, value]);

    useEffect(() => {
        if (user) getCardsDataResponse(user, list, setCards, setErrorMessage);
    }, [list, user]);
    const handleSortModelChange = () => handleSortModelChangeFunction(sorting, setSorting);
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
    if (errorMessage) return <p style={{ textAlign: "center", padding: "20px" }}>{errorMessage}</p>
    // if (status === "loading") return <Spinner/>;

    // const filtersSelect = filters.map((filter: Filter) => (
    //     <SelectDropdown
    //         key={filter.id}
    //         {...filter}
    //         value={value}
    //         setValue={setValue}
    //         options={filter.options}
    //         label={filter.label}
    //         multiSelect={filter.isMultiSelect}
    //         width={filter.width}
    //     />
    // ));
    // const clearButton = (
    //     <ClearFilters data={value} setData={setValue} {...clearFiltersArgs} />
    // );
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "35px",
                    padding: "0px 0px 150px 0px",
                }}
            >
                <p
                    style={{
                        fontSize: "26px",
                        margin: "75px 0 15px 0",
                        lineHeight: "130%",
                    }}
                >
                    {title}
                </p>
                {cards && <CardGrid cards={cards} />}
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
                <hr style={{ border: "1px solid #C6CFD4", margin: "0" }} />
                {/* <FilterBar filters={filtersSelect} clearButton={clearButton} /> */}
                <Table
                    columns={columns}
                    data={tableData.data}
                    rowHeight={60}
                    paginationMode="server"
                    sortingMode="server"
                    rowCount={tableData.totalRows}
                    paginationModel={pagination}
                    onPaginationModelChange={setPagination}
                    sortModel={sorting}
                    onSortModelChange={handleSortModelChange}
                    isLoading={isLoading}
                    slots={{ noRowsOverlay: EmptyTableMessage }}
                    data-testid="list-table"
                />
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
