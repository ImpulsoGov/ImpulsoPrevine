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
    GridColDef,
    GridPaginationModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { filterData } from "@/utils/FilterData";
import type { DataItem } from "@/utils/FilterData";
import {
    renderDateTagCell,
    renderStatusTagCell,
} from "@/helpers/lista-nominal/renderCell";
import type { TagIconDetailsMap } from "@/helpers/lista-nominal/renderCell";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { useSession } from "next-auth/react";
import {
    getListData,
    isFilterApplied,
} from "@/services/lista-nominal/ListaNominal";
import type { CardDetailsMap } from "@/helpers/cardsList";
import { getCardsProps } from "@/helpers/cardsList";
import { getCardsData } from "@/services/lista-nominal/cards";
import { captureException } from "@sentry/nextjs";
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
import dataJson from "../api/lista-nominal/data.json";

//dados mockados essa parte do código será substituída por uma chamada a API

// Dados mockados que virão do CMS. Quantidade e conteúdo varia com a lista.
const cardsDetails: CardDetailsMap = {
    INDICADOR_1: {
        title: "Indicador 1",
        titlePosition: "top",
    },
    INDICADOR_2: {
        title: "Indicador 2",
        titlePosition: "top",
    },
    INDICADOR_3: {
        title: "Indicador 3",
        titlePosition: "top",
    },
    INDICADOR_4: {
        title: "Indicador 4",
        titlePosition: "top",
    },
};

// Informações que devem vir do CMS
const IconDetailsMap: TagIconDetailsMap = {
    danger: {
        src: "https://media.graphassets.com/TWH6Oby6QuTFyq0wH9QK",
        alt: "Ícone com símbolo da letra x",
    },
    warning: {
        src: "https://media.graphassets.com/o0OkjNboRCqy2bYrRNnb",
        alt: "Ícone de uma exclamação",
    },
    success: {
        src: "https://media.graphassets.com/4qKuRCxHSySL23zxLd9b",
        alt: "Ícone de uma marca de verificação",
    },
    pending: {
        src: "https://media.graphassets.com/IdqIxy4LQAeIZfe9hWZK",
        alt: "Ícone de uma ampulheta",
    },
};
//dados mockados essa parte do código será substituída por uma chamada a API do CMS
//dados mockados essa parte do código será substituída por uma chamada a API do CMS
const filtersLabels = {
    identificacao_condicao: "Identificação da Condição",
    acs_nome_cadastro: "ACS Responsável",
    status: "Status",
};
//dados mockados essa parte do código será substituída por uma chamada a API do CMS
export const columns: GridColDef[] = [
    {
        field: "nome",
        headerName: "Nome",
        width: 260,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "cpf",
        headerName: "CPF",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "identificacao_condicao",
        headerName: "Identificação da Condição",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "dt_consulta_mais_recente",
        headerName: "Data da consulta mais recente",
        width: 180,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderDateTagCell(value, IconDetailsMap);
        },
    },
    {
        field: "prazo_proxima_consulta",
        headerName: "Prazo para próxima consulta",
        width: 180,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, IconDetailsMap);
        },
    },
    {
        field: "dt_afericao_pressao_mais_recente",
        headerName: "Data de aferição de PA mais recente",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderDateTagCell(value, IconDetailsMap);
        },
    },
    {
        field: "prazo_proxima_afericao_pa",
        headerName: "Prazo para próx. aferição de PA",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell({ value }) {
            return renderStatusTagCell(value, IconDetailsMap);
        },
    },
    {
        field: "acs_nome_cadastro",
        headerName: "ACS responsável",
        width: 250,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        headerAlign: "left",
        align: "left",
    },
] as GridColDef[];

export type OptionsType = {
    value: string;
    label: string;
};
interface Filter {
    id: string;
    label: string;
    options: OptionsType[];
    isMultiSelect: boolean;
    width: string;
}
type ListData = {
    data: DataItem[];
    totalRows: number;
};
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

