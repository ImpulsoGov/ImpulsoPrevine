import { v1 as uuidv1 } from 'uuid';
import { GraficoInfo, Grid12Col, TituloSmallTexto } from "@impulsogov/design-system"

const Acoes = () => {
  return (
    <div>
      <TituloSmallTexto
        key={uuidv1()}
        imagem={{
          posicao: null,
          url: ''
        }}
        texto="Nessa página você vai encontrar o histórico de repasses consolidado do componente de Incentivos para Ações Estratégicas do seu município, além do histórico de repasses por ação, detalhes de ações em vigor e um checklist de características do seu município, que mostra quais ações se enquadram no seu perfil."
        titulo="<b> Incentivos para Ações Estratégicas.</b>"
      />

      <GraficoInfo descricao="<br>Veja abaixo o histórico de repasses do componente de incentivos para ações estratégicas do seu município, considerando todas as ações implementadas, ou seja, <b> o valor consolidado do município</b> em cada mês."
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Histórico de repasses " tooltip=""
      />

      <GraficoInfo descricao="<br>Veja o histórico de repasses <b> de cada ação estratégica </b> do seu município que foi implementada e continua em vigor*. "
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="" tooltip=""
      />

      <GraficoInfo
        key={uuidv1()}
        descricao="Veja a lista de ações estratégicas implementadas em vigor* do seu município e seus critérios de manutenção. "
        destaque=""
        fonte=""
        link={{
          label: '',
          url: '/'
        }}
        titulo="Ações Estratégicas implementadas em vigor"
        tooltip=""
      />
    </div>
  )
}
export default Acoes;