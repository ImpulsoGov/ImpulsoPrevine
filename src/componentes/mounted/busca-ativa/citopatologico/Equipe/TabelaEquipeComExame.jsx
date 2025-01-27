import faixaEtaria from "@data/faixaEtaria.json";
import { PainelBuscaAtiva, Spinner } from "@impulsogov/design-system";
import { status_usuario_descricao } from "../../../../../data/status_usuario_descricao";
import { colunasCitoEquipe } from "../../../../../helpers/colunasCito";
import { colunasImpressaoCitoEquipe } from "../../../../../helpers/colunasImpressaoCito";
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
const IdFiltrosCito = {
    "NOMES DE A-Z": "paciente_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome",
    "VENCIMENTO DA COLETA MAIS ANTIGO" : "vencimento_da_coleta",
    "IDADE MENOR-MAIOR" : "idade",
}   

//TODO alterar o formato dos nomes das variáveis para camelCase
const IdFiltrosOrdenacaoCito = {
    // biome-ignore lint/style/useNamingConvention: <as variaveis já estão nesse formato vindo do backend e do banco de dados>
    "paciente_nome" : "asc",
    // biome-ignore lint/style/useNamingConvention: <as variaveis já estão nesse formato vindo do backend e do banco de dados>
    "acs_nome" : "asc",
    "idade" : "asc",
    // biome-ignore lint/style/useNamingConvention: <as variaveis já estão nesse formato vindo do backend e do banco de dados>
    "vencimento_da_coleta" : "asc",
    // biome-ignore lint/style/useNamingConvention: <as variaveis já estão nesse formato vindo do backend e do banco de dados>
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
    const tabelaDataEquipeSemExame = tabelaDataEquipe?.filter(item=>item.id_status_usuario === 12)
    return tabelaDataEquipe ? 
    <>
        <PainelBuscaAtiva
            painel="equipe"
            lista = "CITOPATOLÓGICO - PESSOAS EM DIA COM EXAME"
            lista_mixpanel="citopatologico"
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
                    labels : [...new Set(faixaEtaria.data.map(item=> item.faixa_etaria_descricao))],
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
            IDFiltros={IdFiltrosCito}
            rotulosfiltros={rotulosfiltrosCito}    
            IDFiltrosOrdenacao={IdFiltrosOrdenacaoCito}
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
            propAgrupamentoImpressao = "acs_nome"
            propOrdenacaoImpressao = "acs_nome"
            propImpressaoSemPersonalizacao= "acs_nome"
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
