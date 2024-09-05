import { PainelBuscaAtiva, Spinner } from "@impulsogov/design-system";
import { status_usuario_descricao } from "../../../../../data/status_usuario_descricao";
import faixa_etarias from "../../../../../data/faixa_etarias";
import { colunasCitoEquipe } from "../../../../../helpers/colunasCito";
import { colunasImpressaoCitoEquipe } from "../../../../../helpers/colunasImpressaoCito";
import { larguraColunasCitoPaisagemEquipe, larguraColunasCitoRetratoEquipe } from "../../../../../helpers/larguraColunasCito";
import { labelsModalImpressaoEquipe } from "../../../../../helpers/labelsModalImpressao";
const datefiltrosCito = [
    "vencimento_da_coleta",
]
const rotulosfiltrosCito = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "VENCIMENTO DA COLETA MAIS ANTIGO",
    "IDADE MENOR-MAIOR",
]
const IDFiltrosCito = {
    "NOMES DE A-Z": "paciente_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome",
    "VENCIMENTO DA COLETA MAIS ANTIGO" : "vencimento_da_coleta",
    "IDADE MENOR-MAIOR" : "idade",
}   
const IDFiltrosOrdenacaoCito = {
    "paciente_nome" : "asc",
    "acs_nome" : "asc",
    "idade" : "asc",
    "vencimento_da_coleta" : "asc",
    "prazo_proxima_coleta" : "asc",
}

export const TabelaEquipeComExame = ({
    tabelaDataEquipe,
    liberarPesquisa,
    tabelaData,
    setTabelaData,
    mixpanel,
    aba,
    sub_aba,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
})=>{
    const tabelaDataEquipeSemExame = tabelaDataEquipe?.filter(item=>item.id_status_usuario == 12)
    return tabelaDataEquipe ? 
    <>
        <PainelBuscaAtiva
            painel="equipe"
            lista = "CITOPATOLÓGICO"
            divisorVertical = {[1,4]}
            largura_colunas_impressao = {{
                paisagem : larguraColunasCitoPaisagemEquipe,
                retrato : larguraColunasCitoRetratoEquipe
            }}
            dadosFiltros={[
                {
                    data: [...new Set(tabelaDataEquipeSemExame.map(item => item.acs_nome))],
                    filtro: 'acs_nome',
                    rotulo: 'Filtrar por nome do Profissional Responsável'
                },
                {
                    data: [...new Set(tabelaDataEquipeSemExame.map(item => item.id_status_usuario.toString()))],
                    labels : [...new Set(status_usuario_descricao.map(item=> item.status_usuario_descricao))],
                    filtro: 'id_status_usuario',
                    rotulo: 'Filtrar por status'
                },
                {
                    data: [...new Set(tabelaDataEquipeSemExame.map(item => item.id_faixa_etaria.toString()))],
                    labels : [...new Set(faixa_etarias.data.map(item=> item.faixa_etaria_descricao))],
                    filtro: 'id_faixa_etaria',
                    rotulo: 'Filtrar por faixa etária'
                },

            ]}
            tabela={{
                colunas: colunasCitoEquipe,
                data:tabelaDataEquipeSemExame
            }}
            colunasImpressao={colunasImpressaoCitoEquipe}
            data={tabelaData}
            setData={setTabelaData}
            datefiltros={datefiltrosCito}
            IDFiltros={IDFiltrosCito}
            rotulosfiltros={rotulosfiltrosCito}    
            IDFiltrosOrdenacao={IDFiltrosOrdenacaoCito}
            atualizacao = {new Date(tabelaDataEquipeSemExame.reduce((maisRecente, objeto) => {
                const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
                const dataMaisRecenteAnterior = new Date(maisRecente);
                return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
            }, "2000-01-01")).toLocaleString('pt-BR', { 
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            })}
            listas_auxiliares = {{
                status_usuario_descricao
            }}     
            propAgrupamentoImpressao = "equipe_nome"
            propOrdenacaoImpressao = "acs_nome"
            propImpressaoSemPersonalizacao= "equipe_nome"
            labelsModalImpressao = {labelsModalImpressaoEquipe}
            trackObject={mixpanel}
            setFiltros_aplicados={setFiltros_aplicados}
            aba={aba}
            sub_aba={sub_aba}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar} 
            liberarPesquisa={liberarPesquisa}
        />
    </> : 
    <Spinner/>
}