import { ButtonLightSubmit, Spinner, TabelaHiperDia, TituloSmallTexto } from '@impulsogov/design-system';
import { cpf } from 'cpf-cnpj-validator';
import { getSession, signOut, useSession } from 'next-auth/react';
import { parse } from 'papaparse';
import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { CadastrarUsuarioLotes } from '../../../../helpers/RequisicoesConcorrentes';
import { colunasValidacaoDadosCadastro } from '../../../../helpers/colunasValidacaoDadosCadastro';
import { colunasValidacaoRequsicoes } from '../../../../helpers/colunasValidacaoRequisicoes';
import { redirectHomeGestaoUsuarios } from '../../../../helpers/redirectHome';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = redirectHomeGestaoUsuarios(ctx, session);

  if (redirect) return redirect;

  return {
    props: {}
  };
}
const colunas = [
  'nome',
  'equipe',
  'mail',
  'cpf',
  'telefone',
  'cargo',
  'municipio_uf',
  'perfil',
  'whatsapp'
];

const validarColunas = linha => Object.keys(linha).every(chave => colunas.includes(chave));

const validarColunaLinhas = data => data.every(linha => validarColunas(linha));

const Tratamento = async (data, setDadosReq) => {
  if (data) {
    const TratarNome = nome => nome.split(' ').map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ').trim();
    const TratarINE = equipe => equipe.toString().replace(/[^0-9]/g, '').padStart(10, '0');
    const TratarMail = mail => mail.replaceAll(' ', '');
    const TratarCPF = cpf => cpf.toString().replace(/[^0-9]/g, '');
    const TratarTelefone = num => num.toString().replace(/[^0-9]/g, '');
    const dadosTratados = data.map(usuario => {
      return {
        'nome': TratarNome(usuario.nome),
        'equipe': TratarINE(usuario.equipe),
        'mail': TratarMail(usuario.mail),
        'cpf': TratarCPF(usuario.cpf),
        'telefone': TratarTelefone(usuario.telefone),
        'cargo': usuario.cargo,
        'municipio_uf': usuario.municipio_uf,
        'perfil': usuario.perfil,
        'whatsapp': usuario.whatsapp
      };
    });
    setDadosReq(dadosTratados);
    return dadosTratados;
  }

};

const Validacao = async data => {
  const ValidarExistencia = input => input !== null || input !== undefined;
  const ValidarNome = nome => /^[A-ZÀ-ÿ'][a-zÀ-ÿ´^~']*( [A-ZÀ-ÿ'][a-zÀ-ÿ´^~']*)*$/.test(nome) && ValidarExistencia(nome);
  const ValidarINE = INE => /^\d{10}$/.test(INE) && ValidarExistencia(INE);
  const ValidarMail = mail => validator.isEmail(mail) && ValidarExistencia(mail);
  const ValidarCPF = CPF => cpf.isValid(CPF) && ValidarExistencia(CPF);
  const ValidarTelefone = numero => /^\d{11}$/.test(numero) && ValidarExistencia(numero);
  const ValidarWP = wp => (wp == '1' || wp == '0') && ValidarExistencia(wp);
  const validacoes = [];
  const validacao = true;
  data.forEach(usuario => {
    const usuario_validacoes = {
      usuario: usuario.nome,
      nome: true,
      equipe: true,
      mail: true,
      cpf: true,
      telefone: true,
      municipio_uf: true,
      cargo: true,
      whatsapp: true,
      perfil: true
    };
    const validadores = {
      nome: ValidarNome,
      equipe: ValidarINE,
      mail: ValidarMail,
      cpf: ValidarCPF,
      telefone: ValidarTelefone,
      cargo: ValidarExistencia,
      municipio_uf: ValidarExistencia,
      whatsapp: ValidarWP,
      perfil: ValidarExistencia,
    };
    Object.keys(usuario).forEach(chave => {
      if (!validadores[chave](usuario[chave])) {
        usuario_validacoes[chave] = false;
        validacao = false;
      }
    });
    validacoes.push(usuario_validacoes);
  });
  return { 'validacao': validacao, data: validacoes };
};

