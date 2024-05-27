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
const rotulosfiltrosDiabetes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "DATA DA SOLICITAÇÃO DE HEMOGLOBINA GLICADA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
  ]
  const IDFiltrosDiabetes = {
    "NOMES DE A-Z": "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome_cadastro",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_consulta_mais_recente",
    "DATA DA SOLICITAÇÃO DE HEMOGLOBINA GLICADA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_solicitacao_hemoglobina_glicada_mais_recente",
  }
  const IDFiltrosOrdenacaoDiabetes = {
    "cidadao_nome" : "asc",
    "acs_nome_cadastro" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_solicitacao_hemoglobina_glicada_mais_recente" : "asc",
    "prazo_proxima_solicitacao_hemoglobina" : "asc",
  }


export const TabelaEquipe = ({
    tabelaData,
    tabelaDataEquipe,
    Impressao,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
})=>{
    const TabelaDataEquipeTratada = tabelaDataEquipe?.map(item=>({
        ...item,
        cidadao_faixa_etaria : item.cidadao_faixa_etaria == 'Menos de 17 anos' ? ' Menos de 17 anos' : item.cidadao_faixa_etaria,
        status_usuario : item.status_usuario == "Consulta e solicitação de hemoglobina a fazer" ? " Consulta e solicitação de hemoglobina a fazer" : item.status_usuario
    }))

    return tabelaDataEquipe && tabelaData ?
    <PainelBuscaAtiva
    onPrintClick={Impressao}
    dadosFiltros={[
        {
            data: [...new Set(TabelaDataEquipeTratada.map(item => item.acs_nome_cadastro))],
            filtro: 'acs_nome_cadastro',
            rotulo: 'Filtrar por nome do Profissional Responsável'
        },
        {
            data: [...new Set(TabelaDataEquipeTratada.map(item => item.identificacao_condicao_diabetes))],
            filtro: 'identificacao_condicao_diabetes',
            rotulo: 'Filtrar por tipo de diagnóstico'
        },
        {
            data: [...new Set(TabelaDataEquipeTratada.map(item => item.status_usuario))],
            filtro: 'status_usuario',
            rotulo: 'Filtrar por status'
        },
        {
            data: [...new Set(TabelaDataEquipeTratada.map(item => item.cidadao_faixa_etaria))],
            filtro: 'cidadao_faixa_etaria',
            rotulo: 'Filtrar por faixa etária'
        },
    ]}
    painel="diabetes"
    tabela={{
        colunas: colunasDiabetes,
        data:TabelaDataEquipeTratada
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosDiabetes}
    IDFiltros={IDFiltrosDiabetes}
    rotulosfiltros={rotulosfiltrosDiabetes}   
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoDiabetes} 
    atualizacao = {new Date(tabelaDataEquipe.reduce((maisRecente, objeto) => {
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