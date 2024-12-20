import { renderDateTagCell, renderStatusTagCell, TagIconDetailsMap } from '@/helpers/lista-nominal/renderCell';
import { CardGrid, ClearFilters, FilterBar, SelectDropdown, Table } from '@impulsogov/design-system';
import { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import type { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

//dados mockados essa parte do código será substituída por uma chamada a API
const ManyFiltersData: Filter[] = [
    {
        options: [
            { value: '10', label: 'Ten' },
            { value: '20', label: 'Twenty' },
            { value: '30', label: 'Thirty' },
            { value: '42', label: 'Forty two' },
        ],
        label: 'Filtro1',
        id : 'filter1',
        multiSelect: true,
        width: '240px',
    },
    {
        options: [
            { value: '10', label: 'Ten' },
            { value: '20', label: 'Twenty' },
            { value: '30', label: 'Thirty' },
            { value: '42', label: 'Forty two' },
        ],
        label: 'Filtro2',
        id : 'filter2',
        multiSelect: true,
        width: '240px',
    },
    {
        options: [
            { value: '10', label: 'Ten' },
            { value: '20', label: 'Twenty' },
            { value: '30', label: 'Thirty' },
            { value: '42', label: 'Forty two' },
        ],
        label: 'Filtro3',
        id : 'filter3',
        multiSelect: false,
        width: '240px',
    },
]

//dados mockados essa parte do código será substituída por uma chamada a API
const cards: CardProps[] = [
    {
        value: '100',
        title: 'Card Title',
        titlePosition: 'top'
    },
    {
        value: '100',
        title: 'Card Title',
        titlePosition: 'top'
    },
    {
        value: '100',
        title: 'Card Title',
        titlePosition: 'top'
    },
    {
        value: '100',
        title: 'Card Title',
        titlePosition: 'top'
    },

]

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
        width: 130 ,
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
];

interface Filter {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    multiSelect: boolean;
    width: string;
}

type ListData = {
    data: Record<string, string | number | Date>[];
    totalRows: number;
};
// Adicionar união de valores quando soubermos as listas que teremos
interface ListConteinerProps {
    list: 'hipertensao';
}

export const ListConteiner = ({ list }: ListConteinerProps) => {
    const { data: session } = useSession();
    const [value, setValue] = useState<Record<string, string | string[]>>({
        filter1 : [],
        filter2 : [],
        filter3 : "",
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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setTableData({
                data: [],
                totalRows: 0,
            });
            setIsLoading(false);
        };

        if (session && session.user) fetchData();
    }, [pagination, sorting, session, list]);

    function handleSortModelChange(newSortModel: GridSortModel) {
        setSorting([...newSortModel]);
    }

    const clearFiltersArgs = {
        iconActive : "https://media.graphassets.com/1EOGJH6TvSMqTrjigY1g",
        iconInactive : "https://media.graphassets.com/x37RkcUrTH6G50ganj9d",
        label: 'Limpar todos os filtros',
    }

    const filters = ManyFiltersData.map((filter: Filter) => (
        <SelectDropdown 
            key={filter.id} 
            {...filter} 
            value={value} 
            setValue={setValue} 
            options={filter.options} 
            label={filter.label} 
            multiSelect={filter.multiSelect} 
            width={filter.width} 
        />
    ));
    const clearButton = <ClearFilters data={value} setData={setValue} {...clearFiltersArgs}/>;
    return <div style={{display: "flex", flexDirection: "column", gap: "30px", padding: "25px"}}>
        <p style={{fontSize: "26px"}}>Titulo do Painel</p>
        <CardGrid cards={cards}/>
        <FilterBar filters={filters} clearButton={clearButton}/>
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
