'use client'
import dynamic from 'next/dynamic';

const ButtonLightSubmit = dynamic(() => import('@impulsogov/design-system').then(mod => mod.ButtonLightSubmit));
const Spinner = dynamic(() => import('@impulsogov/design-system').then(mod => mod.Spinner));
const TabelaHiperDia = dynamic(() => import('@impulsogov/design-system').then(mod => mod.TabelaHiperDia));
const TituloSmallTexto = dynamic(() => import('@impulsogov/design-system').then(mod => mod.TituloSmallTexto));

import { signOut, useSession } from 'next-auth/react';
import { parse } from 'papaparse';
import { useEffect, useState } from 'react';
import { CadastrarUsuarioLotes } from '@helpers/RequisicoesConcorrentes';
import { colunasValidacaoDadosCadastro } from '@helpers/colunasValidacaoDadosCadastro';
import { colunasValidacaoRequsicoes } from '@helpers/colunasValidacaoRequisicoes';
import { BuscarIdSusPorNome, Tratamento, Validacao } from '@utils/cadastroUsuarios';

const colunas = [
	"nome",
	"equipe",
	"mail",
	"cpf",
	"telefone",
	"cargo",
	"municipio_uf",
	"perfil",
	"whatsapp",
];

const validarColunas = (linha) =>
	Object.keys(linha).every((chave) => colunas.includes(chave));

const validarColunaLinhas = (data) =>
	data.every((linha) => validarColunas(linha));

const TratamentoValidacao = async (
	setDadosValidados,
	setValidacaoRealizada,
	jsondata,
	setDadosReq,
) => {
	const dadosTratados = await Tratamento(jsondata);
	const dadosValidados = await Validacao(dadosTratados);

	if (dadosValidados.validacao) {
		setValidacaoRealizada(true);

		const dadosTratadosComIdSus = dadosTratados.map((dado) => {
			return {
				...dado,
				municipio_id_sus: BuscarIdSusPorNome(dado.municipio_uf),
			};
		});

		setDadosReq(dadosTratadosComIdSus);
	}

	setDadosValidados(dadosValidados);
};
const GestaoDeUsuarios = () => {
	const { data: session } = useSession();
	const [file, setFile] = useState();
	const [etapa, setEtapa] = useState(0);
	const [jsondata, setJSONDATA] = useState();
	const [dadosReq, setDadosReq] = useState();
	const [dadosValidados, setDadosValidados] = useState();
	const [res, setRes] = useState();
	const [validacaoRealizada, setValidacaoRealizada] = useState(false);
	const [erroProcessamento, setErroProcessamento] = useState(true);
	useEffect(() => {
		if (jsondata && etapa === 1 && !validacaoRealizada)
			TratamentoValidacao(
				setDadosValidados,
				setValidacaoRealizada,
				jsondata,
				setDadosReq,
			);
	}, [etapa, jsondata]);
	useEffect(() => {
		etapa === 2 &&
			CadastrarUsuarioLotes(
				dadosReq,
				setRes,
				setErroProcessamento,
				session.user.access_token,
			);
		etapa === 0 && setJSONDATA() && setDadosReq();
	}, [etapa]);
	const handleSubmit = () => {
		const fileReader = new FileReader();
		if (file) {
			// fileReader.onload = function (event) {
			//   const csvOutput = event.target.result;
			// };
			fileReader.readAsText(file);
			CSVtoJSON(fileReader);
			setEtapa(1);
		}
	};

	const handleOnChange = (e) => {
		const fileSelected = e.target.files[0];
		if (fileSelected) {
			if (fileSelected.name.split(".").pop().toLowerCase() !== "csv") {
				alert("Por favor, selecione um arquivo .csv");
				e.target.value = ""; // Limpar a seleção do arquivo
			}
		}
		setFile(fileSelected);
	};
	async function CSVtoJSON(fileReader) {
		fileReader.onload = (event) => {
			const csvOutput = event.target.result;
			const jsonData = parse(csvOutput, {
				header: true, // Se o CSV tem cabeçalho
				delimiter: ",", // Delimitador CSV
				dynamicTyping: false, // Converter automaticamente tipos de dados
			});
			setJSONDATA(jsonData.data);
		};
	}

	const etapaZero = () => {
		return (
			<>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "20px",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "1%",
						marginBottom: "30px",
					}}
				>
					<TituloSmallTexto
						texto="Faça o upload de um arquivo no formato .csv"
						botao={{
							label: "",
							url: "",
						}}
					/>
					<input type="file" accept=".csv" onChange={handleOnChange} />
					<ButtonLightSubmit label="IMPORTAR DADOS" submit={handleSubmit} />
				</div>
			</>
		);
	};
	const etapaUm = () => {
		if (jsondata) {
			if (!validarColunaLinhas(jsondata)) {
				alert("Colunas inválidas");
				setEtapa(0);
				setJSONDATA();
			}
		}
		return validacaoRealizada ? (
			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					margin: "30px 0",
				}}
			>
				<TituloSmallTexto
					texto="Dados validados! click abaixo para Prosseguir para cadastro"
					botao={{
						label: "",
						url: "",
					}}
				/>
				<ButtonLightSubmit label="Prosseguir" submit={() => setEtapa(2)} />
			</div>
		) : (
			dadosValidados?.data && (
				<>
					<TabelaHiperDia
						data={dadosValidados.data}
						colunas={colunasValidacaoDadosCadastro}
					/>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: "30px",
						}}
					>
						<ButtonLightSubmit label="VOLTAR" submit={() => setEtapa(0)} />
					</div>
				</>
			)
		);
	};
	const etapaDois = () => {
		return (
			<>
				{!res ? (
					<>
						<div
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<TituloSmallTexto
								texto="Enviando Requisições de cadastro..."
								botao={{
									label: "",
									url: "",
								}}
							/>
						</div>
						<Spinner />
					</>
				) : erroProcessamento ? (
					<>
						<TabelaHiperDia data={res} colunas={colunasValidacaoRequsicoes} />
						<div
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: "30px",
							}}
						>
							<ButtonLightSubmit
								label="VOLTAR"
								submit={() => {
									setEtapa(0);
									setErroProcessamento(false);
									setRes();
									setDadosReq();
									setDadosValidados();
									setValidacaoRealizada(false);
									setJSONDATA();
								}}
							/>
						</div>
					</>
				) : (
					<>
						<TituloSmallTexto
							texto="Requisições processadas com sucesso"
							botao={{
								label: "",
								url: "",
							}}
						/>
					</>
				)}
			</>
		);
	};
	const etapas = {
		0: etapaZero(),
		1: etapaUm(),
		2: etapaDois(),
	};

	if (session) {
		return session?.user.perfis.includes(2) ? etapas[etapa] || null : signOut();
	}
};

export default GestaoDeUsuarios;
