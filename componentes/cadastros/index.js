import { v1 as uuidv1 } from 'uuid';
import React, { useState, useEffect, useContext } from 'react';
import { TituloSmallTexto } from "@impulsogov/design-system"
import { CadastrosEquipeContagem } from '../../services/capitacao_ponderada_contagem_equipes'
import { CadastrosEquipes } from '../../services/capitacao_ponderada_cadastros_por_equipe'
import { ValidacaoProducao } from '../../services/capitacao_ponderada_validacao_producao'
import { ValidacaoProducaoAplicada } from '../../services/capitacao_ponderada_validacao_producao_aplicada'
import GraficoSuasEquipes from "/componentes/GraficoSuasEquipes/GraficoSuasEquipes"
import GraficoEvolucaoEquipe from "/componentes/GraficoEvolucaoEquipe/GraficoEvolucaoEquipe"
import GraficoFichaProducao from "/componentes/GraficoFichaProducao/GraficoFichaProducao"
import TabelaDesempenhoEquipes from "/componentes/TabelaDesempenhoEquipes/TabelaDesempenhoEquipes";
import TabelaCadastroPreliminar from "/componentes/TabelaCadastroPreliminar/TabelaCadastroPreliminar";
import TabelaFichasCadastro from "/componentes/TabelaFichasCadastro/TabelaFichasCadastro";
import Context from "../../utils/Context";

const Cadastros = ({
  municipio,
}) => {
  const [indicadoresData, setIndicadoresData] = useState([]);
  const [cidade, setCidade] = useContext(Context);
  useEffect(() => { CadastrosEquipeContagem(cidade).then((result) => setIndicadoresData(result)) }, [cidade]);

  const [CaptacaoEvolucao, setCaptacaoEvolucao] = useState([]);
  useEffect(() => { CadastrosEquipes(cidade).then((result) => setCaptacaoEvolucao(result)) }, [cidade]);

  const [CapValidacaoProducao, setCapValidacaoProducao] = useState([]);
  useEffect(() => { ValidacaoProducao(cidade).then((result) => setCapValidacaoProducao(result)) }, [cidade]);

  const [CapValidacaoProducaoAplicada, setCapValidacaoProducaoAplicada] = useState([]);
  useEffect(() => { ValidacaoProducaoAplicada(cidade).then((result) => setCapValidacaoProducaoAplicada(result)) }, [cidade]);

  const quantidadeCadastrosPreliminaresInvalidos = CapValidacaoProducao.reduce((total, item) => {
    if (item.validacao_nome === "Preliminar>Reprovado(PROF)") {
      return total + item.validacao_quantidade;
    }
    return total;
  }, 0);


  return (
    <div style={{ margin: "0px 80px" }}>

      <TituloSmallTexto
        key="textofixo"
        imagem={{
          posicao: null,
          url: ''
        }}
        texto="Veja abaixo o número total de equipes que seu município tem cadastradas, desse número, quantas foram homologadas ou não e, das homologadas, quantas são válidas e quantas não são válidas."
        titulo="<b> Suas equipes </b>"
        botao={{
          label: '',
          url: ''
        }}
      />
      <GraficoSuasEquipes
        GrafCapitacao={indicadoresData}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""

        titulo="<b>Evolução dos cadastros<b/>"
      />
      <GraficoEvolucaoEquipe
        GrafEvolucao={CaptacaoEvolucao}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto="<p style='color:#606E78'> O parâmetro municipal mais recente, mostra o valor utilizado como cadastro potencial para o repasse no pilar de capitação ponderada segundo a <a href='https://sisab.saude.gov.br/resource/file/nota_tecnica_relatorio_cadastro_220509.pdf' target='_blank' rel='noreferrer nofollow noopener'><u> Nota Técnica Explicativa – Relatório de Cadastro Vinculado.</u></a>  "
        titulo=""
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto=" Entenda aqui, como suas equipes estão desempenhando: "
        titulo="<b>Desempenho das equipes</b>" tooltip=""
      />

      <TabelaDesempenhoEquipes
        TabDesempenhos={CaptacaoEvolucao}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo="<b><u>LEGENDA</u></b>"
        texto="<p style='color:#606E78'> ✔️Equipes Válidas  ⚠️Equipes Homologadas  ❌Equipes Cadastradas"
        titulo=""
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto="Seus cadastros podem não estar contabilizando por erros no registro. Confira aqui sua evolução nas validações das fichas de cadastro e descubra como melhorar. "
        titulo="<b>Validação das fichas de produção de cadastro<b/>"
      />

      <GraficoFichaProducao
        GrafFicha={CapValidacaoProducaoAplicada}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto="<p style='color:#606E78'> Os dados desse gráfico foram retirados do <a href='https://sisab.saude.gov.br/paginas/acessoRestrito/relatorio/federal/envio/RelValidacao.xhtml' target='_blank' rel='noreferrer nofollow noopener'><u> Relatório de Validação do SISAB </u></a> para as fichas de Cadastro Individual, Fichas de Atendimento Individual (FAI), Ficha de Visita Domiciliar (FVD) e Ficha de Procedimento (FP), que segundo a <a href='https://sisab.saude.gov.br/resource/file/nota_tecnica_relatorio_cadastro_220509.pdf' target='_blank' rel='noreferrer nofollow noopener'><u> Nota Técnica Explicativa – Relatório de Cadastro Vinculado </u></a> são as fichas que são contabilizadas para capitação ponderada."
        titulo=""
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto=""
        titulo="<b>Aplicações de fichas de cadastro<b/>"
      />

      <TabelaFichasCadastro
        TabFichas={CapValidacaoProducaoAplicada}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo=""
        texto={`Você tem ${quantidadeCadastrosPreliminaresInvalidos} cadastros reprovados em análise preliminar. Atualize os cadastros para que sejam contabilizados, mas <b> fique atento aos prazos de envio conforme o calendário</b> do SISAB:<br> <br><u>- Validação da produção na competência</u> - Envio deve ser realizado até o décimo dia útil posterior ao fechamento da competência</br> <u>- Validação da produção para o quadrimestre do Previne Brasil</u> - Envio deve ser realizado até o décimo dia útil posterior ao fechamento da competência que encerra o quadrimestre (abril, agosto ou dezembro)</br> <br>Caso as condições listadas acima não sejam cumpridas, o prazo máximo para envio é de 120 dias após o fechamento da competência, nesse cenário a produção enviada será contabilizada somente para série histórica. Envios realizados fora da janela de 120 dias serão descartados para uso em qualquer finalidade.</br><br>Envie as instruções para os seus estabelecimentos de saúde!</br>`}
        titulo="<b>Cadastros Preliminares Inválidos<b/>"
      />

      <TabelaCadastroPreliminar
        TabCadPreliminar={CapValidacaoProducao}
      />

      <TituloSmallTexto
        botao={{
          label: '',
          url: ''
        }}
        imagem={{
          posicao: null,
          url: ''
        }}
        supertitulo="<p style='color:#606E78'>Referência: <br> <a href='https://www.in.gov.br/en/web/dou/-/portaria-n-4-de-28-de-janeiro-de-2021-301404483' target='_blank' rel='noreferrer nofollow noopener'><u> https://www.in.gov.br/en/web/dou/-/portaria-n-4-de-28-de-janeiro-de-2021-301404483 </u></a>"
        texto=""
        titulo=""
      />

      <div style={{ paddingBottom: '105px' }}></div>
    </div>
  )
}

export default Cadastros;