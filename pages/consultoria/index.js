import Layout from "../../componentes/Layout";
import { Footer } from "../../componentes/Footer/Footer.jsx";
import { Header } from "../../componentes/Header/Header.jsx";
import { NavBar } from "../../componentes/NavBar/NavBar.jsx";
import { Content3Col } from "../../componentes/Content3Col/Content3Col.jsx";
import { TextCol } from "../../componentes/TextCol/TextCol.jsx";
import { Slider } from "../../componentes/Slider/Slider.jsx";
import { ImagensFull } from "../../componentes/Imagens/ImagensFull.jsx";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | Consultoria">
      <NavBar 
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        />
      <Header
        titulo = "Consultoria para o seu município"
        tituloDestaque = " 100% gratuita"
        texto = "Queremos ajudar você e seu município e temos um time preparado para isso. E o melhor: tudo é feito de forma gratuita, simples e rápida!" 
        botao = { { label: "VER A ANÁLISE DO SEU MUNICÍPIO", url: "/analise" }}
        chamada = {{ label: "CONHEÇA A CONSULTORIA GRATUITA", url: "/consultoria" }}
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
      <Slider 
        titulo = {"Veja o que os outros municípios acharam"}
        core = {[
            {
                titulo : "João Fulano",
                subtitulo : "Coordenador de AP  |  Belo Horizonte - MG",
                corpo : "Você preenche um formulário, nós entramos em contato em até três dias úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia. úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia."
            },
            {
                titulo : "José Beltrano",
                subtitulo : "Coordenador de AP  |  Santo André - SP",
                corpo : "Você preenche um formulário, nós entramos em contato em até três dias úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia. úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia.Ajudou muito os andreenses"
            },
            {
                titulo : "Antonio Sicrano",
                subtitulo : "Coordenador de AP  |  Diadema - SP",
                corpo : "Você preenche um formulário, nós entramos em contato em até três dias úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia. úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia.Ajudou muito os diademenses"
            },
            {
                titulo : "Maria Fulana",
                subtitulo : "Coordenador de AP  |  São Bernardo do Campo - SP",
                corpo : "Você preenche um formulário, nós entramos em contato em até três dias úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia. úteis e já marcamos a primeira conversa. Não precisa assinar nada, é sem burocracia.Ajudou muito os são-bernardenses"
            }
        ]}
        chamada = "TAMBÉM QUERO A CONSULTORIA"
    />
      <Footer
        address={{
            first: "Rua Aracaju 100 - Vila Madalena",
            second: "São Paulo - SP, 01010-100",
        }}
        contactCopyright={{
            copyright: "© 2022 Impulso",
            email: "contato@impulsogov.org",
        }}
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        socialMediaURLs={{
            facebook: "/facebook",
            instagram: "/instagram",
            linkedIn: "/linkedin",
            twitter: "/twitter",
        }} />
    </Layout>
  )
}

export default Index;