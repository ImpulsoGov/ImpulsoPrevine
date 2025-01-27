import faixaEtaria from "@data/faixaEtaria.json";
import { PainelBuscaAtiva, Spinner } from "@impulsogov/design-system";
import { status_usuario_descricao } from "../../../../../data/status_usuario_descricao";
import { colunasCitoAPS } from "../../../../../helpers/colunasCito";
import { colunasImpressaoCitoAPS } from "../../../../../helpers/colunasImpressaoCito";
import { labelsModalImpressaoAPS } from "../../../../../helpers/labelsModalImpressao";
import {
	larguraColunasCitoPaisagemAPS,
	larguraColunasCitoRetratoAPS,
} from "../../../../../helpers/larguraColunasCito";

const datefiltrosCito = ["vencimento_da_coleta"];
const rotulosfiltrosCito = [
	"NOMES DE A-Z",
	"NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
	"VENCIMENTO DA COLETA MAIS ANTIGO",
	"IDADE MENOR-MAIOR",
];
const IDFiltrosCito = {
	"NOMES DE A-Z": "paciente_nome",
	"NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome",
	"VENCIMENTO DA COLETA MAIS ANTIGO": "vencimento_da_coleta",
	"IDADE MENOR-MAIOR": "idade",
};
const IDFiltrosOrdenacaoCito = {
	paciente_nome: "asc",
	acs_nome: "asc",
	idade: "asc",
	vencimento_da_coleta: "asc",
	prazo_proxima_coleta: "asc",
};

export const TabelaAPSSemExame = ({
	tabelaDataAPS,
	tabelaData,
	setTabelaData,
	mixpanel,
	aba,
	sub_aba,
	showSnackBar,
	setShowSnackBar,
	setFiltros_aplicados,
	liberarPesquisa,
}) => {
	const tabelaDataAPSSemExame = tabelaDataAPS
		?.filter((item) => item.id_status_usuario !== 12)
		.map((item) => ({
			...item,
			equipe_nome_e_ine: `${item.equipe_nome} - ${item.equipe_ine}`,
		}));
	return tabelaDataAPS ? (
		<PainelBuscaAtiva
			liberarPesquisa={liberarPesquisa}
			lista_mixpanel="citopatologico"
			dadosFiltros={[
				{
					data: [
						...new Set(tabelaDataAPSSemExame.map((item) => item.acs_nome)),
					],
					filtro: "acs_nome",
					rotulo: "Filtrar por nome do Profissional Responsável",
				},
				{
					data: [
						...new Set(
							tabelaDataAPSSemExame.map((item) =>
								item.id_status_usuario.toString(),
							),
						),
					],
					labels: [
						...new Set(
							status_usuario_descricao.map(
								(item) => item.status_usuario_descricao,
							),
						),
					],
					filtro: "id_status_usuario",
					rotulo: "Filtrar por status",
				},
				{
					data: [
						...new Set(
							tabelaDataAPSSemExame.map((item) =>
								item.id_faixa_etaria.toString(),
							),
						),
					],
					labels: [
						...new Set(
							faixaEtaria.data.map((item) => item.faixa_etaria_descricao),
						),
					],
					filtro: "id_faixa_etaria",
					rotulo: "Filtrar por faixa etária",
				},
				{
					data: [
						...new Set(
							tabelaDataAPSSemExame.map((item) => item.equipe_nome_e_ine),
						),
					],
					filtro: "equipe_nome_e_ine",
					rotulo: "Filtrar por nome e INE da equipe",
				},
			]}
			tabela={{
				colunas: colunasCitoAPS,
				data: tabelaDataAPSSemExame,
			}}
			data={tabelaData}
			setData={setTabelaData}
			datefiltros={datefiltrosCito}
			IDFiltros={IDFiltrosCito}
			rotulosfiltros={rotulosfiltrosCito}
			IDFiltrosOrdenacao={IDFiltrosOrdenacaoCito}
			atualizacao={new Date(
				tabelaDataAPSSemExame.reduce((maisRecente, objeto) => {
					const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
					const dataMaisRecenteAnterior = new Date(maisRecente);
					return dataAtual > dataMaisRecenteAnterior
						? objeto.dt_registro_producao_mais_recente
						: maisRecente;
				}, "2000-01-01"),
			).toLocaleString("pt-BR", {
				timeZone: "UTC",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})}
			trackObject={mixpanel}
			painel="aps"
			lista="<span>CITOPATOLÓGICO<span/><span style='display: block;'>PESSOAS COM EXAME A SER REALIZADO<span/>"
			divisorVertical={[1, 4]}
			largura_colunas_impressao={{
				paisagem: larguraColunasCitoPaisagemAPS,
				retrato: larguraColunasCitoRetratoAPS,
			}}
			colunasImpressao={colunasImpressaoCitoAPS}
			listas_auxiliares={{
				status_usuario_descricao: status_usuario_descricao,
			}}
			propAgrupamentoImpressao="equipe_nome"
			propImpressaoSemPersonalizacao="equipe_nome_e_ine"
			propOrdenacaoImpressao="acs_nome"
			labelsModalImpressao={labelsModalImpressaoAPS}
			aba={aba}
			sub_aba={sub_aba}
			showSnackBar={showSnackBar}
			setShowSnackBar={setShowSnackBar}
			setFiltros_aplicados={setFiltros_aplicados}
		/>
	) : (
		<Spinner />
	);
};
