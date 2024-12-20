import { FilterBar, SelectDropdown, ClearFilters, CardGrid, Table, Spinner } from '@impulsogov/design-system';
import { useEffect, useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { DataItem, filterData } from '@/utils/FilterData';
import { getListData } from '@/services/lista-nominal/ListaNominal';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
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
        multiSelect: true,
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
        multiSelect: true,
        width: '240px',
    },
    {
        options: [
            { value: 'em dia', label: 'Em dia' },
            { value: 'atrasado', label: 'Atrasado' },
        ],
        label: 'Status',
        id : 'status',
        multiSelect: false,
        width: '240px',
    },
]
//dados mockados essa parte do código será substituída por uma chamada a API
const cards = [
    {
        value: '78',
        title: 'Card Title 1',
        titlePosition: 'top'
    },
    {
        value: '234',
        title: 'Card Title 2',
        titlePosition: 'top'
    },
    {
        value: '678',
        title: 'Card Title 3',
        titlePosition: 'top'
    },
    {
        value: '131',
        title: 'Card Title 4',
        titlePosition: 'top'
    },

]
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
    },
    {
        field: 'prazo_proxima_consulta',
        headerName: 'Prazo para próxima consulta',
        width: 180 ,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'dt_afericao_pressao_mais_recente',
        headerName: 'Data de aferição de PA mais recente',
        width: 200 ,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'prazo_proxima_afericao_pa',
        headerName: 'Prazo para próxima aferição de PA',
        width: 200 ,
        headerAlign: 'left',
        align: 'left',
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
interface Filter {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    multiSelect: boolean;
    width: string;
}
export type ListContainerProps = {
    subTabID: string;
    title: string;
    list: string;
}
export const ListContainer = ({
    // subTabID,
    title,
    list
} : ListContainerProps) => {
    const [user, setUser] = useState<Session['user']>();
    const initialFilters = filters.reduce((acc, filter: Filter) => {
        acc[filter.id] = filter.multiSelect ? [] : "";
        return acc;
    }, {} as Record<string, string | string[]>);
    const [value, setValue] = useState<Record<string, string | string[]>>(initialFilters);
    const [response, setResponse] = useState<DataItem[]>([]);
    const [tableData, setTableData] = useState<DataItem[]>([]);

    useEffect(() => {
        const sessionAsync = async() => {
            const session = await getSession() as Session;
            setUser(session?.user);
        };
        sessionAsync();
    }, []);

    useEffect(() => {
        if (user) {
            const getListDataResponse = async () => {
                const res = await getListData({
                    municipio_id_sus: user.municipio_id_sus, 
                    token: user.access_token, 
                    list: list,
                    sorting: undefined, //substituir pelo estado definido na funcionalidade de ordenação
                    filters: value,
                    ine: user.equipe.includes('9') ? user.equipe : undefined    
                });
                setResponse(res.data);
            };
            getListDataResponse();
        }
    }, [user, value]);

    useEffect(() => {
        setTableData(filterData(response, value));
    }, [response, value]);

    if (!user) return <p>Usuário não autenticado</p>;
    if (response.length === 0) return <Spinner/>;

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
            multiSelect={filter.multiSelect} 
            width={filter.width} 
        />
    ));
    const clearButton = <ClearFilters data={value} setData={setValue} {...clearFiltersArgs}/>;
    return user && response && <div style={{display: "flex", flexDirection: "column", gap: "30px", padding: "25px"}}>
        <p style={{fontSize: "26px"}}>{title}</p>
        {cards && <CardGrid cards={cards}/>}
        <FilterBar filters={filtersSelect} clearButton={clearButton}/>
        {
            tableData &&
            <Table     
                columns={columns}
                data={tableData}
                rowHeight={60}
            />
        }
    </div>;
}