import axios from "axios";

export const InicioEquipeRequest = async(municipio_id_sus : string,equipe : string,token : string)=>{
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/inicio/inicio-aps?municipio_id_sus=${municipio_id_sus}&equipe=${equipe}`,
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