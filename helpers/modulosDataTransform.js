import { consultarAvaliacaoConclusaoPorUsuario } from "../services/capacitacao";
import { acessoModulosTrilhasClient } from "../services/acessoTrilha";
import trilhasIDSigla from '../data/trilhas.json' assert { type: 'json' };

const modulosDataTransform = async(ConteudosCMS,TrilhaID,userID,token)=>{
    const modulos = []
    const modulos_liberados_res = await acessoModulosTrilhasClient(userID,TrilhaID,token)
    const modulos_liberados = modulos_liberados_res.map(item => item.modulos[0]).sort()
    return progresso(ConteudosCMS,userID,token).then(res=>{
        const trilha = ConteudosCMS.map((trilha)=>{if(trilha.id=TrilhaID) return trilha})
        trilha[0].conteudo.forEach((element,index) => {
            modulos.push({
                titulo: element.titulo,
                id: element.moduloId,
                liberado:modulos_liberados.includes(element.moduloId),
                concluido: res[0].qtd[index].finalizado
            })
        });
        return modulos
    })
}

const conteudosDataTransform = async(conteudosCMS,trilhaID,userID,token)=>{
    const conteudos = []
    const avaliacoes_usuario = await consultarAvaliacaoConclusaoPorUsuario(userID,token)
    const checkSobre = avaliacoes_usuario.filter(item=>item.codigo_conteudo.slice(3,10)=="MOD0-C0").length>0
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
            const Concluido = avaliacoes_usuario ?
            avaliacoes_usuario?.filter((item)=>item.codigo_conteudo == modulo.conteudos[index].codigo):
            false
            let item = {
                id: index+1,
                titulo: modulo.conteudos[index].titulo,
                moduloID: moduloID,
                formato:modulo.conteudos[index].tipo,
                concluido: Concluido.length>0 ? Concluido[0].concluido : false, 
                link:proximo()
            }
            item.titulo !=0 && conteudos.push(item)
        }
    }
    const siglaTrilha = trilhasIDSigla.trilhas.filter(item=>item.ID == trilhaID)[0]?.sigla
    const ultimoModulo = avaliacoes_usuario.filter(item=>item?.codigo_conteudo.slice(3,10)=="MOD0-C0")[0] ? Math.max(...[...new Set(avaliacoes_usuario.filter(item=>item.codigo_conteudo.slice(0,2)==siglaTrilha).map((item)=>Number(item.codigo_conteudo[6])))]) : 0
    return [conteudos,ultimoModulo,checkSobre]
}

const progresso = async(ConteudosCMS,userID,token)=>{
    //Modulos Concluidos pelo usuario
    const modulos_usuario = await consultarAvaliacaoConclusaoPorUsuario(userID,token)
    const UsuarioConclusoes = (codigoTrilha,modulos_usuario,modulosID)=>{
        return modulosID.map(modulo=>{
            const cont = modulos_usuario
            ?.filter(item=>item.codigo_conteudo.slice(0,2)==codigoTrilha)
            .map((item)=>{return {modulo:item.codigo_conteudo[6],conteudo:item.codigo_conteudo[9]}})
            .filter(item=>modulo==item.modulo).length
            return {modulo:modulo,conteudosConcluidos:cont}
        })
    }
    //Modulos no CMS
    const conteudos_por_modulo = ConteudosCMS.map(trilha=>{
        return {
            TrilhaID: trilha.id,
            titulo : trilha.titulo,
            codigoTrilha:trilha.conteudo[1].conteudos[0]?.codigo.slice(0,2),
            qtd :trilha.conteudo.map((item)=>{return {modulo : item.moduloId, conteudosQTD : item.conteudos.length}})
        }
    })

    conteudos_por_modulo.forEach(item=>{
        const conclusoes = UsuarioConclusoes(item.codigoTrilha,modulos_usuario,[...Array(item.qtd.length).keys()])
        item.qtd.forEach(element=>{
            element.conclusao=conclusoes.filter(conclusao=>conclusao.modulo==element.modulo)[0]?.conteudosConcluidos
            element.modulo != 0 && element.conteudosQTD>0 ? 
            element.progresso=((95/(item.qtd.length-1))/element.conteudosQTD)*element.conclusao:
            element.progresso=(5/element.conclusao)*element.conclusao
            if(element.conclusao == 0) element.progresso=0
            if(element.modulo==0){
                element.finalizado = element.progresso == (5/item.qtd[0].conteudosQTD)
            }else{
                element.finalizado = element.progresso == 95/(item.qtd.length-1)
            }
        })
        item.progresso = Math.round(item.qtd.reduce((accumulator, currentValue) => {return accumulator + currentValue.progresso},0))
    })
    return conteudos_por_modulo

}
export {modulosDataTransform,conteudosDataTransform,progresso}
