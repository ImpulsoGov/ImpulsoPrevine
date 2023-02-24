import { consultarAvaliacaoConclusaoPorUsuario } from "../services/capacitacao";

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
    const avaliacoes_usuario = await consultarAvaliacaoConclusaoPorUsuario(userID,token)
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
            const Concluido = avaliacoes_usuario?.filter((item)=>item.codigo_conteudo == modulo.conteudos[index].codigo)
            let item = {
                id: index+1,
                titulo: modulo.conteudos[index].titulo,
                moduloID: moduloID,
                formato:modulo.conteudos[index].tipo,
                concluido: Concluido.length>0 ? Concluido[0].concluido : false, 
                link:proximo()
            }
            conteudos.push(item)
        }
    }
    const ultimoModulo = Math.max(...avaliacoes_usuario?.map((item)=>Number(item.codigo_conteudo[6])))
    return [conteudos,ultimoModulo]
}

const progresso = async(ConteudosCMS,userID,token)=>{
    //Modulos Concluidos pelo usuario
    const modulos_usuario = await consultarAvaliacaoConclusaoPorUsuario(userID,token)
    const UsuarioConclusoes = (codigoTrilha,modulos_usuario,modulosID)=>{
        return modulosID.map(modulo=>{
            const cont = modulos_usuario
            .filter(item=>item.codigo_conteudo.slice(0,2)==codigoTrilha)
            .map((item)=>{return {modulo:item.codigo_conteudo[6],conteudo:item.codigo_conteudo[9]}})
            .filter(item=>modulo==item.modulo).length
            return {modulo:modulo,conteudosConcluidos:cont}
        })
    }
    //Modulos no CMS
    const conteudos_por_modulo = ConteudosCMS.map(trilha=>{
        return {
            TrilhaID: trilha.id,
            codigoTrilha:trilha.conteudo[0].conteudos[0].codigo.slice(0,2),
            qtd :trilha.conteudo.map((item)=>{return {modulo : item.moduloId, conteudosQTD : item.conteudos.length}})
        }
    })
    conteudos_por_modulo.forEach(item=>{
        const conclusoes = UsuarioConclusoes(item.codigoTrilha,modulos_usuario,[...Array(item.qtd.length).keys()])
        item.qtd.forEach(element=>{
            element.conclusao=conclusoes.filter(conclusao=>conclusao.modulo==element.modulo)[0].conteudosConcluidos
            element.modulo != 0 ? 
            element.progresso=(23.75/element.conteudosQTD)*element.conclusao:
            element.progresso=5
        })
        item.progresso = Math.round(item.qtd.reduce((accumulator, currentValue) => {return accumulator + currentValue.progresso},0))
    })
    return conteudos_por_modulo

}
export {modulosDataTransform,conteudosDataTransform,progresso}