const DEFAULT_SORTING: GridSortModel = [{ field: "nome", sort: "asc" }];

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
    const filters = [
        {
            options: [
                { value: "Autorreferido", label: "Autorreferido" },
                { value: "Diagnostico clínico", label: "Diagnostico clínico" },
            ],
            label: "Identificação da Condição",
            id: "identificacao_condicao",
            isMultiSelect: true,
            width: "240px",
        },
        {
            options: dataJson
                .filter((item) => {
                    const notFilterByTeam = user?.perfis.includes(9)
                        ? item.ine === user.equipe
                        : true;
                    return (
                        item.municipio_id_sus === user?.municipio_id_sus &&
                        notFilterByTeam
                    );
                })
                .map((item) => ({
                    value: item.acs_nome_cadastro,
                    label: item.acs_nome_cadastro,
                }))
                .sort((a, b) => a.label.localeCompare(b.label)),
            label: "ACS Responsável",
            id: "acs_nome_cadastro",
            isMultiSelect: true,
            width: "240px",
        },
        {
            options: [
                { value: "em dia", label: "Em dia" },
                { value: "atrasado", label: "Atrasado" },
            ],
            label: "Status",
            id: "status",
            isMultiSelect: false,
            width: "240px",
        },
    ];
    const initialFilters = filters.reduce<FilterItem>((acc, filter: Filter) => {
        const paramValue = searchParams.get(filter.id);
        acc[filter.id] = paramValue
            ? filter.isMultiSelect
                ? paramValue.split(",")
                : paramValue
            : filter.isMultiSelect
              ? []
              : "";
        return acc;
    }, {});
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
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, valueString] of Object.entries(value)) {
            params.set(key, valueString as string);
        }
        params.set("sort", sorting[0].field as string);
        params.set("order", sorting[0].sort as string);
        router.push(`?${params.toString()}`);
    }, [
        searchParams,
        router,
        value,
        searchParams.toString,
        router.push,
        sorting,
    ]);
    useEffect(() => {
        const sessionAsync = async () => {
            setUser(session?.user);
        };
        sessionAsync();
    }, [session?.user]);

    useEffect(() => {
        //modularizar essa função
        if (user) {
            const getListDataResponse = async () => {
                setIsLoading(true);
                try {
                    const res = await getListData({
                        token: user.access_token,
                        listName: list,
                        sorting: [
                            {
                                sortField: sorting[0].field,
                                sortOrder: sorting[0].sort,
                            },
                        ],
                        filters: value,
                        pagination,
                        search: search,
                    });
                    setResponse(res.data);
                    setErrorMessage("");
                } catch (error) {
                    captureException(error);
                    setErrorMessage(
                        "Erro ao buscar dados, entre em contato com o suporte.",
                    );
                }
                setIsLoading(false);
            };
            getListDataResponse();
        }
    }, [user, value, list, pagination, sorting, search]);
    useEffect(() => {
        setPrintStates({
            value,
            list,
            sorting,
            search,
        });
    }, [user, value, list, sorting, search]);

    const getPrintDataResponse = async () => {
        if (!user) return;
        try {
            const res = await getListData({
                token: user.access_token,
                listName: printStates.list,
                sorting: [
                    {
                        sortField: printStates.sorting[0].field,
                        sortOrder: printStates.sorting[0].sort,
                    },
                ],
                filters: printStates.value,
                search: printStates.search,
            });
            return res.data;
        } catch (error) {
            captureException(error);
        }
    };

    useEffect(() => {
        setTableData({
            data: filterData(response.data, value),
            totalRows: response.totalRows,
        });
    }, [response, value]);

    useEffect(() => {
        //modularizar essa função
        const getCardsDataResponse = async () => {
            if (!user) return;

            try {
                const currentURL = new URL(window.location.href).origin;
                const res = await getCardsData({
                    token: user.access_token,
                    listName: list,
                    cardType: "internal",
                    baseUrl: currentURL,
                });

                setCards([...getCardsProps(cardsDetails, res.data)]);
                setErrorMessage("");
            } catch (error) {
                captureException(error);
                setErrorMessage(
                    "Erro ao buscar dados, entre em contato com o suporte.",
                );
            }
        };

        getCardsDataResponse();
    }, [list, user]);

    function handleSortModelChange(newSortModel: GridSortModel) {
        newSortModel.length > 0
            ? setSorting([...newSortModel])
            : setSorting([...DEFAULT_SORTING]);
    }
    const handleCostumizePrint = async (options: PrintOptions) => {
        const data = await getPrintDataResponse();
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

    //dados mockados essa parte do código será substituída por uma chamada a API do CMS
    const clearFiltersArgs = {
        iconActive: "https://media.graphassets.com/1EOGJH6TvSMqTrjigY1g",
        iconInactive: "https://media.graphassets.com/x37RkcUrTH6G50ganj9d",
        label: "Limpar todos os filtros",
    };

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
