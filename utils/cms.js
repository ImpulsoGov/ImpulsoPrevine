import { request } from 'graphql-request'

const getData = async(QUERY)=>{
    let Content 
    let res = await request('https://api-sa-east-1.hygraph.com/v2/cl76viwik0lhl01ro72k045li/master', QUERY).then((data) => Content = data)
    let content = res != undefined ? res : null
    return content
  }

export {getData}
