"use client"

import {
  CardClicavel,
  CardLista,
  DetailedInfo,
  Grid12Col,
  Banner,
} from "@impulsogov/design-system";

export const Aps = () => {
  return (
    <Grid12Col
      proporcao="3-3-3-3"
      items={[
        <div key="cardsDiabetesEVacinacao" style={{display: "flex", flexDirection: "column", gap: "24px", height: "100%"}}>
          <CardLista
            icone={{
              src: "https://media.graphassets.com/1dk4kcYISZWzG5WH5Qx8",
              alt: "Ícone",
            }}
            titulo="Diabetes"
            descricao="Cidadãos que possuem a condição e o status de consulta e solicitação de hemoblogina."
            height="50%"
            link={{
              url: "/busca-ativa/diabeticos",
              newTab: false
            }}
          >
            <DetailedInfo
              descricao="Pessoas com consulta e solicitação de hemoglobina a fazer"
              destaque="1876"
              complemento="de 34532"
            />
          </CardLista>
          <CardLista
            icone={{
              src: "https://media.graphassets.com/OUt6xxu4RAOOtHH9DPc0",
              alt: "Ícone",
            }}
            titulo="Vacinação"
            descricao="Contempla os esquemas vacinais de poliomielite e pentavalente em crianças de zero a um ano e meio."
            height="50%"
            link={{
              url: "/busca-ativa/vacinacao",
              newTab: false
            }}
          >
            <DetailedInfo
              descricao="Crianças com pelo menos uma dose em atraso"
              destaque="20"
              complemento="de 72*"
            />
          </CardLista>
        </div>,
        <div key="cardsHipertensaoECito" style={{display: "flex", flexDirection: "column", gap: "24px", height: "100%"}}>
          <CardLista
            icone={{
              src: "https://media.graphassets.com/roJdddcySQek6S7PL6vG",
              alt: "Ícone",
            }}
            titulo="Hipertensão"
            descricao="Cidadãos que possuem a condição e o status de consulta e aferição de pressão."
            height="50%"
            link={{
              url: "/busca-ativa/hipertensos",
              newTab: false
            }}
          >
            <DetailedInfo
              descricao="Pessoas com consulta e aferição de pressão a fazer"
              destaque="1876"
              complemento="de 34532"
            />
          </CardLista>
          <CardLista
            icone={{
              src: "https://media.graphassets.com/6D1X2PR2Q1StbSSp7a0I",
              alt: "Ícone",
            }}
            titulo="Citopatológico"
            descricao="Mostra o status todas as pessoas entre 25 e 64 anos que têm a coleta em dia, em atraso ou que nunca a realizaram."
            height="50%"
            link={{
              url: "/busca-ativa/citopatologico",
              newTab: false
            }}
          >
            <DetailedInfo
              descricao="Pessoas com coleta de citopatológico a fazer"
              destaque="20"
              complemento="de 72"
            />
          </CardLista>
        </div>,
        <div key="cardsPreNatalESuporte" style={{display: "flex", flexDirection: "column", gap: "24px", height: "100%"}}>
          <CardLista
            icone={{
              src: "https://media.graphassets.com/ERTNxs5Styfp8q9Q6VwR",
              alt: "Ícone",
            }}
            titulo="Pré-Natal"
            descricao="Considera o status dos exames de sífilis e HIV, atendimento odontológico e número de consultas das getantes."
            link={{
              url: "/busca-ativa/gestantes",
              newTab: false
            }}
          >
            <DetailedInfo
              descricao="Gestantes com menos de 6 consultas de pré-natal"
              destaque="32"
              complemento="de 151"
            />
            <DetailedInfo
              descricao="Gestantes sem os exames de Sífilis e HIV identificados"
              destaque="40"
              complemento="de 151"
            />
            <DetailedInfo
              descricao="Gestantes sem o atendimento odontológico identificado"
              destaque="56"
              complemento="de 151"
            />
          </CardLista>
          <CardClicavel
            descricao={{
              content: 'Clique aqui para falar com o suporte',
              contentOnHover: '<u>Clique aqui</u> para falar com o suporte'
            }}
            icone={{
              alt: 'Ícone',
              src: 'https://media.graphassets.com/eyhtI9x1RIiXOyUgnD8K',
              srcOnHover: 'https://media.graphassets.com/GBWxV5tTQjK8RKcvee3z'
            }}
            link={{
              newTab: true,
              url: 'https://www.google.com'
            }}
            onClick={() => {}}
            titulo="Falar com o suporte"
          />
        </div>,
        <Banner
          key="bannerGuiasEDicas"
          descricao={{
            content: 'Em breve esse espaço terá uma novidade! Conte pra gente o que você acha que colocaremos aqui?'
          }}
          icone={{
            alt: 'Imagem',
            src: 'https://media.graphassets.com/NuB8Kdi2ThW19WzQg52z',
            width: '21px'
          }}
          link={{
            label: 'CONTE PRA GENTE',
            newTab: true,
            url: 'https://www.google.com/'
          }}
          titulo={{
            content: 'Em breve uma novidade'
          }}
        />
      ]}
    />
  )
}