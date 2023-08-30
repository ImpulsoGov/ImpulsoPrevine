import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v1 as uuidv1 } from 'uuid';
import { Margem, NovoTituloTexto, Grid12Col, CardIP, ButtonColor } from "@impulsogov/design-system"
import { getData } from '../../services/cms'
import { LAYOUT, HOME } from '../../utils/QUERYS'

export async function getServerSideProps(ctx) {
  const userIsActive = ctx.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
  let redirect = !userIsActive && !userIsActiveSecure
  if (!redirect) {
    return {
      redirect: {
        destination: "/analise",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      },
    }
  }
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res: res
    }
  }
}

const Index = ({ res }) => {
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
                    texto="Selecione o seu município no menu superior e clique no <br> componente do programa que você quer ver.</br>"
                  />
                </>

              }

            />
            <div style={{ paddingTop: 75 }}></div>
          </>

        }
      />

      <Margem
        componente={
          <>
            <Grid12Col
              proporcao="4-4-4"
              items={[
                <div key={uuidv1()} style={{ position: 'relative' }}>
                  <CardIP
                    titulo=""
                    indicador={<span style={{ color: '#1F1F1F', fontSize: '28px' }}>Indicadores de Desempenho</span>}
                    descricao={
                      <span style={{ fontSize: '18px' }}>
                        Compare resultados dos 7 indicadores entre um quadrimestre e outro.
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                      </span>
                    }
                  />
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '-110px', marginLeft: '-25px' }}>
                    <ButtonColor
                      label="INDICADORES DE DESEMPENHO"
                      link="/dadoPublicos"
                    />
                  </div>
                </div>,
                 <div key={uuidv1()} style={{ position: 'relative' }}>
                 <CardIP
                   titulo=""
                   indicador={<span style={{ color: '#1F1F1F', fontSize: '27.2px' }}>Capitação Ponderada - cadastros</span>}
                   descricao={
                     <span style={{ fontSize: '18px' }}>
                       Acompanhe a evolução nos cadastros de cada equipe do seu município..
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                     </span>
                   }
                 />
                 <div style={{display: 'flex', justifyContent: 'center', marginTop: '-110px', marginLeft: '-75px' }}>
                   <ButtonColor
                     label="CAPITAÇÃO PONDERADA"
                     link="/dadoPublicos?painel=1"
                   />
                 </div>
               </div>,
                <div key={uuidv1()} style={{ position: 'relative' }}>
                <CardIP
                  titulo=""
                  indicador={<span style={{ color: '#1F1F1F', fontSize: '28px' }}>Incentivos a Ações Estratégicas</span>}
                  descricao={
                    <span style={{ fontSize: '18px' }}>
                      Confira o histórico de repasses e as ações que se enquadram no seu perfil.
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                    </span>
                  }
                />
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '-110px', marginLeft: '-85px' }}>
                  <ButtonColor
                    label="AÇÕES ESTRATÉGICAS"
                    link="/dadoPublicos?painel=2"
                  />
                </div>
              </div>

              ]}
            />
            <div style={{ paddingTop: 75 }}></div>
          </>
        }
      />
    </div>
  )
}

export default Index;
