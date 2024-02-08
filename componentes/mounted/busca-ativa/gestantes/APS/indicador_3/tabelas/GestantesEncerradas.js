import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasGestantesIndicadorTres } from "../../../../../../../helpers/colunasGestantesIndicadorTres";
import mixpanel from 'mixpanel-browser';

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
    setTabelaData
}) => {
    const tabelaDataAPSGestantesEncerradas = tabelaDataAPS?.filter(item=>item.id_status_usuario == 9)
    return tabelaDataAPS ? <PainelBuscaAtiva
    key="tabelaDataAPSGestantesEncerradas"
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSGestantesEncerradas.map(item => item.gestacao_quadrimestre))],
            filtro: 'gestacao_quadrimestre',
            rotulo: 'Filtrar por quadrimestre'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesEncerradas.map(item => item.equipe_nome))],
            filtro: 'equipe_nome',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesEncerradas.map(item => item.equipe_ine.toString()))],
            filtro: 'equipe_ine',
            rotulo: 'Filtrar por INE da equipe'
        },
    ]}
    painel="gestantes"
    tabela={{
    colunas: colunasGestantesIndicadorTres,
    data:tabelaDataAPSGestantesEncerradas
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosGestantes}
    IDFiltros={IDFiltrosGestantes}
    rotulosfiltros={rotulosfiltrosGestantes}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
    trackObject={mixpanel}
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
/> : <Spinner/>
}
export { IndicadorTresTabelaGestantesEncerradas }