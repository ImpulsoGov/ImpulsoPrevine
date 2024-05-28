import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasDiabetes } from "../../../../../helpers/colunasDiabetes"
import mixpanel from 'mixpanel-browser';

const datefiltrosDiabetes = [
    "dt_consulta_mais_recente",
    "dt_solicitacao_hemoglobina_glicada_mais_recente"
  ]
  const propriedadesNumericasOrdenacao = [
    "cidadao_idade",
  ]
  const rotulosfiltrosDiabetes = [
    "NOME (A - Z)",
    "PROFISSIONAL RESPONSÁVEL (A - Z)",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "DATA DA SOLICITAÇÃO DE HEMOGLOBINA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "PRAZO PARA PRÓXIMA CONSULTA (DO MAIS PRÓXIMO AO MAIS DISTANTE)",
    "PRAZO PARA PRÓXIMA SOLICITAÇÃO DE HEMOGLOBINA (DO MAIS PRÓXIMO AO MAIS DISTANTE)",
    "IDADE (CRESCENTE)",
  ]
  const IDFiltrosDiabetes = {
    "NOME (A - Z)": "cidadao_nome",
    "PROFISSIONAL RESPONSÁVEL (A - Z)": "acs_nome_cadastro",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_consulta_mais_recente",
    "DATA DA SOLICITAÇÃO DE HEMOGLOBINA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_solicitacao_hemoglobina_glicada_mais_recente",
    "PRAZO PARA PRÓXIMA CONSULTA (DO MAIS PRÓXIMO AO MAIS DISTANTE)": "prazo_proxima_consulta",
    "PRAZO PARA PRÓXIMA SOLICITAÇÃO DE HEMOGLOBINA (DO MAIS PRÓXIMO AO MAIS DISTANTE)": "prazo_proxima_solicitacao_hemoglobina",
    "IDADE (CRESCENTE)": "cidadao_idade",
  }
  const IDFiltrosOrdenacaoDiabetes = {
    "cidadao_nome" : "asc",
    "acs_nome_cadastro" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_solicitacao_hemoglobina_glicada_mais_recente" : "asc",
    "prazo_proxima_solicitacao_hemoglobina" : "asc",
    "cidadao_idade": "asc",
  }


export const TabelaAPS = ({
    tabelaData,
    tabelaDataAPS,
    Impressao,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
})=>{ 
    const TabelaAPSTratada = tabelaDataAPS?.map(item=>({
        ...item,
        cidadao_faixa_etaria : item.cidadao_faixa_etaria == 'Menos de 17 anos' ? ' Menos de 17 anos' : item.cidadao_faixa_etaria,
        status_usuario : item.status_usuario == "Consulta e solicitação de hemoglobina a fazer" ? " Consulta e solicitação de hemoglobina a fazer" : item.status_usuario
    }))
    return TabelaAPSTratada && tabelaData ?
    <PainelBuscaAtiva
    onPrintClick={Impressao}
    dadosFiltros={[
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.equipe_ine_cadastro))],
            filtro: 'equipe_ine_cadastro',
            rotulo: 'Filtrar por INE da equipe'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.equipe_nome_cadastro))],
            filtro: 'equipe_nome_cadastro',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.acs_nome_cadastro))],
            filtro: 'acs_nome_cadastro',
            rotulo: 'Filtrar por nome do Profissional Responsável'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.identificacao_condicao_diabetes))],
            filtro: 'identificacao_condicao_diabetes',
            rotulo: 'Filtrar por tipo de diagnóstico'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.status_usuario))],
            filtro: 'status_usuario',
            rotulo: 'Filtrar por status'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.cidadao_faixa_etaria))],
            labels: {
                'Menos de 17 anos' : ' Menos de 17 anos',
                'Entre 18 e 24 anos' : 'Entre 18 e 24 anos',
                'Entre 25 e 34 anos' : 'Entre 25 e 34 anos',
                'Entre 35 e 44 anos' : 'Entre 35 e 44 anos',
                'Entre 45 e 54 anos' : 'Entre 45 e 54 anos',
                'Entre 55 e 64 anos' : 'Entre 55 e 64 anos',
                'Mais de 65 anos' : 'Mais de 65 anos',
                'Sem idade informada' : 'Sem idade informada'
            },
            filtro: 'cidadao_faixa_etaria',
            rotulo: 'Filtrar por faixa etária'
        },
    ]}
    painel="diabetes"
    tabela={{
        colunas: colunasDiabetes,
        data:TabelaAPSTratada
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosDiabetes}
    IntFiltros={propriedadesNumericasOrdenacao}
    IDFiltros={IDFiltrosDiabetes}
    rotulosfiltros={rotulosfiltrosDiabetes}
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoDiabetes} 
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
    lista="diabetes"
    aba={null}
    sub_aba={null}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    setFiltros_aplicados={setFiltros_aplicados}
    /> : <Spinner/>
}