import { consultarAvaliacaoConclusao } from "../services/capacitacao";

const modulosDataTransform = (modulosCMS)=>{
    const modulos = []
    modulosCMS.forEach(element => {
        modulos.push({
            titulo: element.titulo,
            id: element.moduloId
        })
    });
    return modulos
}

const conteudosDataTransform = (conteudosCMS,trilhaID,userID,token)=>{
    const conteudos = []
    
    conteudosCMS.forEach((modulo) => {
        let moduloID = modulo.moduloId
        modulo.conteudos.forEach((element,index) => {
            const proximo = ()=>{
                let url_base = `/conteudo?codigo_conteudo=${element.codigo}&trilhaID=${trilhaID}&proximo=`
                for(let i=index;i<modulo.conteudos.length;i++){
                    if(i+1<modulo.conteudos.length){
                        let url_param = `${encodeURIComponent(`/conteudo?codigo_conteudo=${modulo.conteudos[i+1].codigo}&trilhaID=${trilhaID}&proximo=`)}`
                        url_base = url_base + url_param
                    }else{
                        let url_param = `${encodeURIComponent(`/capacitacao?trilhaID=${trilhaID}`)}`
                        url_base = url_base + url_param
                    }
                }
                return url_base
            }
            const concluido = async()=>await consultarAvaliacaoConclusao(userID,element.codigo,token).then((res)=>{
                console.log(res)
                conteudos.push({
                    id: index+1,
                    titulo: element.titulo,
                    moduloID: moduloID,
                    formato:element.tipo,
                    concluido: res ? res[0].concluido:false, 
                    link:proximo()
    
                })
            })
            concluido()
            
        });
    
    });
    return conteudos
}

const ultimoModulo = ()=>{

}
export {modulosDataTransform,conteudosDataTransform}