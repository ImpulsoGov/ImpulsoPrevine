import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasHipertensaoAPS } from "../../../../../helpers/colunasHipertensao";
import mixpanel from 'mixpanel-browser';
import { larguraColunasHipertensaoPaisagem, larguraColunasHipertensaoRetrato } from "../../../../../helpers/larguraColunasHipertensao";
import { colunasImpressaoHipertensaoAPS } from "../../../../../helpers/colunasImpressaoHipertensao";
import { labelsModalImpressaoAPS } from "../../../../../helpers/labelsModalImpressaoAPS";

const datefiltrosHipertensao = [
    "dt_afericao_pressao_mais_recente",
    "dt_consulta_mais_recente",
]
const propriedadesNumericasOrdenacao = [
    "cidadao_idade",
]
const rotulosfiltrosHipertensao = [
    "NOME (A - Z)",
    "PROFISSIONAL RESPONSÁVEL (A - Z)",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "DATA DA AFERIÇÃO DE PA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "PRAZO PARA PRÓXIMA CONSULTA (DO MAIS PRÓXIMO AO MAIS DISTANTE)",
    "PRAZO PARA PRÓXIMA AFERIÇÃO DE PA (DO MAIS PRÓXIMO AO MAIS DISTANTE)",
    "IDADE (CRESCENTE)",
]
const IDFiltrosHipertensao = {
    "NOME (A - Z)": "cidadao_nome",
    "PROFISSIONAL RESPONSÁVEL (A - Z)": "acs_nome_cadastro",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_consulta_mais_recente",
    "DATA DA AFERIÇÃO DE PA (DA MAIS ANTIGA PARA A MAIS RECENTE)": "dt_afericao_pressao_mais_recente",
    "PRAZO PARA PRÓXIMA CONSULTA (DO MAIS PRÓXIMO AO MAIS DISTANTE)": "prazo_proxima_consulta",
    "PRAZO PARA PRÓXIMA AFERIÇÃO DE PA (DO MAIS PRÓXIMO AO MAIS DISTANTE)": "prazo_proxima_afericao_pa",
    "IDADE (CRESCENTE)": "cidadao_idade",
}
const IDFiltrosOrdenacaoHipertensao = {
    "cidadao_nome" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_afericao_pressao_mais_recente" : "asc",
    "prazo_proxima_afericao_pa" : "asc",
    "acs_nome_cadastro" : "asc",
    "cidadao_idade": "asc",
}

export const TabelaAPS = ({
    tabelaData,
    tabelaDataAPS,
    liberarPesquisa,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
})=> {
    const TabelaAPSTratada = tabelaDataAPS?.map(item=>({
        ...item,
        cidadao_faixa_etaria : item.cidadao_faixa_etaria == 'Menos de 17 anos' ? ' Menos de 17 anos' : item.cidadao_faixa_etaria,
        status_usuario : item.status_usuario == "Consulta e aferição de PA a fazer" ? " Consulta e aferição de PA a fazer" : item.status_usuario,
        equipe_nome_e_ine: `${item.equipe_nome_cadastro} - ${item.equipe_ine_cadastro}`,
        cpf_e_identificacao_condicao: {
            cpf: item.cidadao_cpf_dt_nascimento,
            identificacao_condicao: item.identificacao_condicao_hipertensao
        },
    }))

    return tabelaDataAPS && tabelaData ? <PainelBuscaAtiva
    liberarPesquisa={liberarPesquisa}
    dadosFiltros={[
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.equipe_nome_e_ine))],
            filtro: 'equipe_nome_e_ine',
            rotulo: 'Filtrar por nome e INE da equipe',
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.acs_nome_cadastro))],
            filtro: 'acs_nome_cadastro',
            rotulo: 'Filtrar por nome do Profissional Responsável'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.identificacao_condicao_hipertensao))],
            filtro: 'identificacao_condicao_hipertensao',
            rotulo: 'Filtrar por tipo de diagnóstico'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.status_usuario))],
            filtro: 'status_usuario',
            rotulo: 'Filtrar por status'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.cidadao_faixa_etaria))],
            filtro: 'cidadao_faixa_etaria',
            rotulo: 'Filtrar por faixa etária'
        },
    ]}
    painel="aps"
    tabela={{
    colunas: colunasHipertensaoAPS,
    data:TabelaAPSTratada
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosHipertensao}
    IntFiltros={propriedadesNumericasOrdenacao}
    IDFiltros={IDFiltrosHipertensao}
    rotulosfiltros={rotulosfiltrosHipertensao}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoHipertensao}  
    atualizacao = {new Date(tabelaDataAPS.reduce((maisRecente, objeto) => {
    const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
    const dataMaisRecenteAnterior = new Date(maisRecente);
    return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
    }, "2000-01-01")).toLocaleString('pt-BR', { 
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
    })}
    trackObject={mixpanel}
    lista="HIPERTENSÃO"
    legendaImpressao="Aferição de PA = Aferição de Pressão Arterial"
    divisorVertical={[2,4,6]}
    largura_colunas_impressao={{
        retrato: larguraColunasHipertensaoRetrato,
        paisagem: larguraColunasHipertensaoPaisagem
    }}
    colunasImpressao={colunasImpressaoHipertensaoAPS}
    listas_auxiliares={{}}
    propAgrupamentoImpressao="equipe_nome_cadastro"
    propImpressaoSemPersonalizacao="equipe_nome_e_ine"
    propOrdenacaoImpressao="acs_nome_cadastro"
    labelsModalImpressao={labelsModalImpressaoAPS}
    aba={null}
    sub_aba={null}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    setFiltros_aplicados={setFiltros_aplicados}  
    /> : <Spinner/>
}