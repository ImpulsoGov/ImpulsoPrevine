import { FilterBar, SelectDropdown, ClearFilters, CardGrid, Table, Spinner } from '@impulsogov/design-system';
import { useEffect, useState } from 'react';
import type { FilterItem } from '@/services/lista-nominal/ListaNominal';
import { Session } from 'next-auth';
import type { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { DataItem, filterData } from '@/utils/FilterData';
import { renderDateTagCell, renderStatusTagCell, TagIconDetailsMap } from '@/helpers/lista-nominal/renderCell';
import { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import { useSession } from 'next-auth/react';
import { getListData } from '@/services/lista-nominal/ListaNominal';
import { CardDetailsMap, getCardsProps } from '@/helpers/cardsList';
import { getCardsData } from '@/services/lista-nominal/cards';
import { captureException } from "@sentry/react";

//dados mockados essa parte do código será substituída por uma chamada a API
const filters = [
    {
        options: [
            { value: 'Condição 1', label: 'Condição 1' },
            { value: 'Condição 2', label: 'Condição 2' },
            { value: 'Condição 3', label: 'Condição 3' },
            { value: 'Condição 4', label: 'Condição 4' },
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
        },
    },
    {
        field: 'dt_afericao_pressao_mais_recente',
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
    const [sorting, setSorting] = useState<GridSortModel>([{
        field: 'nome',
        sort: 'asc'
    }]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [cards, setCards] = useState<CardProps[]>([]);

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
                    });
                    setResponse(res.data);
                    setErrorMessage('');
                } catch (error) {
                    setErrorMessage('Erro ao buscar dados, entre em contato com o suporte.');
                }
                setIsLoading(false);
            };
            getListDataResponse();
        }
    }, [user, value, list, pagination, sorting]);

    useEffect(() => {
        setTableData({
            data: filterData(response.data, value),
            totalRows: response.totalRows,
        });
    }, [response, value]);

    useEffect(() => {
        const getCardsDataResponse = async () => {
            if (user) {
                try {
                    const currentURL = new URL(window.location.href).origin;
                    const res = await getCardsData({
                        municipio_id_sus: user.municipio_id_sus,
                        token: user.access_token,
                        listName: list,
                        cardType: 'internal',
                        ine: user.perfis.includes(9) ? user.equipe : undefined,
                        baseUrl: currentURL ?? 'http://localhost:3000',
                    });

                    setCards([...getCardsProps(cardsDetails, res.data)]);
                    setErrorMessage('');
                } catch (error) {
                    captureException(error);
                    setErrorMessage('Erro ao buscar dados, entre em contato com o suporte.');
                }
            }
        };

        getCardsDataResponse();
    }, [list, user]);

    function handleSortModelChange(newSortModel: GridSortModel) {
        newSortModel.length > 0
            ? setSorting([...newSortModel])
            : setSorting([{field: 'nome', sort: 'asc'}]);
    }

    if (!user) return <p>Usuário não autenticado</p>;
    if (errorMessage) return <p style={{ textAlign: "center", padding: "20px" }}>{errorMessage}</p>;
    if (response.data.length === 0) return <Spinner/>;

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
    return <div style={{display: "flex", flexDirection: "column", gap: "30px", padding: "25px"}}>
        <p style={{fontSize: "26px"}}>{title}</p>
        {cards && <CardGrid cards={cards}/>}
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
            onSortModelChange={handleSortModelChange}
            isLoading={isLoading}
        />
    </div>;
}
