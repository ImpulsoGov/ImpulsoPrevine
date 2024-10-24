import axios from "axios";

export const InicioAPSRequest = async(municipio_id_sus : string,token : string)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/inicio/inicio-aps?municipio_id_sus=${municipio_id_sus}`,
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      };
      
    const res = axios.request(config)
    .then((response) => {
    return response.data;
    })
    .catch((error) => {
    return error.response.data;
    });      

    return res
}