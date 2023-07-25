import axios from "axios";
import { API_URL } from "../constants/API_URL";

const acessoTrilhasClient = async(usuario_id,token)=>{    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL + `impulsoprevine/capacitacao/acesso-trilhas?usuario_id=${usuario_id}` ,
        headers: { 
        'Authorization': 'Bearer ' + token, 
        },
    };
    
    const res = await axios(config)
    .then(function (response){
        return response.data;
    })
    .catch(function (error){
        return error.response.data;
    });
    return res
}

const acessoModulosTrilhasClient = async(usuario_id,trilha_id,token)=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL + `impulsoprevine/capacitacao/acesso-modulos-trilha?usuario_id=${usuario_id}&trilha_id=${trilha_id}` ,
        headers: { 
        'Authorization': 'Bearer ' + token, 
        },
    };
    const res = await axios(config)
    .then(function (response){
        return response.data;
    })
    .catch(function (error){
        return error.response.data;
    });
    return res
}

export { acessoTrilhasClient , acessoModulosTrilhasClient }