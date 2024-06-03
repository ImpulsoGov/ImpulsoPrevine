import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasGestantesIndicadorDois } from "../../../../../../../helpers/colunasGestantesIndicadorDois";
import mixpanel from 'mixpanel-browser';
import identificacao_exame_hiv_sifilis from "../../../../../../../data/identificacao_exame_hiv_sifilis.json"

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

const IndicadorDoisTabelaGestantesAtivas = ({
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
    const tabelaDataAPSGestantesAtivas = tabelaDataAPS?.filter(item=>item.id_status_usuario == 8)
    return tabelaDataAPS ? <PainelBuscaAtiva
    onPrintClick={onPrintClick}
    key="tabelaDataAPSGestantesAtivas"
    trackObject={trackObject}
    lista="gestantes"
    aba={aba}
    sub_aba={sub_aba}
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.gestacao_quadrimestre))],
            filtro: 'gestacao_quadrimestre',
            rotulo: 'Filtrar por quadrimestre'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.equipe_nome))],
            filtro: 'equipe_nome',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.equipe_ine.toString()))],
            filtro: 'equipe_ine',
            rotulo: 'Filtrar por INE da equipe'
        },
        {
            data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.id_exame_hiv_sifilis.toString()))],
            labels : [...new Set(identificacao_exame_hiv_sifilis.identificacao_exame_hiv_sifilis.map(item=> item.exame_hiv_sifilis_descricao))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
    ]}
    painel="gestantes"
    tabela={{
    colunas: colunasGestantesIndicadorDois,
    data:tabelaDataAPSGestantesAtivas
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosGestantes}
    IDFiltros={IDFiltrosGestantes}
    rotulosfiltros={rotulosfiltrosGestantes}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
    atualizacao = {new Date(tabelaDataAPSGestantesAtivas.reduce((maisRecente, objeto) => {
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
export { IndicadorDoisTabelaGestantesAtivas }
