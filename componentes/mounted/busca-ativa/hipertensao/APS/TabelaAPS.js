import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasHipertensao } from "../../../../../helpers/colunasHipertensao";
import mixpanel from 'mixpanel-browser';


const datefiltrosHipertensao = [
    "dt_afericao_pressao_mais_recente",
    "dt_consulta_mais_recente",
    ]
  const rotulosfiltrosHipertensao = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "DATA DA AFERIÇÃO DE PA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    ]
  const IDFiltrosHipertensao = {
    "NOMES DE A-Z": "cidadao_nome",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_consulta_mais_recente",
    "DATA DA AFERIÇÃO DE PA (DA MAIS ANTIGA PARA A MAIS RECENTE)": "dt_afericao_pressao_mais_recente",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome_cadastro"
    }
  const IDFiltrosOrdenacaoHipertensao = {
    "cidadao_nome" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_afericao_pressao_mais_recente" : "asc",
    "prazo_proxima_afericao_pa" : "asc",
    "acs_nome_cadastro" : "asc",
  }


export const TabelaAPS = ({
    tabelaData,
    tabelaDataAPS,
    Impressao,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
})=> {
    const TabelaAPSTratada = tabelaDataAPS?.map(item=>({
        ...item,
        cidadao_faixa_etaria : item.cidadao_faixa_etaria == 'Menos de 17 anos' ? ' Menos de 17 anos' : item.cidadao_faixa_etaria,
        status_usuario : item.status_usuario == "Consulta e aferição de PA em dia" ? " Consulta e aferição de PA em dia" : item.status_usuario
    }))

    return tabelaDataAPS && tabelaData ? <PainelBuscaAtiva
    onPrintClick={Impressao}
    dadosFiltros={[
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.equipe_ine_cadastro))],
            filtro: 'equipe_ine_cadastro',
            rotulo: 'Filtrar por INE da equipe'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.equipe_nome_cadastro))],
            filtro: 'equipe_nome_cadastro',
            rotulo: 'Filtrar por nome da equipe'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.acs_nome_cadastro))],
            filtro: 'acs_nome_cadastro',
            rotulo: 'Filtrar por nome do Profissional Responsável'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.identificacao_condicao_hipertensao))],
            filtro: 'identificacao_condicao_hipertensao',
            rotulo: 'Filtrar por tipo de diagnóstico'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.status_usuario))],
            filtro: 'status_usuario',
            rotulo: 'Filtrar por status'
        },
        {
            data: [...new Set(TabelaAPSTratada.map(item => item.cidadao_faixa_etaria))],
            filtro: 'cidadao_faixa_etaria',
            rotulo: 'Filtrar por faixa etária'
        },
    ]}
    painel="hipertensao"
    tabela={{
    colunas: colunasHipertensao,
    data:TabelaAPSTratada
    }}
    data={tabelaData}
    setData={setTabelaData}
    datefiltros={datefiltrosHipertensao}
    IDFiltros={IDFiltrosHipertensao}
    rotulosfiltros={rotulosfiltrosHipertensao}    
    IDFiltrosOrdenacao={IDFiltrosOrdenacaoHipertensao}  
    atualizacao = {new Date(tabelaDataAPS.reduce((maisRecente, objeto) => {
    const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
    const dataMaisRecenteAnterior = new Date(maisRecente);
    return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
    }, "2000-01-01")).toLocaleString('pt-BR', { 
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
    })}
    trackObject={mixpanel}
    lista="hipertensao"
    aba={null}
    sub_aba={null}
    showSnackBar={showSnackBar}
    setShowSnackBar={setShowSnackBar}
    setFiltros_aplicados={setFiltros_aplicados}  
    /> : <Spinner/>
}