import { FilterBar, SelectDropdown, ClearFilters, CardGrid, Table } from '@impulsogov/design-system';
import { useEffect, useState } from 'react';
import type { FilterItem } from '@/services/lista-nominal/ListaNominal';
import type { Session } from 'next-auth';
import type { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { filterData } from '@/utils/FilterData';
import type { DataItem } from '@/utils/FilterData';
import { renderDateTagCell, renderStatusTagCell } from '@/helpers/lista-nominal/renderCell';
import type { TagIconDetailsMap } from '@/helpers/lista-nominal/renderCell';
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import { useSession } from 'next-auth/react';
import { getListData } from '@/services/lista-nominal/ListaNominal';
import type { CardDetailsMap } from '@/helpers/cardsList';
import { getCardsProps } from '@/helpers/cardsList';
import { getCardsData } from '@/services/lista-nominal/cards';
import { captureException } from "@sentry/nextjs";
import { ToolBarMounted } from '@/componentes/mounted/lista-nominal/ToolBarMounted';
//dados mockados essa parte do código será substituída por uma chamada a API
const filters = [
    {
        options: [
            { value: 'Autorreferido', label: 'Autorreferido' },
            { value: 'Diagnostico clínico', label: 'Diagnostico clínico' },
        ],
        label: 'Identificação da Condição',
        id : 'identificacao_condicao',
        isMultiSelect: true,
        width: '240px',
    },
    {
        options: [
            { value: 'ACS 1', label: 'ACS 1' },
            { value: 'ACS 2', label: 'ACS 2' },
            { value: 'ACS 3', label: 'ACS 3' },
            { value: 'ACS 4', label: 'ACS 4' },
            { value: 'ACS 5', label: 'ACS 5' },
            { value: 'ACS 6', label: 'ACS 6' },
            { value: 'ACS 7', label: 'ACS 7' },
            { value: 'ACS 8', label: 'ACS 8' },
            { value: 'ACS 9', label: 'ACS 9' },
            { value: 'ACS 10', label: 'ACS 10' },
            { value: 'ACS 11', label: 'ACS 11' },
            { value: 'ACS 12', label: 'ACS 12' },
            { value: 'ACS 13', label: 'ACS 13' },
            { value: 'ACS 14', label: 'ACS 14' },
            { value: 'ACS 15', label: 'ACS 15' },
        ],
        label: 'ACS Responsável',
        id : 'acs_nome_cadastro',
        isMultiSelect: true,
        width: '240px',
    },
    {
        options: [
            { value: 'em dia', label: 'Em dia' },
            { value: 'atrasado', label: 'Atrasado' },
        ],
        label: 'Status',
        id : 'status',
        isMultiSelect: false,
        width: '240px',
    },
]

// Dados mockados que virão do CMS. Quantidade e conteúdo varia com a lista.
const cardsDetails: CardDetailsMap = {
    "INDICADOR_1": {
        title: "Indicador 1",
        titlePosition: "top",
    },
    "INDICADOR_2": {
        title: "Indicador 2",
        titlePosition: "top",
    },
    "INDICADOR_3": {
        title: "Indicador 3",
        titlePosition: "top",
    },
    "INDICADOR_4": {
        title: "Indicador 4",
        titlePosition: "top",
    },
}

// Informações que devem vir do CMS
const IconDetailsMap: TagIconDetailsMap = {
    danger: {
        src: 'https://media.graphassets.com/TWH6Oby6QuTFyq0wH9QK',
        alt: 'Ícone com símbolo da letra x',
    },
    warning: {
        src: 'https://media.graphassets.com/o0OkjNboRCqy2bYrRNnb',
        alt: 'Ícone de uma exclamação',
    },
    success: {
        src: 'https://media.graphassets.com/4qKuRCxHSySL23zxLd9b',
        alt: 'Ícone de uma marca de verificação',
    },
    pending: {
        src: 'https://media.graphassets.com/IdqIxy4LQAeIZfe9hWZK',
        alt: 'Ícone de uma ampulheta',
    },
};

//dados mockados essa parte do código será substituída por uma chamada a API do CMS
export const columns: GridColDef[] = [
    {
        field: 'nome',
        headerName: 'Nome',
        width: 260,
        headerAlign: 'left',
        align: 'left'
    },
    {
        field: 'cpf',
        headerName: 'CPF',
        width: 180 ,
        headerAlign: 'left',
        align: 'left'
    },
    {
        field: 'identificacao_condicao',
        headerName: 'Identificação da Condição',
        width: 180,
        headerAlign: 'left',
        align: 'left'
    },
    {
        field: 'dt_consulta_mais_recente',
        headerName: 'Data da consulta mais recente',
        width: 180,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            return renderDateTagCell(value, IconDetailsMap);
        },
    },
    {
        field: 'prazo_proxima_consulta',
        headerName: 'Prazo para próxima consulta',
        width: 180 ,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            return renderStatusTagCell(value, IconDetailsMap);
        }
    },
    {
        headerName: 'Data de aferição de PA mais recente',
        width: 200 ,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            return renderDateTagCell(value, IconDetailsMap);
        },
    },
    {
        field: 'prazo_proxima_afericao_pa',
        headerName: 'Prazo para próxima aferição de PA',
        width: 200 ,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            return renderStatusTagCell(value, IconDetailsMap);
        },
    },
    {
        field: 'acs_nome_cadastro',
        headerName: 'ACS responsável',
        width: 250 ,
        headerAlign: 'left',
        align: 'left'
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        headerAlign: 'left',
        align: 'left'
    },
] as GridColDef[];

