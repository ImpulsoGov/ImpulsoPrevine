import {
    FilterBar,
    SelectDropdown,
    ClearFilters,
    CardGrid,
    Table,
    ModalAlertControlled,
    PersonalizacaoImpressao,
} from "@impulsogov/design-system";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { Session } from "next-auth";
import type {
    GridPaginationModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { filterData } from "@/utils/FilterData";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { useSession } from "next-auth/react";
import { isFilterApplied } from "@/services/lista-nominal/ListaNominal";
import { ToolBarMounted } from "@/componentes/mounted/lista-nominal/ToolBarMounted";
import {
    type ExtendedPrintTableProps,
    VALORES_AGRUPAMENTO_IMPRESSAO,
    customizePrint,
    handlePrint,
} from "@/helpers/lista-nominal/impressao/handlePrint";
import {
    labelsModalImpressaoAPS,
    labelsModalImpressaoEquipe,
} from "@/helpers/labelsModalImpressao";
import type { PrintTableProps } from "@/componentes/unmounted/lista-nominal/print/PrintTable";
import {
    larguraColunasHipertensaoEquipePaisagem,
    larguraColunasHipertensaoEquipeRetrato,
    larguraColunasHipertensaoPaisagem,
    larguraColunasHipertensaoRetrato,
} from "@/helpers/larguraColunasHipertensao";
import { onlyAppliedFilters } from "@/utils/onlyAppliedFilters";
import { columns } from "./modules/columns";
import { filtersLabels } from "./modules/filtersLabels";
import { filtersBuilder } from "./modules/filtersBuilder";
import { clearFiltersArgs } from "./modules/clearFiltersArgs";
import { initialFiltersBuilder, type Filter } from "./modules/initialFilters";
import { urlSearchParamsHook } from "./modules/urlSearchParamsHook";
import { sessionHook } from "./modules/sessionHook";
import { getListDataResponse, type ListData } from "./modules/getListData";
import { getPrintDataResponse } from "./modules/getPrintDataResponse";
import { getCardsDataResponse } from "./modules/getCardsDataResponse";
import { handleSortModelChangeFunction, DEFAULT_SORTING } from "./modules/handleSortModelChange";

// Adicionar união de valores quando soubermos as listas que teremos
interface ListContainerProps {
    list: string;
    subTabID: string;
    title: string;
}
export type PrintOptions = {
    agrupamento: string;
    separacaoGrupoPorFolha: boolean;
    ordenacao: boolean;
};

export const ListContainer = ({
    // subTabID,
    title,
    list,
}: ListContainerProps) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<Session["user"]>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPrintModalVisible, setPrintModalVisibility] = useState(false);
    const closePrintModal = () => setPrintModalVisibility(false);
    const filters = filtersBuilder(session?.user);
    const initialFilters = initialFiltersBuilder(searchParams,filters);
    const [value, setValue] = useState<FilterItem>(initialFilters);
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

    const [inputValue, setInputValue] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const handleSearchClick = () => setSearch(inputValue);
    const [printStates, setPrintStates] = useState({
        value,
        list,
        sorting,
        search,
    });

    useEffect(() => setUser(session?.user), [session?.user]);
    useEffect(()=>urlSearchParamsHook(searchParams,sorting,router,value), [
        searchParams,
        router,
        value,
        searchParams.toString,
        router.push,
        sorting,
    ]);
    useEffect(() => {
        sessionHook(session?.user, setUser);
    }, [session?.user]);

    useEffect(()=>{
        if (user) getListDataResponse(user,setResponse,setIsLoading,setErrorMessage,list,sorting,value,pagination,search);
    }, [user, value, list, pagination, sorting, search]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        setPrintStates({
            value,
            list,
            sorting,
            search,
        });
    }, [user, value, list, sorting, search]);

    useEffect(() => {
        setTableData({
            data: filterData(response.data, value),
            totalRows: response.totalRows,
        });
    }, [response, value]);

    useEffect(() => {
        if(user) getCardsDataResponse(user, list, setCards, setErrorMessage);
    }, [list, user]);
    const handleSortModelChange = ()=> handleSortModelChangeFunction(sorting, setSorting);
    const handleCostumizePrint = async (options: PrintOptions) => {
        const data = await getPrintDataResponse(user, printStates);
        const props: ExtendedPrintTableProps = {
            data: data?.data ?? [],
            columns: columns,
            list: list,
            appliedFilters: isFilterApplied(value)
                ? onlyAppliedFilters(value)
                : {},
            latestProductionDate: new Date(
                String(tableData.data[0].atualizacao_data),
            ).toLocaleDateString("pt-BR"),
            fontFamily: "sans-serif",
            dataSplit:
                options.agrupamento === VALORES_AGRUPAMENTO_IMPRESSAO.sim,
            pageSplit: options.separacaoGrupoPorFolha,
            orderByProp: options.ordenacao,
            printColumnsWidth: {
                landscape: user?.perfis.includes(9)
                    ? larguraColunasHipertensaoEquipePaisagem
                    : larguraColunasHipertensaoPaisagem,
                portrait: user?.perfis.includes(9)
                    ? larguraColunasHipertensaoEquipeRetrato
                    : larguraColunasHipertensaoRetrato,
            },
            verticalDivider: [2, 4, 6],
            propPrintGrouping: propPrintGrouping,
            filtersLabels: filtersLabels,
        };
        customizePrint(options, closePrintModal, props);
    };
    const props: PrintTableProps = {
        data: tableData.data,
        columns: columns,
        list: list,
        appliedFilters: value,
        latestProductionDate: String(tableData.data[0]?.atualizacao_data),
        fontFamily: "sans-serif",
        dataSplit: false,
        pageSplit: false,
        printColumnsWidth: {
            landscape: user?.perfis.includes(9)
                ? larguraColunasHipertensaoEquipePaisagem
                : larguraColunasHipertensaoPaisagem,
            portrait: user?.perfis.includes(9)
                ? larguraColunasHipertensaoEquipeRetrato
                : larguraColunasHipertensaoRetrato,
        },
        verticalDivider: [2, 4, 6],
        propPrintGrouping: user?.perfis.includes(9)
            ? "acs_nome_cadastro"
            : "equipe_nome",
        filtersLabels: filtersLabels,
    };
    const handlePrintClick = () =>
        handlePrint(value, propPrintGrouping, setPrintModalVisibility, props);

    if (!user) return <p>Usuário não autenticado</p>;
    if (!user.perfis.includes(5)) return <p>Usuário sem permissão</p>;
    const propPrintGrouping = user.perfis.includes(9)
        ? "acs_nome_cadastro"
        : "equipe_nome";
    if (errorMessage)
        return (
            <p style={{ textAlign: "center", padding: "20px" }}>
                {errorMessage}
            </p>
        );
    // if (response.data.length === 0) return <Spinner/>;

    const filtersSelect = filters.map((filter: Filter) => (
        <SelectDropdown
            key={filter.id}
            {...filter}
            value={value}
            setValue={setValue}
            options={filter.options}
            label={filter.label}
            multiSelect={filter.isMultiSelect}
            width={filter.width}
        />
    ));
    const clearButton = (
        <ClearFilters data={value} setData={setValue} {...clearFiltersArgs} />
    );
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
                <div style={{ marginTop: "15px" }}>
                    <ToolBarMounted
                        updateDate={
                            tableData.data[0]?.atualizacao_data &&
                            typeof tableData.data[0].atualizacao_data !==
                                "boolean"
                                ? new Date(tableData.data[0].atualizacao_data)
                                : undefined
                        }
                        print={handlePrintClick}
                        inputProps={{
                            value: inputValue,
                            onChange: setInputValue,
                        }}
                        handleSearchClick={handleSearchClick}
                    />
                </div>
                <hr style={{ border: "1px solid #C6CFD4", margin: "0" }} />
                <FilterBar filters={filtersSelect} clearButton={clearButton} />
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
                    slots={{
                        noRowsOverlay: () => (
                            <p
                                style={{ textAlign: "center", padding: "40px" }}
                                data-testid="error-message-table"
                            >
                                Nenhum dado disponível. Isso pode ocorrer por
                                ausência de resultados ou instabilidade na
                                plataforma. Se já aplicou filtros ou utilizou a
                                busca, tente ajustá-los. Se ainda assim os dados
                                não foram exibidos, contate o suporte.
                            </p>
                        ),
                    }}
                    data-testid="list-table"
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    left: 0,
                }}
            >
                <ModalAlertControlled
                    display={isPrintModalVisible}
                    close={closePrintModal}
                >
                    <PersonalizacaoImpressao
                        labels={
                            user.perfis.includes(9)
                                ? labelsModalImpressaoEquipe
                                : labelsModalImpressaoAPS
                        }
                        handleButtonClick={handleCostumizePrint}
                        handleClose={closePrintModal}
                        valoresAgrupamento={VALORES_AGRUPAMENTO_IMPRESSAO}
                    />
                </ModalAlertControlled>
            </div>
        </>
    );
};
