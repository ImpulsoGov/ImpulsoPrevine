import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasVacinacaoAPS } from "../../../../../../helpers/colunasVacinacao";
import vacinacao_status_penta  from "../../../../../../data/vacinacao_status_penta.json" assert { type: 'json' };
import vacinacao_status_polio  from "../../../../../../data/vacinacao_status_polio.json" assert { type: 'json' };

const datefiltrosVacinacao = []
const IntFiltros = [
    "cidadao_idade_meses",
]
const rotulosfiltrosVacinacao = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "IDADE DA CRIANÇA - DECRESCENTE",
]
const IDFiltrosVacinacao = {
    "NOMES DE A-Z" : "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome",
    "IDADE DA CRIANÇA - DECRESCENTE" : "cidadao_idade_meses",
}   
const IDFiltrosOrdenacaoVacinacao = {
    "cidadao_nome" : "asc",
    "acs_nome" : "asc",
    "cidadao_idade_meses" : "desc",
}

const TabelaAPSQuadrimestreProximo = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData
}) => {
    const tabelaDataAPSVacinacao = tabelaDataAPS?.filter(item=>item.id_status_quadrimestre== 2)
    return tabelaDataAPS ? <PainelBuscaAtiva
    key="tabelaDataAPSVacinacao"
    dadosFiltros={[
        {
            data: [...new Set(tabelaDataAPSVacinacao.map(item => item.equipe_nome))],
            filtro: 'equipe_nome',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(tabelaDataAPSVacinacao.map(item => item.acs_nome))],
            filtro: 'acs_nome',
            rotulo: 'Filtrar por profissional responsável'
        },
        {
            data: [...new Set(tabelaDataAPSVacinacao.map(item => item.id_status_polio))],
            labels : vacinacao_status_polio.data.reduce((obj, item) => {
                obj[item.id_status_polio] = item.status_descricao;
                return obj;
            }, {}),
            filtro: 'id_status_polio',
            rotulo: 'Filtrar por status polio'
        },
        {
            data: [...new Set(tabelaDataAPSVacinacao.map(item => item.id_status_penta))],
            labels : vacinacao_status_penta.data.reduce((obj, item) => {
                obj[item.id_status_penta] = item.status_descricao;
                return obj;
            }, {}),
            filtro: 'id_status_penta',
            rotulo: 'Filtrar por status penta'
        },

    ]}
    painel="vacinacao"
    tabela={{
    colunas: colunasVacinacaoAPS,
    data:tabelaDataAPSVacinacao
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosVacinacao}
    IntFiltros={IntFiltros}
    IDFiltros={IDFiltrosVacinacao}
    rotulosfiltros={rotulosfiltrosVacinacao}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoVacinacao}
    atualizacao = {new Date(tabelaDataAPSVacinacao.reduce((maisRecente, objeto) => {
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
export { TabelaAPSQuadrimestreProximo }