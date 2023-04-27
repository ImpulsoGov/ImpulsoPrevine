import axios from "axios";
import { API_URL } from "../constants/API_URL";
import FormData from "form-data";

async function NPSConsultaClient(usuario_id,token){    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_URL + 'suporte/nps/consulta?user_id='+usuario_id,
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
async function NPSConsulta(usuario_id,token){
    const res = await NPSConsultaClient(usuario_id,token)
    if (res.length>0) return true
    return false
}
async function NPSAvaliacaoClient(usuario_id,avaliacao,token){
    let data = new FormData();
    data.append('user_id', usuario_id);
    data.append('avaliacao', avaliacao);
    console.log(token)
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API_URL + 'suporte/nps/avaliacao',
        headers: { 
        'Authorization': 'Bearer ' + token, 
        },
        data : data
    };
    
    const res = await axios(config)
    .then(function (response){
        return response.data;
    })
    .catch(function (error){
        console.log(error)
        return error.response.data;
    });
    return res
}
async function NPSAvaliacao(args){
    console.log(args)
    const res = await NPSAvaliacaoClient(args.user,args.avaliacao,args.token)
    if (res?.error!=null) return res
    return false
}

export {NPSConsulta,NPSAvaliacao}