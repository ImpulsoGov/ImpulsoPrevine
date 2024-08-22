import { 
    PainelBuscaAtiva , 
    Spinner, 
    ScoreCardGrid,
} from "@impulsogov/design-system";
import { colunasVacinacaoAPS } from "../../../../../../helpers/colunasVacinacao";
import vacinacao_status_penta  from "../../../../../../data/vacinacao_status_penta.json" assert { type: 'json' };
import vacinacao_status_polio  from "../../../../../../data/vacinacao_status_polio.json" assert { type: 'json' };
import mixpanel from 'mixpanel-browser';
import { formatarQuadrimestres, obterDadosProximosQuadrimestres } from "../../../../../../utils/quadrimestre";
import { larguraColunasVacinacaoPaisagem, larguraColunasVacinacaoRetrato } from "../../../../../../helpers/larguraColunasVacinacao";
import { colunasImpressaoVacinacaoAPS } from "../../../../../../helpers/colunasImpressaoVacinacao";
import { labelsModalImpressaoAPS } from "../../../../../../helpers/labelsModalImpressaoAPS";

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

const TabelaAPSQuadrimestreFuturo = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    liberarPesquisa,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
    aba,
    subAba,
}) => {
    const tabelaDataAPSVacinacao = tabelaDataAPS?.filter(item=>item.id_status_quadrimestre== 3)
        .map(item => ({
            ...item,
            equipe_nome_e_ine: `${item.equipe_nome} - ${item.equipe_ine}`,
            datas_doses_polio: [
                `1ª DOSE: ${item.data_ou_prazo_1dose_polio ?? ""}`,
                `2ª DOSE: ${item.data_ou_prazo_2dose_polio ?? ""}`,
                `3ª DOSE: ${item.data_ou_prazo_3dose_polio ?? ""}`,
            ],
            datas_doses_penta: [
                `1ª DOSE: ${item.data_ou_prazo_1dose_penta ?? ""}`,
                `2ª DOSE: ${item.data_ou_prazo_2dose_penta ?? ""}`,
                `3ª DOSE: ${item.data_ou_prazo_3dose_penta ?? ""}`,
            ],
        }))
    const codigosPolio = [10,20,30,40]
    if(tabelaDataAPSVacinacao[0].id_status_polio) tabelaDataAPSVacinacao.forEach(item => item.id_status_polio = codigosPolio[Number(item.id_status_polio)-1] ? codigosPolio[Number(item.id_status_polio)-1] : item.id_status_polio)

    const dataAtual = Date.now();
    const dadosProximosQuadris = dataAtual
        ? obterDadosProximosQuadrimestres(dataAtual)
        : [];
    const proximosQuadrisFormatados = formatarQuadrimestres(dadosProximosQuadris.slice(-2), ' + ');

    return tabelaDataAPS ? 
    <>
        <h2 style={{
            marginTop : '45px',
            marginLeft : '120px',
            color: "#1F1F1F",
            fontSize: "22px",
            fontFamily: "Inter",
            fontWeight: 500,
            lineHeight: "130%",
        }}>
            {proximosQuadrisFormatados && `${proximosQuadrisFormatados} -`} Crianças no período de vacinação
        </h2>
        <ScoreCardGrid
            valores={[
                {
                    descricao: 'Total de crianças',
                    valor: tabelaDataAPSVacinacao.length
                },
                {
                    descricao: 'Crianças com os dois esquemas vacinais completos',
                    valor: tabelaDataAPSVacinacao.reduce((acumulador,item)=>{ 
                    return (item.id_status_polio == 10 && item.id_status_penta == 1) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
                {
                    descricao: 'Crianças com um ou os dois esquemas vacinais em andamento',
                    valor: tabelaDataAPSVacinacao.length - tabelaDataAPSVacinacao.reduce((acumulador,item)=>{ 
                    return (
                        (item.id_status_polio == 10 && item.id_status_penta == 1) || 
                        (item.id_status_polio == 30 || item.id_status_penta == 3)) || 
                        (item.id_status_polio == 40 && item.id_status_penta == 4) ?
                    acumulador + 1 : acumulador;
                    },0)
                    },
                {
                    descricao: 'Crianças com pelo menos uma dose em atraso',
                    valor: tabelaDataAPSVacinacao.reduce((acumulador,item)=>{ 
                    return (item.id_status_polio == 30 || item.id_status_penta == 3) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
                {
                    descricao: 'Crianças com os dois esquemas vacinais não iniciados',
                    valor: tabelaDataAPSVacinacao.reduce((acumulador,item)=>{ 
                    return (item.id_status_polio == 40 && item.id_status_penta == 4) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
            ]}
        />
        <PainelBuscaAtiva
            liberarPesquisa={liberarPesquisa}
            lista_mixpanel="vacinacao"
            aba={aba}
            sub_aba={subAba}
            key="tabelaDataAPSVacinacao"
            dadosFiltros={[
                {
                    data: [...new Set(tabelaDataAPSVacinacao.map(item => item.equipe_nome_e_ine))],
                    filtro: 'equipe_nome_e_ine',
                    rotulo: 'Filtrar por nome e INE da equipe'
                },
                {
                    data: [...new Set(tabelaDataAPSVacinacao.map(item => item.acs_nome))],
                    filtro: 'acs_nome',
                    rotulo: 'Filtrar por profissional responsável'
                },
                {
                    data: [...new Set(tabelaDataAPSVacinacao.map(item => item.id_status_polio.toString()))],
                    labels : vacinacao_status_polio.dataTabela.reduce((obj, item) => {
                        obj[item.id_status_polio] = item.status_descricao;
                        return obj;
                    }, {}),
                    filtro: 'id_status_polio',
                    rotulo: 'Filtrar por status polio'
                },
                {
                    data: [...new Set(tabelaDataAPSVacinacao.map(item => item.id_status_penta.toString()))],
                    labels : vacinacao_status_penta.data.reduce((obj, item) => {
                        obj[item.id_status_penta] = item.status_descricao;
                        return obj;
                    }, {}),
                    filtro: 'id_status_penta',
                    rotulo: 'Filtrar por status penta'
                },
                ]}
            painel="aps"
            lista="VACINAÇÃO: POLIOMIELITE E PENTAVALENTE"
            divisorVertical={[2,4,6]}
            largura_colunas_impressao={{
                retrato: larguraColunasVacinacaoRetrato,
                paisagem: larguraColunasVacinacaoPaisagem,
            }}
            listas_auxiliares={{}}
            colunasImpressao={colunasImpressaoVacinacaoAPS}
            propAgrupamentoImpressao="equipe_nome"
            propImpressaoSemPersonalizacao="equipe_nome_e_ine"
            propOrdenacaoImpressao="acs_nome"
            labelsModalImpressao={labelsModalImpressaoAPS}
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
            trackObject={mixpanel}
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
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados} 
        />
    </> : <Spinner/>
}
export { TabelaAPSQuadrimestreFuturo }
