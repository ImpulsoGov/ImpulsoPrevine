import Layout from "../../componentes/Layout";
import { Header } from "../../componentes/Header/Header.jsx";
import { Content3Col } from "../../componentes/Content3Col/Content3Col.jsx";
import { TextCol } from "../../componentes/TextCol/TextCol.jsx";
import { Slider } from "../../componentes/Slider/Slider.jsx";
import { FormConsultoria } from "../../componentes/FormConsultoria/FormConsultoria";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | Consultoria">
      <Header
        titulo = "Consultoria para o seu município"
        tituloDestaque = " 100% gratuita"
        texto = "Queremos ajudar você e seu município e temos um time preparado para isso. Você pode marcar uma consultoria ou tirar suas dúvidas de forma rápida e descomplicada. E o melhor: tudo de forma gratuita." 
        botao = { { label: "Inscreva-se para a consultoria", url: "https://docs.google.com/forms/d/e/1FAIpQLSce3dYZO3tdRmNq-Oy8Z_0IFu5RXtwDDsSw6BXLaWx7BBfv_Q/viewform?embedded=true"}}
        chamada = {{ label: "Tire sua dúvida", url: "#formulario" }}
        />
      <Content3Col
        titulo = "Consultoria 100% gratuita e personalizada"
        child1 = {
            <TextCol
                titulo = "O que é?"
                corpo = "Uma consultoria para auxiliar seu município a melhorar o desempenho nos indicadores de desempenho e cadastro do Previne Brasil"
            />
        }
        child2 = {
            <TextCol
                titulo = "Como funciona?"
                corpo = "Três encontros gratuitos com nosso time de especialistas, que preparam diagnóstico, plano de ação e acompanhamento de resultados personalizados para o seu município."
            />
        }
        child3 = {
            <TextCol
                titulo = "Quem pode fazer?"
                corpo = "Municípios de até 40 mil habitantes que desejam ter apoio na gestão do Previne Brasil."
            />
        }        
      />
    <FormConsultoria
        title="Se interessou pela nossa consultoria? Preencha o formulário abaixo para fazer sua inscrição."
        mail=""
        link="https://docs.google.com/forms/d/e/1FAIpQLSce3dYZO3tdRmNq-Oy8Z_0IFu5RXtwDDsSw6BXLaWx7BBfv_Q/viewform?embedded=true"
        button="enviar"
    />  
    <FormConsultoria
        title="Em caso de dúvidas, escreva para "
        mail="contato@impulsogov.org"
        link=""
        button=""
    />      
    <Slider 
        titulo = {"Veja o que os outros municípios acharam"}
        core = {[
            {
                titulo : "Márcia",
                subtitulo : "Coordenadora de APS | Rio Paranaíba - MG",
                corpo : "Excelente! De uma forma geral nos sentimos satisfeitos com o trabalho realizado pelos consultores, principalmente a forma de trabalho dos mesmos, que deram o máximo de atenção possível a nós e mostraram realmente na pratica a melhor forma de atingirmos os indicadores."
            },
            {
              titulo : "Márcia",
              subtitulo : "Coordenadora de APS | Rio Paranaíba - MG",
              corpo : "Excelente! De uma forma geral nos sentimos satisfeitos com o trabalho realizado pelos consultores, principalmente a forma de trabalho dos mesmos, que deram o máximo de atenção possível a nós e mostraram realmente na pratica a melhor forma de atingirmos os indicadores."
          },

        ]}
        chamada = "Quero me inscrever para a consultoria"
        link="https://docs.google.com/forms/d/e/1FAIpQLSce3dYZO3tdRmNq-Oy8Z_0IFu5RXtwDDsSw6BXLaWx7BBfv_Q/viewform?embedded=true"
    />
    </Layout>
  )
}

export default Index;