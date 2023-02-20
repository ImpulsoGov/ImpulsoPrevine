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
    console.log(conteudosCMS)
    conteudosCMS.forEach((modulo) => {
        let moduloID = modulo.moduloId
        modulo.conteudos.forEach((element,index) => {
            const concluido = async()=>{
                const res = await consultarAvaliacaoConclusao(userID,element.codigo,token).then(async(res)=>{return res})
                return res
            }
            conteudos.push({
                id: index+1,
                titulo: element.titulo,
                moduloID: moduloID,
                formato:element.tipo,
                concluido: concluido(), 
                link:"/conteudo?codigo_conteudo="+element.codigo+"&trilhaID="+trilhaID
            })
        });
    
    });
    return conteudos
}

export {modulosDataTransform,conteudosDataTransform}