const TratamentoValidacao = async (setDadosValidados, setValidacaoRealizada, JSONDATA, setDadosReq) => {
  const dados_tratados = await Tratamento(JSONDATA, setDadosReq);
  const dados_validados = await Validacao(dados_tratados);
  dados_validados.validacao && setValidacaoRealizada(true);
  setDadosValidados(dados_validados);
};
const GestaoDeUsuarios = () => {
  const { data: session, status } = useSession();
  const [file, setFile] = useState();
  const [etapa, setEtapa] = useState(0);
  const [JSONDATA, setJSONDATA] = useState();
  const [dadosReq, setDadosReq] = useState();
  const [dadosValidados, setDadosValidados] = useState();
  const [res, setRes] = useState();
  const [validacaoRealizada, setValidacaoRealizada] = useState(false);
  const [ERRO_PROCESSAMENTO, SET_ERRO_PROCESSAMENTO] = useState(true);
  useEffect(() => {
    if (JSONDATA && etapa == 1 && !validacaoRealizada) TratamentoValidacao(setDadosValidados, setValidacaoRealizada, JSONDATA, setDadosReq);
  }, [etapa, JSONDATA]);
  useEffect(() => {
    etapa == 2 && CadastrarUsuarioLotes(dadosReq, setRes, SET_ERRO_PROCESSAMENTO, session.user.access_token);
    etapa == 0 && setJSONDATA() && setDadosReq();
  }, [etapa]);
  useEffect(() => {
    console.log(res);
  }, [res]);
  const handleSubmit = () => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
      };
      fileReader.readAsText(file);
      CSVtoJSON(fileReader);
      setEtapa(1);
    }
  };
  const handleOnChange = (e) => {
    const file_selected = e.target.files[0];
    if (file_selected) {
      if (file_selected.name.split('.').pop().toLowerCase() !== 'csv') {
        alert('Por favor, selecione um arquivo .csv');
        e.target.value = ''; // Limpar a seleção do arquivo
      }
    }
    setFile(file_selected);
  };
  async function CSVtoJSON(fileReader) {
    fileReader.onload = function (event) {
      const csvOutput = event.target.result;
      const jsonData = parse(csvOutput, {
        header: true, // Se o CSV tem cabeçalho
        delimiter: ',', // Delimitador CSV
        dynamicTyping: false, // Converter automaticamente tipos de dados
      });
      setJSONDATA(jsonData.data);
    };
  }
  const Etapa_zero = () => {
    return (
      <>
        <div style={ {
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1%',
          marginBottom: '30px'
        } }>
          <TituloSmallTexto
            texto='Faça o upload de um arquivo no formato .csv'
            botao={ {
              label: '',
              url: ''
            } }
          />
          <input
            type="file"
            accept=".csv"
            onChange={ handleOnChange }
          />
          <ButtonLightSubmit
            label='IMPORTAR DADOS'
            submit={ handleSubmit }
          />
        </div>
      </>
    );
  };
  const Etapa_um = () => {
    if (JSONDATA) {
      if (!validarColunaLinhas(JSONDATA)) {
        alert('Colunas inválidas');
        setEtapa(0);
      }
    }
    return (
      validacaoRealizada ?
        <div style={ {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '30px 0'
        } }>
          <TituloSmallTexto
            texto='Dados validados! click abaixo para Prosseguir para cadastro'
            botao={ {
              label: '',
              url: ''
            } }
          />
          <ButtonLightSubmit
            label='Prosseguir'
            submit={ () => setEtapa(2) }
          />

        </div> :
        dadosValidados?.data &&
        <>
          <TabelaHiperDia
            data={ dadosValidados.data }
            colunas={ colunasValidacaoDadosCadastro }
          />
          <div style={ { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' } }>
            <ButtonLightSubmit
              label='VOLTAR'
              submit={ () => setEtapa(0) }
            />
          </div>
        </>

    );
  };
  const Etapa_dois = () => {
    return (
      <>
        {
          !res ?
            <>
              <div style={ { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
                <TituloSmallTexto
                  texto='Enviando Requisições de cadastro...'
                  botao={ {
                    label: '',
                    url: ''
                  } }
                />
              </div>
              <Spinner />
            </> :
            ERRO_PROCESSAMENTO ?
              <>
                <TabelaHiperDia
                  data={ res }
                  colunas={ colunasValidacaoRequsicoes }
                />
                <div style={ { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' } }>
                  <ButtonLightSubmit
                    label='VOLTAR'
                    submit={ () => {
                      setEtapa(0);
                    } }
                  />
                </div>
              </> :
              <>
                <TituloSmallTexto
                  texto='Requisições processadas com sucesso'
                  botao={ {
                    label: '',
                    url: ''
                  } }
                />
              </>
        }
      </>
    );
  };
  const etapas = {
    0: Etapa_zero(),
    1: Etapa_um(),
    2: Etapa_dois()
  };
  return session?.user.perfis.includes(2) ? etapas[etapa] || null : signOut();
};

export default GestaoDeUsuarios;
