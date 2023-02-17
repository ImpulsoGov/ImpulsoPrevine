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

const conteudosDataTransform = (conteudosCMS,trilhaID,userID)=>{
    const conteudos = []
    console.log(conteudosCMS)
    conteudosCMS.forEach((modulo) => {
        let moduloID = modulo.moduloId
        modulo.conteudos.forEach((element,index) => {
            conteudos.push({
                id: index+1,
                titulo: element.titulo,
                moduloID: moduloID,
                formato:element.tipo,
                concluido: true, 
                link:"/conteudo?codigo_conteudo="+element.codigo+"&trilhaID="+trilhaID
            })
        });
    
    });
    return conteudos
}

export {modulosDataTransform,conteudosDataTransform}