import { 
    PainelBuscaAtiva , 
    Spinner, 
  } from "@impulsogov/design-system"
import identificacao_exame_hiv_sifilis from "../../../../../../data/identificacao_exame_hiv_sifilis.json"
import { colunasGestantesEquipe } from "../../../../../../helpers/colunasGestantes"
import { 
    datefiltrosGestantes,
    IDFiltrosGestantes,
    rotulosfiltrosGestantes,
    IDFiltrosOrdenacaoGestantes,
    IntFiltrosGestantesEquipe
 } from "../../../../../../helpers/FiltrosOrdenacaoAux"
const TabelaEquipeGestantesAtivas = ({
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
    const tabelaDataEquipeGestantesAtivas = tabelaDataEquipe.filter(item=>item.id_status_usuario == 8)
    return tabelaDataEquipeGestantesAtivas && tabelaDataEquipeGestantesAtivas?.length>0 && tabelaDataEquipe && tabelaData ? 
    <>
    <PainelBuscaAtiva
        onPrintClick={onPrintClick}
        key="TabelaChildGestantesAtivas"
        trackObject={trackObject}
        lista="gestantes"
        aba={aba}
        sub_aba={sub_aba}
        dadosFiltros={[
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.acs_nome))],
            filtro: 'acs_nome',
            rotulo: 'Filtrar por profissional responsável'
        },
        {
            data: ['Maior ou igual a 6','Menor que 6'],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por número de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.id_atendimento_odontologico.toString()))],
            labels : {1 : "Sim", 2 : "Não"},
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.id_exame_hiv_sifilis.toString()))],
            labels : [...new Set(identificacao_exame_hiv_sifilis.identificacao_exame_hiv_sifilis.map(item=> item.exame_hiv_sifilis_descricao))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.gestacao_quadrimestre))],
            filtro: 'gestacao_quadrimestre',
            rotulo: 'Filtrar por quadrimestre'
        },
        ]}
        painel="gestantes"
        tabela={{
        colunas: colunasGestantesEquipe,
        data:tabelaDataEquipeGestantesAtivas
        }}
        data={tabelaData}
        setData={setTabelaData}
        datefiltros={datefiltrosGestantes}
        IntFiltros={IntFiltrosGestantesEquipe}
        IDFiltros={IDFiltrosGestantes}
        rotulosfiltros={rotulosfiltrosGestantes}    
        IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
        rowHeight={65}
        atualizacao = {new Date(tabelaDataEquipeGestantesAtivas.reduce((maisRecente, objeto) => {
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
    /></> : <Spinner />
}

export { TabelaEquipeGestantesAtivas }
