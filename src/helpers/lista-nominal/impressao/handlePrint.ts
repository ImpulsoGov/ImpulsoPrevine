import { print } from './print';
import { colunasImpressaoHipertensaoAPS } from "@helpers/colunasImpressaoHipertensao";
import { labelsModalImpressaoAPS } from "@helpers/labelsModalImpressao";
import {
	larguraColunasHipertensaoPaisagem,
	larguraColunasHipertensaoRetrato,
} from "@helpers/larguraColunasHipertensao";

export const NUMERO_DE_FILTROS_PARA_IMPRESSAO_SEM_PERSONALIZACAO = 1;
export const VALORES_AGRUPAMENTO_IMPRESSAO = { sim: "sim", nao: "não" };

export const printWithoutModalWindow = (tableData,print) => {
    print(tableData, {
        agrupamento: VALORES_AGRUPAMENTO_IMPRESSAO.nao,
        separacaoGrupoPorFolha: false,
        ordenacao: false,
    },true);   
}

export const searchFilterByProperty = (filtros, propriedade)=> 
    filtros.filter(item => item.hasOwnProperty(propriedade));

export const handlePrint = (
    chavesFiltros, 
    propImpressaoSemPersonalizacao, 
    setShowModalImpressao,
    tableData
) => {
    const filtros = searchFilterByProperty(chavesFiltros, propImpressaoSemPersonalizacao);
    const abrirModal = filtros.length === NUMERO_DE_FILTROS_PARA_IMPRESSAO_SEM_PERSONALIZACAO;
    abrirModal ? printWithoutModalWindow(tableData,print) : setShowModalImpressao(true)
}
