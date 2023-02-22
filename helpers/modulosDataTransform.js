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
            const concluido = async()=>{
                const res = await consultarAvaliacaoConclusao(userID,element.codigo,token).then(async(res)=>{return res})
                return res
            }
            let proximo_codigo = index + 1 < modulo.conteudos.length ? modulo.conteudos[index+1].codigo : ''
            const proximo = ()=>{
                let url_base = `/conteudo?codigo_conteudo=${element.codigo}&trilhaID=${trilhaID}&proximo=`
                for(let i=index;i<modulo.conteudos.length;i++){
                    if(i+1<modulo.conteudos.length){
                        let url_param = `${encodeURIComponent(`/conteudo?codigo_conteudo=${modulo.conteudos[i+1].codigo}&trilhaID=${trilhaID}&proximo=`)}`
                        url_base = url_base + url_param
                    }else{
                        let url_param = `${encodeURIComponent(`/conteudo?codigo_conteudo=1&trilhaID=${trilhaID}&proximo=`)}`
                        url_base = url_base + url_param
                    }
                }
                return url_base
            }
            conteudos.push({
                id: index+1,
                titulo: element.titulo,
                moduloID: moduloID,
                formato:element.tipo,
                concluido: concluido(), 
                link:proximo()

            })
        });
    
    });
    return conteudos
}

export {modulosDataTransform,conteudosDataTransform}