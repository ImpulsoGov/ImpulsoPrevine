import { filterData } from '@/utils/FilterData';
import { type NextRequest } from 'next/server';
import type { DataItem, Filters } from '@/utils/FilterData';

const getParams = async(searchParams: URLSearchParams) => {
    const filters: { [key: string]: string | string[] } = {};
    searchParams.get('filters')?.split(';').forEach((filter) => {
        const [key, valueString] = filter.split(':');
        const valueArray = valueString.split(',');
        filters[key] = valueArray.length !== 1 ? valueArray : valueArray[0];
    });
    return filters as Filters
}

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

// export async function GET(req : NextRequest, { params }: { params: { [key: string]: string } }) {
export async function GET(req : NextRequest) {
    try {
        // const { list, municipio_id_sus } = params;
        const searchParams = req.nextUrl.searchParams;
        const filters = await getParams(searchParams);
        const response = filterData(data,filters); // será substituido por consulta no banco de dados
        return Response.json(response,{ status: 200 });      
    } catch (error) {
        return Response.json({ message: 'Erro ao consultar dados' , detail : (error as Error).message },{ status: 500 });
    }
}