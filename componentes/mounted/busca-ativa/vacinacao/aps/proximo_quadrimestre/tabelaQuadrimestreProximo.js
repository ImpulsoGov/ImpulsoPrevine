import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasVacinacaoAPS } from "../../../../../../helpers/colunasVacinacao";

const datefiltrosVacinacao = []
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
    "NOMES DE A-Z" : "asc",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "asc",
    "IDADE DA CRIANÇA - DECRESCENTE" : "desc",
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
            data: [...new Set(tabelaDataAPSVacinacao.map(item => item.id_status_penta))],
            filtro: 'id_status_polio',
            rotulo: 'Filtrar por status polio'
        },
        {
            data: [...new Set(tabelaDataAPSVacinacao.map(item => item.id_status_penta))],
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