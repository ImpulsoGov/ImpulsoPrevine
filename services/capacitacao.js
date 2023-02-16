import axios from "axios";
import { API_URL } from "../constants/API_URL";
import FormData from "form-data";

const consultarAvaliacaoConclusaoClient = async(usuario_id,codigo_conteudo,token)=>{
    try {
        let data = new FormData();
        data.append('usuario_id', usuario_id);
        data.append('codigo_conteudo', codigo_conteudo);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url:  API_URL + 'impulsoprevine/capacitacao/consulta-avaliacao-conclusao',
            headers: { 
                'Authorization': 'Bearer ' + token, 
                ...data.getHeaders()
              },
            data : data
        };
        const res = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
        return res
    } catch (error) {
        return false
    }

}

const consultarAvaliacaoConclusao = async(usuario_id,codigo_conteudo,token)=>{
    const res = await consultarAvaliacaoConclusaoClient(usuario_id,codigo_conteudo,token)
    if (res?.error == null) return res
    return false
}

async function avaliarConteudoClient(usuario_id,codigo_conteudo,avaliacao,token){
    let data = new FormData();
    data.append('usuario_id', usuario_id);
    data.append('codigo_conteudo', codigo_conteudo);
    data.append('avaliacao', avaliacao);
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API_URL + 'impulsoprevine/capacitacao/avaliacao-conteudo',
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
        return error.response.data;
    });
    return res
}
async function avaliarConteudo(usuario_id,codigo_conteudo,avaliacao,token){
    const res = await avaliarConteudoClient(usuario_id,codigo_conteudo,avaliacao,token)
    if (res?.error == null) return res
    return false
}
async function concluirConteudoClient(usuario_id,codigo_conteudo,token){
    let data = new FormData();
    data.append('usuario_id', usuario_id);
    data.append('codigo_conteudo', codigo_conteudo);
    data.append('conclusao', 'True');
    
    let config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: API_URL + 'impulsoprevine/capacitacao/conclusao-conteudo',
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
        return error.response.data;
    });
    return res
}
async function concluirConteudo(usuario_id,codigo_conteudo,token){
    const res = await concluirConteudoClient(usuario_id,codigo_conteudo,token)
    if (res?.error == null) return res
    return false
}

export {consultarAvaliacaoConclusao,concluirConteudo,avaliarConteudo}