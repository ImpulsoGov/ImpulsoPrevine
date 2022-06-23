import Layout from "../../componentes/Layout";
import { Footer } from "../../componentes/Footer/Footer.jsx";
import { NavBar } from "../../componentes/NavBar/NavBar.jsx";
import { TituloTexto } from "../../componentes/TituloTexto/TituloTexto.jsx";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | O Previne Brasil">
      <NavBar 
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        />
      <TituloTexto
        titulo = "O Previne Brasil"
        texto = 
            "O Previne Brasil é a nova política de financiamento federal da Atenção Primária à Saúde, instituído em 2019 pela Portaria nº 2.979, de 12 de novembro de 2019 e, posteriormente, atualizado pela publicação da Portaria nº102 de 20 de janeiro de 2022. 

            O Previne Brasil estrutura o financiamento levando em consideração a dependência da população local dos serviços do SUS e o desempenho dos municípios no cuidado oferecido pela rede de Atenção Primária à Saúde (APS).

            O programa cria condições que devem ser atendidas pelos municípios para que o governo federal efetue o repasse. São quatro critérios que orientam essa nova política: a capitação ponderada, o pagamento por desempenho, o incentivo para ações estratégicas e o incentivo financeiro com base em critério populacional, incorporado em setembro de 2021 ao programa. 
            
            O componente de capitação ponderada diz respeito ao número de pessoas cadastradas sob responsabilidade das equipes de Saúde da Família (eSF) e de Atenção Primária (eAP). As equipes de Saúde da Família Ribeirinha (eSFR), equipes de Consultório na Rua (eCR) e equipes de Atenção Primária Prisional (eAPP) também tem seus cadastros contabilizados. 
            
            Já o componente de pagamento por desempenho considera o cumprimento de metas de performance em indicadores específicos relacionados ao cuidado oferecido pela APS para a definição do valor a ser transferido aos municípios. Até o final de 2021, o Ministério da Saúde calculava os repasses como se todas as metas estivessem sido cumpridas. A partir de janeiro deste ano, com a publicação da Portaria nº 102 de 20 de janeiro de 2022, ocorrerá a transição escalonada do cumprimento dos indicadores de desempenho do Previne Brasil. 
            
            Para definir o valor que será repassado por este critério, a cada quadrimestre o ministério avalia o desempenho nos indicadores e calcula uma nota de 0 a 10 para cada município, chamada de ISF (Indicador Sintético Final). Caso encerre um quadrimestre sem ter atingido as metas, o município terá um ISF menor que 10 e receberá um repasse proporcional nos meses seguintes até a próxima avaliação.
            

            Para o financiamento no primeiro quadrimestre de 2022, será considerado:

            1- O percentual de alcance real das metas dos indicadores 1 (consultas pré-natal) e 2 (exames de HIV e sífilis em gestantes) 
            
            2- O percentual de alcance de 100% das metas do restante dos indicadores, considerando a apuração do ISF obtido no terceiro quadrimestre de 2021. 
            
            
            Para o financiamento no segundo quadrimestre de 2022, será considerado:
            
            1- o percentual de alcance real para das metas dos indicadores 1 (consultas pré-natal), 2 (exames de HIV e sífilis em gestantes), 3 (atendimento odontológico em gestantes), 4 (citopatológico) e 5 (vacinação infantil); 
            
            2 – o percentual de alcance de 100% das metas dos indicadores 6 e 7 (acompanhamento de hipertensos e diabéticos), considerando a apuração do ISF obtido no primeiro quadrimestre de 2022.
            
            Para o financiamento no terceiro quadrimestre de 2022, será considerado o percentual de alcance real das metas de todos os sete indicadores, considerando a apuração do ISF obtido no segundo quadrimestre de 2022.
            
            O componente de Incentivos para ações estratégicas considera a adesão da gestão municipal a programas, estratégias e serviços de saúde, levando em conta as especificidades e prioridades em saúde, assim como aspectos estruturais e de produção assistencial das equipes e unidades de saúde locais, ou ainda o cumprimento de requisitos definidos pelo Ministério da Saúde. As ações estratégicas são divididas em quatro categorias, agrupadas de acordo com suas características. São elas: Prioritárias; Saúde Bucal; Promoção da Saúde e Especificidades. Uma vez que o município seja elegível, ele receberá o financiamento referente a sua adesão, que poderá ser em parcela única, ou mensalmente.
            
            
            A implantação de tais ações estratégicas também visa qualificar as ações e serviços da APS no município como um todo, o que pode impactar positivamente nos resultados alcançados nos indicadores acompanhados no componente de pagamento por desempenho. 
            
            Para o incentivo financeiro com base em critério Populacional, regulamentado pela Portaria GM/MS nº 2.254, de 03 de setembro de 2021, o valor per capita definido anualmente em ato do Ministério da Saúde é calculado de  acordo com a estimativa populacional dos municípios e Distrito Federal mais recente divulgada pelo IBGE.
            
            Quer saber mais? Baixe o Manual Impulso Previne e solicite uma consultoria com nossos Especialistas!"
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