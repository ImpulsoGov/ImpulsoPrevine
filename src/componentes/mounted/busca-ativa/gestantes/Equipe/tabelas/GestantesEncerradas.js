import { PainelBuscaAtiva, Spinner } from "@impulsogov/design-system";
import identificacaoAtendimentoOdontologico from "../../../../../../data/identificacao_atendimento_odontologico.json";
import identificacaoExameHivSifilis from "../../../../../../data/identificacao_exame_hiv_sifilis.json";
import {
    IDFiltrosGestantes,
    IDFiltrosOrdenacaoGestantes,
    IntFiltrosGestantesEquipe,
    datefiltrosGestantes,
    rotulosfiltrosGestantes,
} from "../../../../../../helpers/FiltrosOrdenacaoAux";
import { colunasGestantesEncerradasEquipe } from "../../../../../../helpers/colunasGestantes";
import { colunasImpressaoGestantesEncerradasEquipe } from "../../../../../../helpers/colunasImpressaoGestantesEquipe";
import { labelsModalImpressaoEquipe } from "../../../../../../helpers/labelsModalImpressao";
import {
    larguraColunasGestantesEncerradasEquipePaisagem,
    larguraColunasGestantesEncerradasEquipeRetrato,
} from "../../../../../../helpers/larguraColunasGestantesEquipe";

const TabelaEquipeGestantesEncerradas = ({
    tabelaDataEquipe,
    tabelaData,
    setTabelaData,
    trackObject,
    aba,
    sub_aba,
    showSnackBar,
    setShowSnackBar,
    filtros_aplicados,
    setFiltros_aplicados,
    liberarPesquisa,
}) => {
    const tabelaDataEquipeGestantesEncerradas = tabelaDataEquipe
        ?.filter((item) => item.id_status_usuario == 9)
        ?.map((item) => ({
            ...item,
            idade_gestacional_atual: item.gestacao_idade_gestacional_atual,
        }));
    return tabelaDataEquipeGestantesEncerradas &&
        tabelaDataEquipe &&
        tabelaData ? (
        <>
            <PainelBuscaAtiva
                liberarPesquisa={liberarPesquisa}
                key="TabelaChildGestantesEncerradas"
                trackObject={trackObject}
                lista="PRÉ-NATAL GESTANTES ENCERRADAS"
                divisorVertical={[1, 9]}
                largura_colunas_impressao={{
                    paisagem: larguraColunasGestantesEncerradasEquipePaisagem,
                    retrato: larguraColunasGestantesEncerradasEquipeRetrato,
                }}
                colunasImpressao={colunasImpressaoGestantesEncerradasEquipe}
                listas_auxiliares={{
                    identificacao_atendimento_odontologico:
                        identificacaoAtendimentoOdontologico.identificacao_atendimento_odontologico,
                    identificacao_exame_sifilis_hiv:
                        identificacaoExameHivSifilis.identificacao_exame_hiv_sifilis,
                }}
                lista_mixpanel="pre_natal"
                propAgrupamentoImpressao="acs_nome"
                propImpressaoSemPersonalizacao="acs_nome"
                labelsModalImpressao={labelsModalImpressaoEquipe}
                aba={aba}
                sub_aba={sub_aba}
                dadosFiltros={[
                    {
                        data: [
                            ...new Set(
                                tabelaDataEquipeGestantesEncerradas.map(
                                    (item) => item.acs_nome
                                )
                            ),
                        ],
                        filtro: "acs_nome",
                        rotulo: "Filtrar por Profissional Responsável",
                    },
                    {
                        data: ["Maior ou igual a 6", "Menor que 6"],
                        filtro: "consultas_pre_natal_validas",
                        rotulo: "Filtrar por número de consultas",
                    },
                    {
                        data: [
                            ...new Set(
                                tabelaDataEquipeGestantesEncerradas.map(
                                    (item) =>
                                        item.id_atendimento_odontologico.toString()
                                )
                            ),
                        ],
                        labels: { 1: "Sim", 2: "Não" },
                        filtro: "id_atendimento_odontologico",
                        rotulo: "Filtrar por atendimento odontológico",
                    },
                    {
                        data: [
                            ...new Set(
                                tabelaDataEquipeGestantesEncerradas.map(
                                    (item) =>
                                        item.id_exame_hiv_sifilis.toString()
                                )
                            ),
                        ],
                        labels: [
                            ...new Set(
                                identificacaoExameHivSifilis.identificacao_exame_hiv_sifilis.map(
                                    (item) => item.exame_hiv_sifilis_descricao
                                )
                            ),
                        ],
                        filtro: "id_exame_hiv_sifilis",
                        rotulo: "Filtrar por identificação do exame de sífilis e HIV",
                    },
                    {
                        data: [
                            ...new Set(
                                tabelaDataEquipeGestantesEncerradas.map(
                                    (item) => item.gestacao_quadrimestre
                                )
                            ),
                        ],
                        filtro: "gestacao_quadrimestre",
                        rotulo: "Filtrar por quadrimestre",
                    },
                ]}
                painel="equipe"
                tabela={{
                    colunas: colunasGestantesEncerradasEquipe,
                    data: tabelaDataEquipeGestantesEncerradas,
                }}
                data={tabelaData}
                setData={setTabelaData}
                rowHeight={65}
                datefiltros={datefiltrosGestantes}
                IntFiltros={IntFiltrosGestantesEquipe}
                IDFiltros={IDFiltrosGestantes}
                rotulosfiltros={rotulosfiltrosGestantes}
                IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
                atualizacao={new Date(
                    tabelaDataEquipeGestantesEncerradas.reduce(
                        (maisRecente, objeto) => {
                            const dataAtual = new Date(
                                objeto.dt_registro_producao_mais_recente
                            );
                            const dataMaisRecenteAnterior = new Date(
                                maisRecente
                            );
                            return dataAtual > dataMaisRecenteAnterior
                                ? objeto.dt_registro_producao_mais_recente
                                : maisRecente;
                        },
                        "2000-01-01"
                    )
                ).toLocaleString("pt-BR", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })}
                showSnackBar={showSnackBar}
                setShowSnackBar={setShowSnackBar}
                filtros_aplicados={filtros_aplicados}
                setFiltros_aplicados={setFiltros_aplicados}
            />
        </>
    ) : (
        <Spinner />
    );
};
export { TabelaEquipeGestantesEncerradas };
