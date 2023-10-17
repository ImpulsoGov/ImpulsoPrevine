import FormData from "form-data";
import { CadastrarUsuario } from "../services/gestao_usuarios/CadastrarUsuario"

const createFormData = (params) => {
  const formData = new FormData();
  for(const key in params) {
    formData.append(key, params[key]);
  }
  return formData;
}
const CadastrarUsuarioLotes = async (data,setRes,SET_ERRO_PROCESSAMENTO,token) => {
    const formDataArray = data.map(item=>createFormData(item))
    const results = await Promise.all(formDataArray.map(formData =>{
       return CadastrarUsuario(formData,token)
      })) // Aguarda todas as solicitações simultaneamente
    let erros = 0
    results.forEach((result, index) => {
      if(!result.success) erros++
      // if (result.success) {
      //   console.log(`Solicitação ${index + 1} concluída com sucesso:`, result.usuario);
      // } else {
      //   erros++
      //   console.error(`Erro na solicitação ${index + 1}:`, result.usuario);
      // }
    });
    SET_ERRO_PROCESSAMENTO(erros>0)
    setRes(results)
}

export { CadastrarUsuarioLotes }