export type optionsType = { 
    value: string; 
    label: string 
}
interface Filter {
    id: string;
    label: string;
    options: optionsType[];
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

const DEFAULT_SORTING: GridSortModel = [{ field: 'nome', sort: 'asc' }];

export const ListContainer = ({
    // subTabID,
    title,
    list
} : ListContainerProps) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<Session['user']>();
    const initialFilters = filters.reduce<FilterItem>((acc, filter: Filter) => {
        acc[filter.id] = filter.isMultiSelect ? [] : "";
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
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [cards, setCards] = useState<CardProps[]>([]);

    const [inputValue, setInputValue] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const handleSearchClick = () => setSearch(inputValue);

    useEffect(() => {
        const sessionAsync = async() => {
            setUser(session?.user);
        };
        sessionAsync();
    }, [session?.user]);

    useEffect(() => {
        if (user) {
            const getListDataResponse = async () => {
                setIsLoading(true);
                try {
                    const res = await getListData({
                        municipio_id_sus: user.municipio_id_sus,
                        token: user.access_token,
                        listName: list,
                        sorting: [{
                            sortField: sorting[0].field,
                            sortOrder: sorting[0].sort,
                        }],
                        filters: value,
                        ine: user.perfis.includes(9) ? user.equipe : undefined,
                        pagination,
                        search: search,
                    });
                    setResponse(res.data);
                    setErrorMessage('');
                } catch (error) {
                    setErrorMessage('Erro ao buscar dados, entre em contato com o suporte.');
                }
                setIsLoading(false);
            };
            getListDataResponse();
            console.log(search)
        }
    }, [user, value, list, pagination, sorting, search]);

    useEffect(() => {
        setTableData({
            data: filterData(response.data, value),
            totalRows: response.totalRows,
        });
    }, [response, value]);

    useEffect(() => {
        const getCardsDataResponse = async () => {
            if (!user) return;

            try {
            const currentURL = new URL(window.location.href).origin;
            const res = await getCardsData({
                municipio_id_sus: user.municipio_id_sus,
                token: user.access_token,
                listName: list,
                cardType: 'internal',
                ine: user.perfis.includes(9) ? user.equipe : undefined,
                baseUrl: currentURL,
            });

            setCards([...getCardsProps(cardsDetails, res.data)]);
            setErrorMessage('');
            } catch (error) {
            captureException(error);
            setErrorMessage('Erro ao buscar dados, entre em contato com o suporte.');
            }
        };

        getCardsDataResponse();
    }, [list, user]);

    function handleSortModelChange(newSortModel: GridSortModel) {
        newSortModel.length > 0
            ? setSorting([...newSortModel])
            : setSorting([...DEFAULT_SORTING]);
    }

    if (!user) return <p>Usuário não autenticado</p>;
    if (errorMessage) return <p style={{ textAlign: "center", padding: "20px" }}>{errorMessage}</p>;
    // if (response.data.length === 0) return <Spinner/>;

    //dados mockados essa parte do código será substituída por uma chamada a API do CMS
    const clearFiltersArgs = {
        iconActive : "https://media.graphassets.com/1EOGJH6TvSMqTrjigY1g",
        iconInactive : "https://media.graphassets.com/x37RkcUrTH6G50ganj9d",
        label: 'Limpar todos os filtros',
    }

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
    const clearButton = <ClearFilters data={value} setData={setValue} {...clearFiltersArgs}/>;
    return <div style={{display: "flex", flexDirection: "column", gap: "35px", padding: "0px 0px 150px 0px"}}>
        <p style={{fontSize: "26px", margin: "75px 0 15px 0", lineHeight: "130%"}}>{title}</p>
        {cards && <CardGrid cards={cards}/>}
        <div style={{marginTop: "15px"}}>
            <ToolBarMounted
                updateDate={tableData.data[0]?.atualizacao_data && typeof tableData.data[0].atualizacao_data !== 'boolean' ? new Date(tableData.data[0].atualizacao_data) : undefined}
                print={() => {}}
                inputProps={{value: inputValue, onChange: setInputValue}}
                handleSearchClick={handleSearchClick}
            />
        </div>
        <hr style={{border: "1px solid #C6CFD4", margin: "0"}}/>
        <FilterBar filters={filtersSelect} clearButton={clearButton}/>
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
        />
    </div>;
}
