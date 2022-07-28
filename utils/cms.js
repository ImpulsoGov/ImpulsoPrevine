import { request } from 'graphql-request'

const getData = async(QUERY)=>{
    let Content 
    let res = await request('https://api-sa-east-1.hygraph.com/v2/cl612bsnq4grw01ut5asr6wi6/master', QUERY).then((data) => Content = data)
    let content = res != undefined ? res : null
    return content
  }

export {getData}
