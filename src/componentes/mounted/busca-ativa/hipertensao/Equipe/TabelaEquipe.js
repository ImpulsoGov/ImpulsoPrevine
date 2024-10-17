import { 
    PainelBuscaAtiva , 
    Spinner, 
} from "@impulsogov/design-system";
import { colunasHipertensaoEquipe } from "@helpers/colunasHipertensao";
import mixpanel from 'mixpanel-browser';
import { larguraColunasHipertensaoEquipePaisagem, larguraColunasHipertensaoEquipeRetrato } from "@helpers/larguraColunasHipertensao";
import { colunasImpressaoHipertensaoEquipe } from "@helpers/colunasImpressaoHipertensao";
import { labelsModalImpressaoEquipe } from "@helpers/labelsModalImpressao";


const datefiltrosHipertensao = [
    "dt_afericao_pressao_mais_recente",
    "dt_consulta_mais_recente",
    ]
  const rotulosfiltrosHipertensao = [
    "NOME (A - Z)",
    "PROFISSIONAL RESPONSÁVEL (A - Z)",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "DATA DA AFERIÇÃO DE PA (DA MAIS ANTIGA PARA A MAIS RECENTE)",
    "PRAZO PARA PRÓXIMA CONSULTA (DO MAIS PRÓXIMO AO MAIS DISTANTE)",
    "PRAZO PARA PRÓXIMA AFERIÇÃO DE PA (DO MAIS PRÓXIMO AO MAIS DISTANTE)",
    "IDADE (CRESCENTE)",
    ]
  const IDFiltrosHipertensao = {
    "NOME (A - Z)": "cidadao_nome",
    "PROFISSIONAL RESPONSÁVEL (A - Z)": "acs_nome_cadastro",
    "DATA DA CONSULTA (DA MAIS ANTIGA PARA A MAIS RECENTE)" : "dt_consulta_mais_recente",
    "DATA DA AFERIÇÃO DE PA (DA MAIS ANTIGA PARA A MAIS RECENTE)": "dt_afericao_pressao_mais_recente",
    "PRAZO PARA PRÓXIMA CONSULTA (DO MAIS PRÓXIMO AO MAIS DISTANTE)": "prazo_proxima_consulta",
    "PRAZO PARA PRÓXIMA AFERIÇÃO DE PA (DO MAIS PRÓXIMO AO MAIS DISTANTE)": "prazo_proxima_afericao_pa",
    "IDADE (CRESCENTE)": "cidadao_idade",
    }
  const IDFiltrosOrdenacaoHipertensao = {
    "cidadao_nome" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_afericao_pressao_mais_recente" : "asc",
    "prazo_proxima_afericao_pa" : "asc",
    "acs_nome_cadastro" : "asc",
    "cidadao_idade": "asc",
  }


export const TabelaEquipe = ({
    tabelaData,
    setTabelaData,
    tabelaDataEquipe,
    liberarPesquisa,
    showSnackBar,
    setShowSnackBar,
})=>{ 
    const TabelaDataEquipeTratada = tabelaDataEquipe?.map(item=>({
        ...item,
        cidadao_faixa_etaria : item.cidadao_faixa_etaria == 'Menos de 17 anos' ? ' Menos de 17 anos' : item.cidadao_faixa_etaria,
        status_usuario : item.status_usuario == "Consulta e aferição de PA a fazer" ? " Consulta e aferição de PA a fazer" : item.status_usuario,
        cpf_e_identificacao_condicao: {
            cpf: item.cidadao_cpf_dt_nascimento,
            identificacao_condicao: item.identificacao_condicao_hipertensao
        },
    }))

    return tabelaDataEquipe && tabelaData ?
    <PainelBuscaAtiva
        painel="equipe"
        lista = "HIPERTENSÃO"
        lista_mixpanel = "hipertensao"
        legendaImpressao = {[
            "<b>*CPF:</b> Quando o CPF não constar no cadastro, mostraremos a data de nascimento do cidadão.",
            "<b>**PA:</b> Pressão Arterial."
        ]}
        divisorVertical ={[2,4,6]}
        largura_colunas_impressao = {{
            retrato : larguraColunasHipertensaoEquipeRetrato,
            paisagem : larguraColunasHipertensaoEquipePaisagem
        }}
        dadosFiltros={[
            {
                data: [...new Set(TabelaDataEquipeTratada.map(item => item.acs_nome_cadastro))],
                filtro: 'acs_nome_cadastro',
                rotulo: 'Filtrar por nome do Profissional Responsável'
            },
            {
                data: [...new Set(TabelaDataEquipeTratada.map(item => item.identificacao_condicao_hipertensao))],
                filtro: 'identificacao_condicao_hipertensao',
                rotulo: 'Filtrar por tipo de diagnóstico'
            },
            {
                data: [...new Set(TabelaDataEquipeTratada.map(item => item.status_usuario))],
                filtro: 'status_usuario',
                rotulo: 'Filtrar por status'
            },
            {
                data: [...new Set(TabelaDataEquipeTratada.map(item => item.cidadao_faixa_etaria))],
                filtro: 'cidadao_faixa_etaria',
                rotulo: 'Filtrar por faixa etária'
            },

        ]}
        tabela={{
            colunas: colunasHipertensaoEquipe,
            data:TabelaDataEquipeTratada
        }}
        setData={setTabelaData}    
        colunasImpressao = {colunasImpressaoHipertensaoEquipe}
        datefiltros={datefiltrosHipertensao}
        IDFiltros={IDFiltrosHipertensao}
        rotulosfiltros={rotulosfiltrosHipertensao} 
        IDFiltrosOrdenacao={IDFiltrosOrdenacaoHipertensao}   
        trackObject={mixpanel}
        atualizacao = {new Date(tabelaDataEquipe.reduce((maisRecente, objeto) => {
            const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
            const dataMaisRecenteAnterior = new Date(maisRecente);
            return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
        }, "2000-01-01")).toLocaleString('pt-BR', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        })}
        propAgrupamentoImpressao= "acs_nome_cadastro"
        propOrdenacaoImpressao= "acs_nome_cadastro"
        propImpressaoSemPersonalizacao= "acs_nome_cadastro"
        labelsModalImpressao= {labelsModalImpressaoEquipe}
        liberarPesquisa={liberarPesquisa}
        aba={null}
        sub_aba={null}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
    /> : <Spinner/>
}