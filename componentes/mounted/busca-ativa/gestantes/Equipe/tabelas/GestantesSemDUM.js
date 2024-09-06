import { 
    PainelBuscaAtiva , 
    Spinner, 
  } from "@impulsogov/design-system"
  import { colunasGestantesEquipe } from "../../../../../../helpers/colunasGestantes"
import { larguraColunasSemDumPaisagemEquipe, larguraColunasSemDumRetratoEquipe } from "../../../../../../helpers/larguraColunasGestantesSemDum"
import identificacao_atendimento_odontologico from "../../../../../../data/identificacao_atendimento_odontologico.json"
import identificacao_exame_hiv_sifilis from "../../../../../../data/identificacao_exame_hiv_sifilis.json"
import { colunasImpressaoSemDum } from "../../../../../../helpers/colunasImpressaoGestantesSemDum"
import { labelsModalImpressaoEquipe } from "../../../../../../helpers/labelsModalImpressao"
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
    mixpanel,
    aba,
    sub_aba,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
    liberarPesquisa
})=>{
    const tabelaDataEquipeGestantesSemDUM = tabelaDataEquipe.filter(item=>item.id_status_usuario == 11)
    return tabelaDataEquipeGestantesSemDUM && tabelaDataEquipe && tabelaData ? 
    <>
    <PainelBuscaAtiva
        key="TabelaChildGestantesSemDUM"
        painel="equipe"
        lista =  "GESTANTES SEM DUM"
        lista_mixpanel = "pre_natal"
        divisorVertical = {[1, 8]}
        largura_colunas_impressao = { {
            paisagem : larguraColunasSemDumPaisagemEquipe,
            retrato : larguraColunasSemDumRetratoEquipe
        }}
        dadosFiltros={[
            {
                data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.acs_nome))],
                filtro: 'acs_nome',
                rotulo: 'Filtrar por Profissional Responsável'
            },
        ]}
        tabela={{
            colunas: colunasGestantesEquipe,
            data:tabelaDataEquipeGestantesSemDUM
        }}
        aba={aba}
        sub_aba={sub_aba}
        data={tabelaData}
        setData={setTabelaData}
        datefiltros={datefiltrosGestantes}
        IntFiltros={IntFiltrosGestantesEquipe}
        IDFiltros={IDFiltrosGestantes}
        rotulosfiltros={rotulosfiltrosGestantes}    
        IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
        trackObject={mixpanel}
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
        listas_auxiliares= {{
            identificacao_atendimento_odontologico: identificacao_atendimento_odontologico.identificacao_atendimento_odontologico,
            identificacao_exame_sifilis_hiv: identificacao_exame_hiv_sifilis.identificacao_exame_hiv_sifilis,
        }}   
        colunasImpressao= {colunasImpressaoSemDum}     
        propAgrupamentoImpressao= "acs_nome"
        propOrdenacaoImpressao= "acs_nome"
        propImpressaoSemPersonalizacao= "acs_nome"
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        setFiltros_aplicados={setFiltros_aplicados}
        liberarPesquisa={liberarPesquisa}
        labelsModalImpressao= { labelsModalImpressaoEquipe }
    /></> : <Spinner/>
}
export { TabelaEquipeGestantesSemDUM }
