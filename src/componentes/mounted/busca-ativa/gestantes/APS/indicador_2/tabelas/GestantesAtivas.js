import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasGestantesIndicadorDois } from "../../../../../../../helpers/colunasGestantesIndicadorDois";
import identificacao_exame_hiv_sifilis from "../../../../../../../data/identificacao_exame_hiv_sifilis.json"
import { larguraColunasGestantesIndicador2Paisagem, larguraColunasGestantesIndicador2Retrato } from "../../../../../../../helpers/larguraColunasGestantesIndicador2";
import { colunasImpressaoGestantesIndicador2 } from "../../../../../../../helpers/colunasImpressaoGestantesIndicador2";
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

const IndicadorDoisTabelaGestantesAtivas = ({
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
    const tabelaDataAPSGestantesAtivas = tabelaDataAPS?.filter(item=>item.id_status_usuario == 8)
        .map(item => ({...item, equipe_nome_e_ine: `${item.equipe_nome} - ${item.equipe_ine}`}))
    return tabelaDataAPS ? <PainelBuscaAtiva
        key="tabelaDataAPSGestantesAtivas"
        painel="aps"
        lista="<span>PRÉ-NATAL INDICADOR 2 (EXAMES DE HIV E SÍFILIS)<span/><span style='display: block;'>GESTANTES ATIVAS<span/>"
        divisorVertical={[0,3]}
        largura_colunas_impressao={{
            paisagem : larguraColunasGestantesIndicador2Paisagem,
            retrato : larguraColunasGestantesIndicador2Retrato
        }}
        dadosFiltros={[
            {
                data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.id_exame_hiv_sifilis.toString()))],
                labels : [...new Set(identificacao_exame_hiv_sifilis.identificacao_exame_hiv_sifilis.map(item=> item.exame_hiv_sifilis_descricao))],
                filtro: 'id_exame_hiv_sifilis',
                rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
            },
            {
                data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.equipe_nome_e_ine))],
                filtro: 'equipe_nome_e_ine',
                rotulo: 'Filtrar por nome e INE da equipe',
            },
            {
                data: [...new Set(tabelaDataAPSGestantesAtivas.map(item => item.gestacao_quadrimestre))],
                filtro: 'gestacao_quadrimestre',
                rotulo: 'Filtrar por quadrimestre'
            },
        ]}
        tabela={{
            colunas: colunasGestantesIndicadorDois,
            data:tabelaDataAPSGestantesAtivas
        }}
        listas_auxiliares = {{
            identificacao_exame_sifilis_hiv : identificacao_exame_hiv_sifilis.identificacao_exame_hiv_sifilis
        }}    
        colunasImpressao = {colunasImpressaoGestantesIndicador2}
        datefiltros={datefiltrosGestantes}
        IDFiltros={IDFiltrosGestantes}
        rotulosfiltros={rotulosfiltrosGestantes}    
        IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
        trackObject={trackObject}
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
export { IndicadorDoisTabelaGestantesAtivas }
