import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { Margem, NovoTituloTexto, CardIP, ButtonColor } from "@impulsogov/design-system"

const Index = ({ res }) => {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(Number(router.query?.painel));

  useEffect(() => {
    setActiveTabIndex(Number(router.query?.painel));
  }, [router.query?.painel]);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { painel: activeTabIndex }
    },
    undefined,
    { shallow: true });
  }, [activeTabIndex]);

  const cardsData = [
    {
      title: " Indicadores de Desempenho",
      description: "Compare resultados dos 7 indicadores entre um quadrimestre e outro.",
      buttonText: "INDICADORES DE DESEMPENHO",
      link: "/dadoPublicos"
    },
    {
      title: "Capitação Ponderada - Cadastros",
      description: "Acompanhe a evolução nos cadastros de cada equipe do seu município.",
      buttonText: "CAPITAÇÃO PONDERADA",
      link: "/dadoPublicos?painel=1"
    },
    {
      title: "Incentivos a Ações Estratégicas",
      description: "Confira o histórico de repasses e as ações que se enquadram no seu perfil.",
      buttonText: "AÇÕES ESTRATÉGICAS",
      link: "/dadoPublicos?painel=2"
    }
  ];

  return (
    <div style={{ backgroundColor: "#E6ECF0" }}>
      <Margem
        componente={
          <>
            <div style={{ paddingTop: 80 }}></div>
            <Margem
              componente={
                <>
                  <NovoTituloTexto
                    titulo="Analise os resultados do Previne Brasil nos últimos quadrimestres"
                    texto="Confira gratuitamente uma nova maneira de acompanhar o desempenho de qualquer município no Previne Brasil com informações comparativas a partir dos dados públicos do SISAB.</br>"
                  />
                </>
              }
            />
            <div style={{ paddingTop: 75 }}></div>
          </>
        }
      />
      
      <div className="cardGrid">
        {cardsData.map((card, index) => (
          <div key={uuidv1()} className="cardContainer">
            <CardIP
              titulo=""
              indicador={<span style={{ color: '#1F1F1F', fontSize: '32px' }}> <br></br>{card.title} </span>}
              descricao={
                <span style={{ fontSize: '18px' }}>
                  {card.description}
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </span>
              }
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-110px', marginLeft: '-20px' }}>
              <ButtonColor
                label={card.buttonText}
                link={card.link}
              />
            </div>
          </div>
        ))}
      </div>
      

      <style jsx>{`
        .cardGrid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 40px;
         
        }

        .cardContainer {
          width: calc(33.33% - 20px);
          position: relative;
          margin-bottom: 20px;
        }

        @media (max-width: 1050px) {
          .cardGrid {
            flex-direction: column;
            align-items: center;
          }

          .cardContainer {
            width: 100%;
            padding: 20px;
          }
        }
      `}</style>
      <div style={{ paddingBottom: '105px' }}></div>
    </div>
  )
}

export default Index;
