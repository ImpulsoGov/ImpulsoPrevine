export const LAYOUT = `
{
  menus {
    label
    url
  }
  logoIps {
    logo {
      url
    }
  }
  footers {
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
  copyrights {
    contato
    copyright
  }
  logoMenuMoblies {
    logo {
      url
    }
  }
}
`

export const HOME = `
{
  homeBanners {
    titulo
  }
  imagemFundos {
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
`
export const IMPULSOGOV = `
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
`
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
`

export const MANUAL = `
{
  homeBanners(last: 1) {
    texto
    titulo
  }
}
`
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
export const POSTS = `
{
  blogArtigos {
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

export const POST =(id)=>{
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
  blogArtigos {
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
}
`
