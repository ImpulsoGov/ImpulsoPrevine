const genParamEquipe = (token,municipio_uf,equipe,faixa_etaria)=>{
    let params = {
      "token": token,
      "municipio_uf": municipio_uf,
      "equipe": equipe,
      "faixa_etaria" : faixa_etaria
    }
    var encodedParams = encodeURIComponent(JSON.stringify(params))
    return encodedParams
}
  
const urlGenBuscaAtivaEquipe = (data_studio,token,municipio_uf,equipe,cargo,faixa_etaria)=>{
    if (cargo == "Coordenação de Equipe" || cargo == "Impulser"){
        let baseURL = data_studio
        let param = genParamEquipe(token,municipio_uf,equipe,faixa_etaria)
        const link = baseURL  + param 
        console.log(link)
        return link
    }else{
        return ""
    }
}
  
const genParamCoordenacaoAPS = (token,municipio_uf,faixa_etaria)=>{
    let params = {
        "token": token,
        "municipio_uf": municipio_uf,
        "faixa_etaria": faixa_etaria
    }
    var encodedParams = encodeURIComponent(JSON.stringify(params))
    return encodedParams
}
  
const urlGenBuscaAtivaCoordenacaoAPS = (data_studio,token,municipio_uf,cargo,faixa_etaria)=>{
    if (cargo == "Coordenação APS" || cargo == "Impulser"){
        let baseURL = data_studio
        let param = genParamCoordenacaoAPS(token,municipio_uf,faixa_etaria)
        const link = baseURL  + param 
        return link
    }else{
        return ""
    }
}

const genParamCoordenacaoAPSGraficos = (token,municipio_uf)=>{
    let params = {
        "token": token,
        "municipio_uf": municipio_uf,
    }
    var encodedParams = encodeURIComponent(JSON.stringify(params))
    return encodedParams
}
  
const urlGenBuscaAtivaCoordenacaoAPSGraficos = (data_studio,token,municipio_uf,cargo)=>{
    if (cargo == "Coordenação APS" || cargo == "Impulser"){
        let baseURL = data_studio
        let param = genParamCoordenacaoAPSGraficos(token,municipio_uf)
        const link = baseURL  + param 
        return link
    }else{
        return ""
    }
}


export {urlGenBuscaAtivaCoordenacaoAPS,urlGenBuscaAtivaEquipe,urlGenBuscaAtivaCoordenacaoAPSGraficos}