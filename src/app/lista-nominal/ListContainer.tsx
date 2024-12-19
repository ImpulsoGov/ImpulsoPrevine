import { FilterBar, SelectDropdown, ClearFilters, CardGrid, Table } from '@impulsogov/design-system';
import { useEffect, useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { DataItem, filterData } from '@/utils/FilterData';
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
//mock data
const data = [
    {
        nome: 'Nome 1',
        cpf: '123.456.789-00',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: '2023-01-01',
        prazo_proxima_consulta: '2023-06-01',
        dt_afericao_pressao_mais_recente: '2023-02-01',
        prazo_proxima_afericao_pa: '2023-07-01',
        acs_nome_cadastro: 'ACS 1',
        status: 'atrasado'
    },
    {
        nome: 'Nome 2',
        cpf: '123.456.789-01',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: '2023-01-02',
        prazo_proxima_consulta: '2023-06-02',
        dt_afericao_pressao_mais_recente: '2023-02-02',
        prazo_proxima_afericao_pa: '2023-07-02',
        acs_nome_cadastro: 'ACS 2',
        status: 'atrasado'
    },
    {
        nome: 'Nome 3',
        cpf: '123.456.789-02',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: '2023-01-03',
        prazo_proxima_consulta: '2023-06-03',
        dt_afericao_pressao_mais_recente: '2023-02-03',
        prazo_proxima_afericao_pa: '2023-07-03',
        acs_nome_cadastro: 'ACS 3',
        status: 'em dia'
    },
    {
        nome: 'Nome 4',
        cpf: '123.456.789-03',
        identificacao_condicao: 'Condição 4',
        dt_consulta_mais_recente: '2023-01-04',
        prazo_proxima_consulta: '2023-06-04',
        dt_afericao_pressao_mais_recente: '2023-02-04',
        prazo_proxima_afericao_pa: '2023-07-04',
        acs_nome_cadastro: 'ACS 4',
        status: 'atrasado'
    },
    {
        nome: 'Nome 5',
        cpf: '123.456.789-04',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: '2023-01-05',
        prazo_proxima_consulta: '2023-06-05',
        dt_afericao_pressao_mais_recente: '2023-02-05',
        prazo_proxima_afericao_pa: '2023-07-05',
        acs_nome_cadastro: 'ACS 1',
        status: 'em dia'
    },
    {
        nome: 'Nome 6',
        cpf: '123.456.789-05',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: '2023-01-06',
        prazo_proxima_consulta: '2023-06-06',
        dt_afericao_pressao_mais_recente: '2023-02-06',
        prazo_proxima_afericao_pa: '2023-07-06',
        acs_nome_cadastro: 'ACS 2',
        status: 'atrasado'
    },
    {
        nome: 'Nome 7',
        cpf: '123.456.789-06',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: '2023-01-07',
        prazo_proxima_consulta: '2023-06-07',
        dt_afericao_pressao_mais_recente: '2023-02-07',
        prazo_proxima_afericao_pa: '2023-07-07',
        acs_nome_cadastro: 'ACS 3',
        status: 'em dia'
    },
    {
        nome: 'Nome 8',
        cpf: '123.456.789-07',
        identificacao_condicao: 'Condição 4',
        dt_consulta_mais_recente: '2023-01-08',
        prazo_proxima_consulta: '2023-06-08',
        dt_afericao_pressao_mais_recente: '2023-02-08',
        prazo_proxima_afericao_pa: '2023-07-08',
        acs_nome_cadastro: 'ACS 4',
        status: 'atrasado'
    },
    {
        nome: 'Nome 9',
        cpf: '123.456.789-08',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: '2023-01-09',
        prazo_proxima_consulta: '2023-06-09',
        dt_afericao_pressao_mais_recente: '2023-02-09',
        prazo_proxima_afericao_pa: '2023-07-09',
        acs_nome_cadastro: 'ACS 1',
        status: 'em dia'
    },
    {
        nome: 'Nome 10',
        cpf: '123.456.789-10',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: '2023-01-10',
        prazo_proxima_consulta: '2023-06-10',
        dt_afericao_pressao_mais_recente: '2023-02-10',
        prazo_proxima_afericao_pa: '2023-07-10',
        acs_nome_cadastro: 'ACS 2',
        status: 'atrasado'
    },
    {
        nome: 'Nome 11',
        cpf: '123.456.789-11',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: '2023-01-11',
        prazo_proxima_consulta: '2023-06-11',
        dt_afericao_pressao_mais_recente: '2023-02-11',
        prazo_proxima_afericao_pa: '2023-07-11',
        acs_nome_cadastro: 'ACS 3',
        status: 'em dia'
    },
    {
        nome: 'Nome 12',
        cpf: '123.456.789-12',
        identificacao_condicao: 'Condição 4',
        dt_consulta_mais_recente: '2023-01-12',
        prazo_proxima_consulta: '2023-06-12',
        dt_afericao_pressao_mais_recente: '2023-02-12',
        prazo_proxima_afericao_pa: '2023-07-12',
        acs_nome_cadastro: 'ACS 4',
        status: 'atrasado'
    },
    {
        nome: 'Nome 13',
        cpf: '123.456.789-13',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: '2023-01-13',
        prazo_proxima_consulta: '2023-06-13',
        dt_afericao_pressao_mais_recente: '2023-02-13',
        prazo_proxima_afericao_pa: '2023-07-13',
        acs_nome_cadastro: 'ACS 1',
        status: 'em dia'
    },
    {
        nome: 'Nome 14',
        cpf: '123.456.789-14',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: '2023-01-14',
        prazo_proxima_consulta: '2023-06-14',
        dt_afericao_pressao_mais_recente: '2023-02-14',
        prazo_proxima_afericao_pa: '2023-07-14',
        acs_nome_cadastro: 'ACS 2',
        status: 'atrasado'
    },
    {
        nome: 'Nome 15',
        cpf: '123.456.789-15',
        identificacao_condicao: 'Condição 3',
        dt_consulta_mais_recente: '2023-01-15',
        prazo_proxima_consulta: '2023-06-15',
        dt_afericao_pressao_mais_recente: '2023-02-15',
        prazo_proxima_afericao_pa: '2023-07-15',
        acs_nome_cadastro: 'ACS 3',
        status: 'em dia'
    },
    {
        nome: 'Nome 16',
        cpf: '123.456.789-16',
        identificacao_condicao: 'Condição 4',
        dt_consulta_mais_recente: '2023-01-16',
        prazo_proxima_consulta: '2023-06-16',
        dt_afericao_pressao_mais_recente: '2023-02-16',
        prazo_proxima_afericao_pa: '2023-07-16',
        acs_nome_cadastro: 'ACS 4',
        status: 'atrasado'
    },
    {
        nome: 'Nome 17',
        cpf: '123.456.789-17',
        identificacao_condicao: 'Condição 1',
        dt_consulta_mais_recente: '2023-01-17',
        prazo_proxima_consulta: '2023-06-17',
        dt_afericao_pressao_mais_recente: '2023-02-17',
        prazo_proxima_afericao_pa: '2023-07-17',
        acs_nome_cadastro: 'ACS 1',
        status: 'em dia'
    },
    {
        nome: 'Nome 18',
        cpf: '123.456.789-18',
        identificacao_condicao: 'Condição 2',
        dt_consulta_mais_recente: '2023-01-18',
        prazo_proxima_consulta: '2023-06-18',
        dt_afericao_pressao_mais_recente: '2023-02-18',
        prazo_proxima_afericao_pa: '2023-07-18',
        acs_nome_cadastro: 'ACS 2',
        status: 'atrasado'
    }
]  as DataItem[];

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
export type ListContainerProps = {
    subTabID: string;
    title: string;
}
export const ListContainer = ({
    // subTabID,
    title
} : ListContainerProps) => {
    const initialFilters = filters.reduce((acc, filter: Filter) => {
        acc[filter.id] = filter.isMultiSelect ? [] : "";
        return acc;
    }, {} as Record<string, string | string[]>);
    const [tableData, setTableData] = useState<DataItem[]>(data);
    const [value, setValue] = useState<Record<string, string | string[]>>(initialFilters);
    useEffect(() => {
        setTableData(filterData(data, value));
    }, [value]);
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