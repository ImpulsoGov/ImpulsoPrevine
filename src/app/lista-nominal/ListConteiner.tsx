import { FilterBar, SelectDropdown, ClearFilters, CardGrid, Table } from '@impulsogov/design-system';
import { useState } from 'react';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Tag, type TagTheme } from '@impulsogov/design-system/dist/molecules/Tag';
import { Icon, Text } from '@impulsogov/design-system';
import { IconDetailsMap } from '@impulsogov/design-system';

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

interface TagCellParams extends GridRenderCellParams {
    value: {
        theme?: TagTheme;
        text: string;
    };
}

function TableTagWithIconAndText({
    theme,
    text,
    icon: { src, alt }
}: {
    theme: TagTheme;
    text: string;
    icon: {
        src: string;
        alt: string;
    };
}) {
    return (
        <Tag theme={theme}>
            <Icon
                width={12}
                height={12}
                src={src}
                alt={alt}
            />
            <Text>{text}</Text>
        </Tag>
    );
}

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
] as GridColDef[];

interface Filter {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    multiSelect: boolean;
    width: string;
}

export const ListConteiner = ({data} : any) => {
    const [value, setValue] = useState<Record<string, string | string[]>>({
        filter1 : [],
        filter2 : [],
        filter3 : "",
    });
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
            data={data}
            rowHeight={60}
        />
    </div>;
}