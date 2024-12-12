// import { getListData } from "@services/lista-nominal/ListaNominal";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { ListaNominal } from "./ListaNominal";
import type { getListDataProps } from "@services/lista-nominal/ListaNominal";

const ListaNominalPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    if (!session || !session.user) return <p>Usuário não autenticado</p>;
    const params: getListDataProps = {
        municipio_id_sus: session.user.municipio_id_sus,
        token: session.user.access_token,
        list: "lista-nominal", //esse valor inicial vai vir da url, assim como os filtros e ordenacao inicial
    }
    if(session.user.perfis.includes(9)) params.ine = session.user.equipe
    // const data = await getListData(params) // comentei aqui porque a api ainda não está pronta
    const data = { data:[
        {
            nome: 'Nome 1',
            cpf: '123.456.789-00',
            identificacao_condicao: 'Condição 1',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Em dia",
                theme: "success"
            },
            dt_afericao_pressao_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_afericao_pa: {
                text: "Em dia",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 1'
        },
        {
            nome: 'Nome 2',
            cpf: '123.456.789-01',
            identificacao_condicao: 'Condição 2',
            dt_consulta_mais_recente: {
                text: "22/09/21",
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            acs_nome_cadastro: 'ACS 2'
        },
        {
            nome: 'Nome 3',
            cpf: '123.456.789-02',
            identificacao_condicao: 'Condição 3',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 3'
        },
        {
            nome: 'Nome 4',
            cpf: '123.456.789-00',
            identificacao_condicao: 'Condição 1',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 1'
        },
        {
            nome: 'Nome 5',
            cpf: '123.456.789-01',
            identificacao_condicao: 'Condição 2',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 2'
        },
        {
            nome: 'Nome 6',
            cpf: '123.456.789-02',
            identificacao_condicao: 'Condição 3',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 3'
        },
        {
            nome: 'Nome 7',
            cpf: '123.456.789-00',
            identificacao_condicao: 'Condição 1',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 1'
        },
        {
            nome: 'Nome 8',
            cpf: '123.456.789-01',
            identificacao_condicao: 'Condição 2',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 2'
        },
        {
            nome: 'Nome 9',
            cpf: '123.456.789-02',
            identificacao_condicao: 'Condição 3',
            dt_consulta_mais_recente: {
                text: null,
                theme: "pending"
            },
            prazo_proxima_consulta: {
                text: "Até 30/04/23",
                theme: "warning"
            },
            dt_afericao_pressao_mais_recente: {
                text: "22/02/21",
            },
            prazo_proxima_afericao_pa: {
                text: "Até 30/04/23",
                theme: "success"
            },
            acs_nome_cadastro: 'ACS 3'
        }
    ], totalRows: 9}
    return <ListaNominal
        data={data as {data: Record<string, string | number | Date | Record<string, string | null>>[], totalRows: number}}
        // totalRows={data.totalRows}
    />
}
export default ListaNominalPage;