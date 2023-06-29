import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { getData } from '../../../services/cms';
import { LAYOUT } from '../../../utils/QUERYS';
import { redirectHomeNotLooged } from "../../../helpers/redirectHome";
import { v1 as uuidv1 } from 'uuid';
import { ButtonLight, PanelSelectorSM, TituloTexto, GraficoInfo , Grid12Col} from "@impulsogov/design-system"

export async function getServerSideProps() {
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Indicadores = ({res}) => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(Number(router.query?.painel));
  const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
  useEffect(() => {
    setActiveTabIndex(Number(router.query?.painel));
  }, [router.query?.painel]);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { painel: activeTabIndex }
    },
      undefined, { shallow: true }
    );
  }, [activeTabIndex]);

  return (
    <div>
      <TituloTexto
          imagem={{
            posicao: null,
            url: ''
          }}
          texto="Nessa página você vai encontrar o histórico de desempenho do seu município, os resultados dos indicadores na competência atual e nos quadrimestres anteriores, além de informações sobre como bater a meta em cada um deles e recomendações."
          titulo="<b> Indicadores de desempenho </b>"
        />
                
        <Grid12Col
          items={[
            <GraficoInfo descricao=" Verifique como foi o desempenho do seu município em relação a meta preconizada pelo Ministério da Saúde para as <b> equipes avaliadas** no quadrimestre selecionado. </b> Veja também o desempenho nos quadrimestres passados. " destaque="" fonte="" link={{   label: '',   url: '/' }} titulo="Desempenho do Município" tooltip=""/> ,
            <GraficoInfo descricao=" Verifique como foi o desempenho do seu município em relação a meta preconizada pelo Ministério da Saúde para as <b> equipes avaliadas** no quadrimestre selecionado. </b> Veja também o desempenho nos quadrimestres passados. " destaque="" fonte="" link={{   label: '',   url: '/' }} titulo="Desempenho do Município" tooltip=""/>
          ]}
        />

          <GraficoInfo
            descricao="<b> Fonte: SISAB </b>
          <br>
          *As regras aplicadas no cálculo dos indicadores seguem a NOTA TÉCNICA Nº 12/2022 (SAPS/MS) referente à metodologia de cálculo vigente.
          O resultado do Indicador “Cobertura vacinal de Poliomielite inativada e de Pentavalente” considera o alcance de 100% devido à correção da divergência no método de cálculo em 2021, para fins de cálculo do ISF. Os demais resultados dos indicadores estão com o percentual de alcance real.
          <br></br>
          **Equipes avaliadas: Equipes eSF, eAP, eCR, eAPP e eSFR ativas e credenciadas pelo Ministério da Saúde, cadastradas no SCNES pela gestão municipal, distrital ou estadual, homologadas pelo Ministério da Saúde e com ausência de irregularidades que justifiquem a suspensão de 100% (cem por cento) dos incentivos financeiros. "
            destaque=""
            fonte=""
            link={{
              label: '',
              url: '/'
            }}
            titulo=""
            tooltip=""
          />
    </div>
  )
}

export default Indicadores;
