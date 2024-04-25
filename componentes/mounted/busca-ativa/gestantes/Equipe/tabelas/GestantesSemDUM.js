import { 
    PainelBuscaAtiva , 
    Spinner, 
  } from "@impulsogov/design-system"
  import { colunasGestantesEquipe } from "../../../../../../helpers/colunasGestantes"

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
const IntFiltrosGestantesEquipe = [
    "gestacao_idade_gestacional_atual",
    "consultas_pre_natal_validas"
]
const TabelaEquipeGestantesSemDUM = ({
    tabelaDataEquipe,
    tabelaData,
    setTabelaData,
    trackObject,
    aba,
    sub_aba,
    onPrintClick,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados
})=>{
    const tabelaDataEquipeGestantesSemDUM = tabelaDataEquipe.filter(item=>item.id_status_usuario == 11)
    return tabelaDataEquipeGestantesSemDUM && tabelaDataEquipeGestantesSemDUM.length>0 && tabelaDataEquipe && tabelaData ? 
    <>
    <PainelBuscaAtiva
        onPrintClick={onPrintClick}
        key="TabelaChildGestantesSemDUM"
        trackObject={trackObject}
        lista="gestantes"
        aba={aba}
        sub_aba={sub_aba}
        dadosFiltros={[
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.acs_nome))],
            filtro: 'acs_nome',
            rotulo: 'Filtrar por Profissional Responsável'
        },
        ]}
        painel="gestantes"
        tabela={{
        colunas: colunasGestantesEquipe,
        data:tabelaDataEquipeGestantesSemDUM
        }}
        data={tabelaData}
        setData={setTabelaData}
        datefiltros={datefiltrosGestantes}
        IntFiltros={IntFiltrosGestantesEquipe}
        IDFiltros={IDFiltrosGestantes}
        rotulosfiltros={rotulosfiltrosGestantes}    
        IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
        atualizacao = {new Date(tabelaDataEquipeGestantesSemDUM.reduce((maisRecente, objeto) => {
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
    /></> : <Spinner/>
}
export { TabelaEquipeGestantesSemDUM }
