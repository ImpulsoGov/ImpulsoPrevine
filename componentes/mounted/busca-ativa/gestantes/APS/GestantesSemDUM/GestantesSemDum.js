import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasGestantesSemDUMAPS } from "../../../../../../helpers/colunasGestantesSemDUMAPS";
import { larguraColunasGestantesIndicador3Paisagem, larguraColunasGestantesIndicador3Retrato } from "../../../../../../helpers/larguraColunasGestantesIndicador3";
import { colunasImpressaoGestantesIndicador3 } from "../../../../../../helpers/colunasImpressaoGestantesIndicador3";
import { labelsModalImpressaoAPS } from "../../../../../../helpers/labelsModalImpressaoAPS";
import identificacao_atendimento_odontologico from "../../../../../../data/identificacao_atendimento_odontologico.json";

const datefiltrosGestantes = [
    "gestacao_data_dpp",
    "consulta_prenatal_ultima_data",
]
const rotulosfiltrosGestantes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
]
const IDFiltrosGestantes = {
    "NOMES DE A-Z" : "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome",
}   
const IDFiltrosOrdenacaoGestantes = {
    "NOMES DE A-Z" : "asc",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "asc",
}

const TabelaGestantesSemDUM = ({
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
    const tabelaDataAPSGestantesSemDUM = tabelaDataAPS?.filter(item=>item.id_status_usuario == 11)
        .map(item => ({...item, equipe_nome_e_ine: `${item.equipe_nome} - ${item.equipe_ine}`}))
    return tabelaDataAPS ? <PainelBuscaAtiva
    key="tabelaDataAPSGestantesSemDUM"
    painel="aps"
    lista="GESTANTES SEM DUM"
    divisorVertical = {[0,3]}
    largura_colunas_impressao={{
        paisagem : larguraColunasGestantesIndicador3Paisagem,
        retrato : larguraColunasGestantesIndicador3Retrato
    }}
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSGestantesSemDUM.map(item => item.equipe_nome_e_ine))],
            filtro: 'equipe_nome_e_ine',
            rotulo: 'Filtrar por nome e INE da equipe',
        },
    ]}
    tabela={{
        colunas: colunasGestantesSemDUMAPS,
        data:tabelaDataAPSGestantesSemDUM
    }}
    colunasImpressao = {colunasImpressaoGestantesIndicador3}
    listas_auxiliares= {{
        identificacao_atendimento_odontologico: identificacao_atendimento_odontologico.identificacao_atendimento_odontologico
    }}
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
    propAgrupamentoImpressao= "equipe_nome"
    propOrdenacaoImpressao= "acs_nome"
    labelsModalImpressao= { labelsModalImpressaoAPS }
/> : <Spinner/>
}
export { TabelaGestantesSemDUM }
