import { 
    PainelBuscaAtiva , 
    Spinner, 
  } from "@impulsogov/design-system"
  import { colunasGestantesEquipe } from "../../../../../../helpers/colunasGestantes"
  import { 
      datefiltrosGestantes,
      IDFiltrosGestantes,
      rotulosfiltrosGestantes,
      IDFiltrosOrdenacaoGestantes
   } from "../../../../../../helpers/FiltrosOrdenacaoAux"

const TabelaEquipeGestantesSemDUM = ({tabelaDataEquipe,tabelaData,setTabelaData})=>{
    const tabelaDataEquipeGestantesSemDUM = tabelaDataEquipe.filter(item=>item.id_status_usuario == 11)
    return tabelaDataEquipeGestantesSemDUM && tabelaDataEquipeGestantesSemDUM.length>0 && tabelaDataEquipe && tabelaData ? 
    <>
    <PainelBuscaAtiva
        key="TabelaChildGestantesSemDUM"
        dadosFiltros={[
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.acs_nome))],
            filtro: 'acs_nome',
            rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.consultas_pre_natal_validas?.toString()))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.id_atendimento_odontologico?.toString()))],
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.id_exame_hiv_sifilis?.toString()))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.gestacao_quadrimestre))],
            filtro: 'gestacao_quadrimestre',
            rotulo: 'Filtrar por quadrimestre'
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
    /></> : <Spinner/>
}
export { TabelaEquipeGestantesSemDUM }