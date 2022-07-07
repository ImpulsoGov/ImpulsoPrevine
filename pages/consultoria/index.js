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
        texto = "Queremos ajudar você e seu município e temos um time preparado para isso. E o melhor: tudo é feito de forma gratuita, simples e rápida!" 
        botao = { { label: "VER A ANÁLISE DO SEU MUNICÍPIO", url: "/indicadores" }}
        chamada = {{ label: "CONHEÇA A CONSULTORIA GRATUITA", url: "#formulario" }}
        />
      <Content3Col
        titulo = "Por que devo fazer?"
        child1 = {
            <TextCol
                titulo = "Descomplicada"
                corpo = "Você preenche um formulário, nós entramos em contato em até três dias úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia."
            />
        }
        child2 = {
            <TextCol
                titulo = "Gratuita"
                corpo = "A consultoria é 100% gratuita. Você poderá marcar até três encontros totalmente gratuitos e ter acesso a análises e materiais criados por nossos especialistas."
            />
        }
        child3 = {
            <TextCol
                titulo = "Personalizada"
                corpo = "Trazemos análises e recomendações personalizadas para seu município melhorar nos indicadores e na capitação ponderada, sempre adequando à realidade local."
            />
        }        
      />
    <FormConsultoria
        title="Preencha o formulário abaixo para receber nossa consultoria ou, se quiser conversar sobre outro assunto, envie um e-mail para "
        mail="contato@impulsogov.org."
        link="https://docs.google.com/forms/d/e/1FAIpQLSce3dYZO3tdRmNq-Oy8Z_0IFu5RXtwDDsSw6BXLaWx7BBfv_Q/viewform?embedded=true"
        button="enviar"
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
        chamada = "TAMBÉM QUERO A CONSULTORIA"
    />
    </Layout>
  )
}

export default Index;