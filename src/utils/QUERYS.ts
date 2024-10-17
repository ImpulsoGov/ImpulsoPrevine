export const LAYOUT = `
{
  menus(orderBy: ordem_ASC) {
    label
    url
  }
  logoIps {
    logo {
      url
    }
  }
  footers(orderBy: ordem_ASC) {
    label
    url
  }
  logoImpulsos {
    logo {
      url
    }
  }
  socialMedias {
    logo {
      url
    }
    url
  }
  logoMenuMoblies {
    logo {
      url
    }
  }
}
`;

export const HOME = `
{
  homeBanners {
    titulo
  }
  imagemFundos {
    imagem {
      url
    }
    titulo
    tituloColor
    buttonLabel
    buttonLink
  }
  parceirosAll {
    labelImages
    titulo {
      text
    }
  }
  logoParceiros {
    logoparceiro {
      url
      fileName
    }
  }
  formConsultorias {
    titulo
    button
    link
  }
  imagemfundoContents {
    body
    title
  }
}
`;
export const QUEMSOMOS = `
{
  tituloTextos {
    titulo
    texto {
      html
    }
  }
  formConsultorias {
    titulo
    button
    link
  }
}
`;
export const CONSULTORIA = `
{
  headers {
    button
    buttonLink
    texto
    titulo
  }
  content3Cols {
    titulo
  }
  cards {
    texto
    titulo
  }
  formConsultorias(last: 1) {
    titulo
    tituloColor
    link
    button
  }
  sliders {
    button
    titulo
    buttonLink
  }
  sliderCards {
    cargo
    municipio
    nome
    texto
    uf
  }
}
`;

export const MANUAL = `
{
  homeBanners(last: 1) {
    texto
    titulo
  }
}
`;
export const ANALISE = `
{
  buttonBars {
    label
    link
  },
  headers {
    texto
    titulo
  }
}
`

export const FAQ =
`
{
  faqs() {
    titulo
    perguntas {
      ... on Pergunta {
        pergunta
        resposta
      }
    }
  }
}
`

export const POSTS = `
{
  blogArtigos (last: 100){
    autor
    avatar {
      url
      id
    }
    data
    tag
    titulo
    texto {
      raw
    }
    createdAt
    id
    capa {
      url
    }

  }
}
`

export const POST =(id : string)=>{
  return(`
    {
      blogArtigo(where: {id: "${id}"}) {
        id
        autor
        avatar {
          url
        }
        createdAt
        tag
        texto {
          html
        }
        titulo
        capa {
          url
        }
      }
    }
    `
  )
}

export const POSTID = `
{
  blogArtigos(last: 100) {
    id
  }
}
`
export const LISTA_ARTIGOS = `
{
  listaArtigos {
    titulo
    buttonLabel
    buttonLink
  }
}`


export const CONTEUDOS_TRILHAS =
    `
    {
      trilhas {
        conteudo {
          ... on Modulo {
            moduloId
            conteudos {
              codigo
            }
          }
        }
        id
        titulo
      }
    }
    `
export const CAPACITACAO = (TRILHA_ID : string)=>{
  return(
  `
  {
    trilhas(where: {id: "${TRILHA_ID}"}) {
      conteudo {
        ... on Modulo {
          titulo
          moduloId
          liberado
          conteudos {
            tipo
            tituloTexto {
              ... on TituloTexto {
                titulo
                texto {
                  html
                }
              }
            }
            url
            materialComplementar {
              ... on Link {
                label
                url
              }
            }
            titulo
            codigo
          }
        }
      }
      titulo
      id
    }
  }
  `
  );
};

export const CONTEUDO_CAPACITACAO = (CODIGO_CONTEUDO : string, TRILHA_ID : string) => {
  return (
    `
  {
    conteudos(where: {codigo: "${CODIGO_CONTEUDO}"}, orderBy: codigo_ASC) {
      codigo
      materialComplementar {
        ... on Link {
          url
          label
        }
      }
      tipo
      tituloTexto {
        ... on TituloTexto {
          titulo
          texto {
            html
          }
        }
      }
      url
    }
    trilhas(where: {id: "${TRILHA_ID}"}) {
      conteudo {
        ... on Modulo {
          moduloId
          titulo
        }
      }
      titulo
    }  }
  `
  );
};

export const CONTEUDO_PROGRAMATICO = (TRILHA_ID : string) => {
  return (
    `{
      trilhas(where: {id: "${TRILHA_ID}"}) {
        titulo
        sobre {
          ... on Sobre {
            id
            conteudo {
              ... on ConteudoSobre {
                buttons {
                  ... on Link {
                    label
                    url
                  }
                }
                item
              }
            }
            nossoTime {
              ... on Membro {
                cargo
                nome
                foto {
                  url
                }
              }
            }
            tituloTexto {
              ... on TituloTexto {
                titulo
                texto {
                  html
                }
              }
            }
          }
        }
      }
    }`
  )
}
