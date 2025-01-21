import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export const InicioAPSRequest = async(municipio_id_sus : string,token : string)=>{
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
      console.log(response.data)
    return response.data;
    })
    .catch((error) => {
    console.log((error as Error).message)
    return (error as Error).message;
    });      

    return res
}