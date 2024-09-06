import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasGestantesIndicadorUm } from "../../../../../../../helpers/colunasGestantesIndicadorUm";
import { labelsModalImpressaoAPS } from "../../../../../../../helpers/labelsModalImpressao";
import { larguraColunasGestantesIndicador1Paisagem, larguraColunasGestantesIndicador1Retrato } from "../../../../../../../helpers/larguraColunasGestantesIndicador1";
import { colunasImpressaoGestantesIndicador1 } from "../../../../../../../helpers/colunasImpressaoGestantesIndicador1";

const datefiltrosGestantes = [
    "gestacao_data_dpp",
    "consulta_prenatal_ultima_data",
]
const rotulosfiltrosGestantes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DPP MAIS PRÓXIMA",
    "IG ATUAL MAIOR",
    "MAIOR Nº TOTAL DE CONSULTAS",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA"
]
const IDFiltrosGestantes = {
    "NOMES DE A-Z" : "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome",
    "DPP MAIS PRÓXIMA" : "gestacao_data_dpp",
    "IG ATUAL MAIOR" : "gestacao_idade_gestacional_atual",
    "MAIOR Nº TOTAL DE CONSULTAS" : "consultas_pre_natal_validas",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA" : "consulta_prenatal_ultima_data"
}   
const IDFiltrosOrdenacaoGestantes = {
    "NOMES DE A-Z" : "asc",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "asc",
    "DPP MAIS PRÓXIMA" : "asc",
    "IG ATUAL MAIOR" : "desc",
    "MAIOR Nº TOTAL DE CONSULTAS" : "desc",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA" : "desc"
}

const IndicadorUmTabelaGestantesSemDUM = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    trackObject,
    aba,
    sub_aba,
    liberarPesquisa,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
}) => {
    const tabelaDataAPSGestantesSemDUM = tabelaDataAPS?.filter(item=>item.id_status_usuario == 11)
    return tabelaDataAPS ? <PainelBuscaAtiva
    painel="aps"
    key="tabelaDataAPSGestantesSemDUM"
    lista="PRÉ-NATAL INDICADOR 1 (6 CONSULTAS)"
    divisorVertical={[1,4]}
    largura_colunas_impressao={{
        paisagem : larguraColunasGestantesIndicador1Paisagem,
        retrato : larguraColunasGestantesIndicador1Retrato
    }}
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSGestantesSemDUM.map(item => item.equipe_nome))],
            filtro: 'equipe_nome',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesSemDUM.map(item => item.equipe_ine.toString()))],
            filtro: 'equipe_ine',
            rotulo: 'Filtrar por INE da equipe'
        },
    ]}
    tabela={{
        colunas: colunasGestantesIndicadorUm,
        data:tabelaDataAPSGestantesSemDUM
    }}
    colunasImpressao = {colunasImpressaoGestantesIndicador1}
    datefiltros={datefiltrosGestantes}
    IDFiltros={IDFiltrosGestantes}
    rotulosfiltros={rotulosfiltrosGestantes}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
    trackObject={trackObject}
    atualizacao = {new Date(tabelaDataAPSGestantesSemDUM.reduce((maisRecente, objeto) => {
        const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
        const dataMaisRecenteAnterior = new Date(maisRecente);
        return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
        }, "2000-01-01")).toLocaleString('pt-BR', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })}
    aba={aba}
    sub_aba={sub_aba}
    data={tabelaData}
    setData={setTabelaData}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    setFiltros_aplicados={setFiltros_aplicados}
    liberarPesquisa={liberarPesquisa}
    lista_mixpanel="pre_natal"
    propAgrupamentoImpressao= "equipe_nome"
    propOrdenacaoImpressao= "acs_nome"
    labelsModalImpressao= { labelsModalImpressaoAPS }
/> : <Spinner/>
}
export { IndicadorUmTabelaGestantesSemDUM }