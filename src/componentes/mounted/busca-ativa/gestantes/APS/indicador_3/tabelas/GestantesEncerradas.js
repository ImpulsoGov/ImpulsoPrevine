import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import identificacao_atendimento_odontologico from "../../../../../../../data/identificacao_atendimento_odontologico.json";
import { colunasGestantesIndicadorTres } from "../../../../../../../helpers/colunasGestantesIndicadorTres";
import { larguraColunasGestantesIndicador3Paisagem, larguraColunasGestantesIndicador3Retrato } from "../../../../../../../helpers/larguraColunasGestantesIndicador3";
import { colunasImpressaoGestantesIndicador3 } from "../../../../../../../helpers/colunasImpressaoGestantesIndicador3";
import { labelsModalImpressaoAPS } from "../../../../../../../helpers/labelsModalImpressao";

const datefiltrosGestantes = [
    "gestacao_data_dpp",
    "consulta_prenatal_ultima_data",
]
const rotulosfiltrosGestantes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DPP MAIS PRÓXIMA",
]
const IDFiltrosGestantes = {
    "NOMES DE A-Z" : "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome",
    "DPP MAIS PRÓXIMA" : "gestacao_data_dpp",
}   
const IDFiltrosOrdenacaoGestantes = {
    "cidadao_nome" : "asc",
    "acs_nome" : "asc",
    "gestacao_data_dpp" : "asc",
}

const IndicadorTresTabelaGestantesEncerradas = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    trackObject,
    aba,
    sub_aba,
    liberarPesquisa,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados
}) => {
    const tabelaDataAPSGestantesEncerradas = tabelaDataAPS?.filter(item=>item.id_status_usuario == 9)
        .map(item => ({...item, equipe_nome_e_ine: `${item.equipe_nome} - ${item.equipe_ine}`}))
    return tabelaDataAPS ? <PainelBuscaAtiva
    key="tabelaDataAPSGestantesEncerradas"
    painel="aps"
    lista="PRÉ-NATAL - INDICADOR 3 (ATENDIMENTO ODONTOLÓGICO)"
    divisorVertical = {[0,3]}
    largura_colunas_impressao={{
        paisagem : larguraColunasGestantesIndicador3Paisagem,
        retrato : larguraColunasGestantesIndicador3Retrato
    }}
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSGestantesEncerradas.map(item => item.id_atendimento_odontologico.toString()))],
            labels : {1 : "Sim", 2 : "Não"},
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesEncerradas.map(item => item.equipe_nome_e_ine))],
            filtro: 'equipe_nome_e_ine',
            rotulo: 'Filtrar por nome e INE da equipe',
        },
        {
            data: [...new Set(tabelaDataAPSGestantesEncerradas.map(item => item.gestacao_quadrimestre))],
            filtro: 'gestacao_quadrimestre',
            rotulo: 'Filtrar por quadrimestre'
        },
    ]}
    tabela={{
        colunas: colunasGestantesIndicadorTres,
        data:tabelaDataAPSGestantesEncerradas
    }}
    listas_auxiliares= {{
        identificacao_atendimento_odontologico: identificacao_atendimento_odontologico.identificacao_atendimento_odontologico
    }}
    colunasImpressao = {colunasImpressaoGestantesIndicador3}
    datefiltros={datefiltrosGestantes}
    IDFiltros={IDFiltrosGestantes}
    rotulosfiltros={rotulosfiltrosGestantes}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
    trackObject={trackObject}
    atualizacao = {new Date(tabelaDataAPSGestantesEncerradas.reduce((maisRecente, objeto) => {
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
    liberarPesquisa={liberarPesquisa}
    lista_mixpanel="pre_natal"
    propAgrupamentoImpressao= "equipe_nome"
    propImpressaoSemPersonalizacao="equipe_nome_e_ine"
    propOrdenacaoImpressao= "acs_nome"
    labelsModalImpressao= { labelsModalImpressaoAPS }
    setFiltros_aplicados={setFiltros_aplicados}
/> : <Spinner/>
}
export { IndicadorTresTabelaGestantesEncerradas }
