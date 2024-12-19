import { getListData } from '@/services/lista-nominal/ListaNominal';
import { TableTag } from '@componentes/mounted/TableTag';
import { CardGrid, ClearFilters, FilterBar, SelectDropdown, Table } from '@impulsogov/design-system';
import type { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

//dados mockados essa parte do código será substituída por uma chamada a API
const ManyFiltersData = [
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
const cards = [
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

type IconDetails = {
    src: string;
    alt: string;
};

// Informações que devem vir do CMS
const IconDetailsMap: Record<string, IconDetails> = {
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
export const columns = [
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
            return(
                <>
                    {value ?? (
                        <TableTag
                            theme="pending"
                            text="Não realizada"
                            icon={{
                                src: IconDetailsMap["pending"].src,
                                alt: IconDetailsMap["pending"].alt
                            }}
                        />
                    )}
                </>
            )
        },
    },
    {
        field: 'prazo_proxima_consulta',
        headerName: 'Prazo para próxima consulta',
        width: 180 ,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            const theme = value === "Em dia" ? "success" : "warning";
            return(
                <TableTag
                    theme={theme}
                    text={value}
                    icon={{
                        src: IconDetailsMap[theme].src,
                        alt: IconDetailsMap[theme].alt
                    }}
                />
            )
        },
    },
    {
        field: 'dt_afericao_pressao_mais_recente',
        headerName: 'Data de aferição de PA mais recente',
        width: 200 ,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            return(
                <>
                    {value ?? (
                        <TableTag
                            theme="pending"
                            text="Não realizada"
                            icon={{
                                src: IconDetailsMap["pending"].src,
                                alt: IconDetailsMap["pending"].alt
                            }}
                        />
                    )}
                </>
            )
        },
    },
    {
        field: 'prazo_proxima_afericao_pa',
        headerName: 'Prazo para próxima aferição de PA',
        width: 200 ,
        headerAlign: 'left',
        align: 'left',
        renderCell({ value }) {
            const theme = value === "Em dia" ? "success" : "warning";
            return(
                <TableTag
                    theme={theme}
                    text={value}
                    icon={{
                        src: IconDetailsMap[theme].src,
                        alt: IconDetailsMap[theme].alt
                    }}
                />
            )
        },
    },
    {
        field: 'acs_nome_cadastro',
        headerName: 'ACS responsável',
        width: 250 ,
        headerAlign: 'left',
        align: 'left'
    },
] as GridColDef[];

interface Filter {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    multiSelect: boolean;
    width: string;
}

type ListDataRows = Record<string, string | number | Date | Record<string, string | null | undefined>>[];
type ListDataTotalRows = number;
type ListData = {
    data: Record<string, string | number | Date>[];
    totalRows: ListDataTotalRows;
};
// Adicionar união de valores quando soubermos as listas que teremos
interface ListConteinerProps {
    list: string;
}

export const ListConteiner = ({ list }: ListConteinerProps) => {
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
    // const [sortModel, setSortModel] = useState<GridSortModel>({
    //     field: 'nome',
    //     sort: 'asc'
    // });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const requestData = await paginateArray(paginationModel.page, paginationModel.pageSize);
            setTableData({
                data: requestData.data,
                totalRows: requestData.totalRows,
            });
            setIsLoading(false);
        };
        // Aqui seria feita a chamada a API para buscar os dados da tabela
        // e atualizar o estado tableData
        fetchData();
    }, [paginationModel.page, paginationModel.pageSize]);

    // useEffect(() => {
    //     setRowCount((prevRowCount) =>
    //         tableData?.totalRows !== undefined
    //         ? tableData?.totalRows
    //         : prevRowCount,
    //     );
    // }, [tableData?.totalRows, setRowCount]);

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
        {isLoading
            ? <Spinner />
            : (
                <Table
                    columns={columns}
                    data={tableData.data}
                    rowHeight={60}
                    paginationMode="server"
                    sortingMode="server"
                    rowCount={tableData.totalRows}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    // onSortModelChange={handleSortModelChange}
                    isLoading={isLoading}
                />
            )
        }
    </div>;
}
