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

const conteudosDataTransform = async(conteudosCMS,trilhaID,userID,token)=>{
    const conteudos = []
    
    for(let i=0;i<conteudosCMS.length;i++){
        let moduloID = conteudosCMS[i].moduloId
        let modulo = conteudosCMS[i]
        for(let index=0;index<modulo.conteudos.length;index++){
            const proximo = ()=>{
                let url_base = `/conteudo?codigo_conteudo=${modulo.conteudos[index].codigo}&trilhaID=${trilhaID}&proximo=`
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
            const concluido = await consultarAvaliacaoConclusao(userID,modulo.conteudos[index].codigo,token)
            let item = {
                id: index+1,
                titulo: modulo.conteudos[index].titulo,
                moduloID: moduloID,
                formato:modulo.conteudos[index].tipo,
                concluido: concluido != false ? concluido[0].concluido : concluido, 
                link:proximo()
            }
            conteudos.push(item)
        }
    }
    
    return conteudos
}

const ultimoModulo = ()=>{

}
export {modulosDataTransform,conteudosDataTransform}