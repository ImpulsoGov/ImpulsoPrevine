import { getListData } from "@services/lista-nominal/ListaNominal";
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
            dt_consulta_mais_recente: '2023-01-01',
            prazo_proxima_consulta: '2023-06-01',
            dt_afericao_pressao_mais_recente: '2023-02-01',
            prazo_proxima_afericao_pa: '2023-07-01',
            acs_nome_cadastro: 'ACS 1'
        },
        {
            nome: 'Nome 2',
            cpf: '123.456.789-01',
            identificacao_condicao: 'Condição 2',
            dt_consulta_mais_recente: '2023-01-02',
            prazo_proxima_consulta: '2023-06-02',
            dt_afericao_pressao_mais_recente: '2023-02-02',
            prazo_proxima_afericao_pa: '2023-07-02',
            acs_nome_cadastro: 'ACS 2'
        },
        {
            nome: 'Nome 3',
            cpf: '123.456.789-02',
            identificacao_condicao: 'Condição 3',
            dt_consulta_mais_recente: '2023-01-03',
            prazo_proxima_consulta: '2023-06-03',
            dt_afericao_pressao_mais_recente: '2023-02-03',
            prazo_proxima_afericao_pa: '2023-07-03',
            acs_nome_cadastro: 'ACS 3'
        }
    ] }
    return <ListaNominal data={data.data as Record<string, string | number | Date>[]}/>
}
export default ListaNominalPage;