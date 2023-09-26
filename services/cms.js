import { request } from 'graphql-request'
import { CMS_PLATAFORMA,CMS_CAPACITACAO } from '../constants/CMS_URL'
const getData = async(QUERY)=>{
    let Content 
    let res = await request(CMS_PLATAFORMA, QUERY).then((data) => Content = data)
    let content = res != undefined ? res : null
    return content
}
const getDataCapacitacao = async(QUERY)=>{
  let Content 
  let res = await request(CMS_CAPACITACAO, QUERY).then((data) => Content = data)
  let content = res != undefined ? res : null
  return content
}

export {getData,getDataCapacitacao}
