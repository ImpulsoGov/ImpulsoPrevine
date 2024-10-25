import axios from "axios";

const baseURL = ()=>{
  if(process.env.VERCEL_ENV == 'production') return `https://${process.env.VERCEL_URL}` 
  if(process.env.VERCEL_ENV == 'preview') return `https://${process.env.VERCEL_BRANCH_URL}` 
  if(process.env.ENV == 'dev') return `http://${process.env.VERCEL_BRANCH_URL}` 
}

export const InicioAPSRequest = async(municipio_id_sus : string,token : string)=>{
  console.log('inicio-aps')
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseURL()}/api/inicio/inicio-aps?municipio_id_sus=${municipio_id_sus}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
    const res = axios.request(config)
    .then((response) => {
    return response.data;
    })
    .catch((error) => {
    console.log((error as Error).message)
    return (error as Error).message;
    });      

    return res
}