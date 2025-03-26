import trilhasIDSigla from "../data/trilhas.json" assert { type: "json" };
import { acessoModulosTrilhasClient } from "../services/acessoTrilha";
import { consultarAvaliacaoConclusaoPorUsuario } from "../services/capacitacao";

const modulosDataTransform = async (ConteudosCMS, TrilhaID, userID, token) => {
    const modulos = [];
    const modulosLiberadosRes = await acessoModulosTrilhasClient(
        userID,
        TrilhaID,
        token,
    );
    const modulosLiberados = modulosLiberadosRes
        .map((item) => item.modulos[0])
        .sort();
    return progresso(ConteudosCMS, userID, token).then((res) => {
        const trilha = ConteudosCMS.map((trilha) => {
            if ((trilha.id = TrilhaID)) return trilha;
        });
        trilha[0].conteudo.forEach((element, index) => {
            modulos.push({
                titulo: element.titulo,
                id: element.moduloId,
                liberado: modulosLiberados.includes(element.moduloId),
                concluido: res[0].qtd[index].finalizado,
            });
        });
        return modulos;
    });
};

const conteudosDataTransform = async (
    conteudosCMS,
    trilhaID,
    userID,
    token,
) => {
    const conteudos = [];
    const avaliacoesUsuario = await consultarAvaliacaoConclusaoPorUsuario(
        userID,
        token,
    );
    const checkSobre =
        avaliacoesUsuario.filter(
            (item) => item.codigo_conteudo.slice(3, 10) == "MOD0-C0",
        ).length > 0;
    for (let i = 0; i < conteudosCMS.length; i++) {
        const moduloID = conteudosCMS[i].moduloId;
        const modulo = conteudosCMS[i];
        for (let index = 0; index < modulo.conteudos.length; index++) {
            const proximo = () => {
                let urlBase = `/conteudo?codigo_conteudo=${modulo.conteudos[index].codigo}&trilhaID=${trilhaID}&proximo=`;
                for (let i = index; i < modulo.conteudos.length; i++) {
                    if (i + 1 < modulo.conteudos.length) {
                        const urlParam = `${encodeURIComponent(`/conteudo?codigo_conteudo=${modulo.conteudos[i + 1].codigo}&trilhaID=${trilhaID}&proximo=`)}`;
                        urlBase = urlBase + urlParam;
                    } else {
                        const urlParam = `${encodeURIComponent(`/capacitacao?trilhaID=${trilhaID}`)}`;
                        urlBase = urlBase + urlParam;
                    }
                }
                return urlBase;
            };
            const Concluido = avaliacoesUsuario
                ? avaliacoesUsuario?.filter(
                      (item) =>
                          item.codigo_conteudo ==
                          modulo.conteudos[index].codigo,
                  )
                : false;
            const item = {
                id: index + 1,
                titulo: modulo.conteudos[index].titulo,
                moduloID: moduloID,
                formato: modulo.conteudos[index].tipo,
                concluido:
                    Concluido.length > 0 ? Concluido[0].concluido : false,
                link: proximo(),
            };
            item.titulo != 0 && conteudos.push(item);
        }
    }
    const siglaTrilha = trilhasIDSigla.trilhas.filter(
        (item) => item.ID == trilhaID,
    )[0]?.sigla;
    const ultimoModulo = avaliacoesUsuario.filter(
        (item) => item?.codigo_conteudo.slice(3, 10) == "MOD0-C0",
    )[0]
        ? Math.max(
              ...[
                  ...new Set(
                      avaliacoesUsuario
                          .filter(
                              (item) =>
                                  item.codigo_conteudo.slice(0, 2) ==
                                  siglaTrilha,
                          )
                          .map((item) => Number(item.codigo_conteudo[6])),
                  ),
              ],
          )
        : 0;
    return [conteudos, ultimoModulo, checkSobre];
};

const progresso = async (ConteudosCMS, userID, token) => {
    //Modulos Concluidos pelo usuario
    const modulosUsuario = await consultarAvaliacaoConclusaoPorUsuario(
        userID,
        token,
    );
    const UsuarioConclusoes = (codigoTrilha, modulos_usuario, modulosID) => {
        return modulosID.map((modulo) => {
            const cont = modulos_usuario
                ?.filter(
                    (item) => item.codigo_conteudo.slice(0, 2) == codigoTrilha,
                )
                .map((item) => {
                    return {
                        modulo: item.codigo_conteudo[6],
                        conteudo: item.codigo_conteudo[9],
                    };
                })
                .filter((item) => modulo == item.modulo).length;
            return { modulo: modulo, conteudosConcluidos: cont };
        });
    };
    //Modulos no CMS
    const conteudosPorModulo = ConteudosCMS.map((trilha) => {
        return {
            TrilhaID: trilha.id,
            titulo: trilha.titulo,
            codigoTrilha: trilha.conteudo[1].conteudos[0]?.codigo.slice(0, 2),
            qtd: trilha.conteudo.map((item) => {
                return {
                    modulo: item.moduloId,
                    conteudosQTD: item.conteudos.length,
                };
            }),
        };
    });

    conteudosPorModulo.forEach((item) => {
        const conclusoes = UsuarioConclusoes(
            item.codigoTrilha,
            modulosUsuario,
            [...Array(item.qtd.length).keys()],
        );
        item.qtd.forEach((element) => {
            element.conclusao = conclusoes.filter(
                (conclusao) => conclusao.modulo == element.modulo,
            )[0]?.conteudosConcluidos;
            element.modulo != 0 && element.conteudosQTD > 0
                ? (element.progresso =
                      (95 / (item.qtd.length - 1) / element.conteudosQTD) *
                      element.conclusao)
                : (element.progresso =
                      (5 / element.conclusao) * element.conclusao);
            if (element.conclusao == 0) element.progresso = 0;
            if (element.modulo == 0) {
                element.finalizado =
                    element.progresso == 5 / item.qtd[0].conteudosQTD;
            } else {
                element.finalizado =
                    element.progresso == 95 / (item.qtd.length - 1);
            }
        });
        item.progresso = Math.round(
            item.qtd.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.progresso;
            }, 0),
        );
    });
    return conteudosPorModulo;
};
export { modulosDataTransform, conteudosDataTransform, progresso };
