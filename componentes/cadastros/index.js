import { v1 as uuidv1 } from 'uuid';
import { GraficoInfo, Grid12Col, TituloSmallTexto } from "@impulsogov/design-system"

const Cadastros = () => {
  return (
    <div>
      <TituloSmallTexto
        key={uuidv1()}
        imagem={{
          posicao: null,
          url: ''
        }}
        texto="Veja como estão os cadastros no seu município."
        titulo="<b> Capitação Ponderada </b>"
      />

      <GraficoInfo descricao="<br>Veja abaixo o número total de equipes que seu município tem cadastradas, desse número, quantas foram homologadas ou não e, das homologadas, quantas são válidas e quantas não são válidas."
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Suas equipes" tooltip=""
      />

      <GraficoInfo descricao="<br>Confira aqui sua evolução nos cadastros, considerando a produção de: # e sua diferença para meta. "
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Evolução dos cadastros" tooltip=""
      />

      <GraficoInfo
        key={uuidv1()}
        descricao="O parâmetro municipal mais recente, mostra o valor utilizado como cadastro potencial para o repasse no pilar de capitação ponderada segundo a <a href='https://sisab.saude.gov.br/resource/file/nota_tecnica_relatorio_cadastro_220509.pdf' target='_blank' rel='noreferrer nofollow noopener'><u>  Nota Técnica Explicativa – Relatório de Cadastro Vinculado.</u></a> "
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo=""
        tooltip=""
      />

      <GraficoInfo descricao="<br>Entenda aqui, como suas equipes estão desempenhando:"
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Desempenho das equipes" tooltip=""
      />

      <GraficoInfo descricao="<br>Seus cadastros podem não estar contabilizando por erros no registro. Confira aqui sua evolução nas validações das fichas de cadastro e descubra como melhorar."
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Validação das fichas de produção de cadastro" tooltip=""
      />

      <GraficoInfo
        key={uuidv1()}
        descricao="Os dados desse gráfico foram retirados do <a href='https://sisab.saude.gov.br/paginas/acessoRestrito/relatorio/federal/envio/RelValidacao.xhtml' target='_blank' rel='noreferrer nofollow noopener'><u>Relatório de Validação do SISAB</u></a> para as fichas de Cadastro Individual, Fichas de Atendimento Individual (FAI), Ficha de Visita Domiciliar (FVD) e Ficha de Procedimento (FP), que segundo a <a href='https://sisab.saude.gov.br/resource/file/nota_tecnica_relatorio_cadastro_220509.pdf' target='_blank' rel='noreferrer nofollow noopener'><u> Nota Técnica Explicativa – Relatório de Cadastro Vinculado</u></a> são as fichas que são contabilizadas para capitação ponderada."
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="" tooltip=""
      />

      <GraficoInfo descricao=""
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Aplicações de fichas de cadastro" tooltip=""
      />

      <GraficoInfo
        descricao="Você tem  # cadastros reprovados em análise preliminar. Atualize os cadastros para que sejam contabilizados, mas <b> fique atento aos prazos de envio conforme o calendário </b> do SISAB: <br><br> 

        -<u> Validação da produção na competência </u> - Envio deve ser realizado até o décimo dia útil posterior ao fechamento da competência <br>
        - <u>Validação da produção para o quadrimestre do Previne Brasil</u> - Envio deve ser realizado até o décimo dia útil posterior ao fechamento da competência que encerra o quadrimestre (abril, agosto ou dezembro) <br><br>

        Caso as condições listadas acima não sejam cumpridas, o prazo máximo para envio é de 120 dias após o fechamento da competência, nesse cenário a produção enviada será contabilizada somente para série histórica. Envios realizados fora da janela de 120 dias serão descartados para uso em qualquer finalidade.<br><br>

        Envie as instruções para os seus estabelecimentos de saúde!"
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Cadastros Preliminares Inválidos"
        tooltip=""
      />

      <GraficoInfo
        key={uuidv1()}
        descricao="Referência:<br> <a href='https://www.in.gov.br/en/web/dou/-/portaria-n-4-de-28-de-janeiro-de-2021-301404483' target='_blank' rel='noreferrer nofollow noopener'><u> https://www.in.gov.br/en/web/dou/-/portaria-n-4-de-28-de-janeiro-de-2021-301404483</u></a>"
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="" tooltip=""
      />
    </div>
  )
}
export default Cadastros;