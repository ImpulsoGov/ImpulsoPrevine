import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasGestantesSemDUMAPS } from "../../../../../../helpers/colunasGestantesSemDUMAPS";
import mixpanel from 'mixpanel-browser';

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
    onPrintClick,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados
}) => {
    const tabelaDataAPSGestantesSemDUM = tabelaDataAPS?.filter(item=>item.id_status_usuario == 11)
    return tabelaDataAPS ? <PainelBuscaAtiva
    onPrintClick={onPrintClick}
    key="tabelaDataAPSGestantesSemDUM"
    trackObject={trackObject}
    lista="gestantes"
    aba={aba}
    sub_aba={sub_aba}
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSGestantesSemDUM.map(item => item.equipe_nome))],
            filtro: 'equipe_nome',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesSemDUM.map(item => item.equipe_ine))],
            filtro: 'equipe_ine',
            rotulo: 'Filtrar por INE da equipe'
        },
    ]}
    painel="gestantes"
    tabela={{
    colunas: colunasGestantesSemDUMAPS,
    data:tabelaDataAPSGestantesSemDUM
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosGestantes}
    IDFiltros={IDFiltrosGestantes}
    rotulosfiltros={rotulosfiltrosGestantes}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
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
      showSnackBar={showSnackBar}
      setShowSnackBar={setShowSnackBar}
      setFiltros_aplicados={setFiltros_aplicados}

/> : <Spinner/>
}
export { TabelaGestantesSemDUM }
