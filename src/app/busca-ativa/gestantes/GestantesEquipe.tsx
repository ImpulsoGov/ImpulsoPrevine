import { dispararEventoAbrirImpressaoEquipe } from "@/helpers/eventosImpressaoHotjar";
import { CardsEquipe } from "@componentes/mounted/busca-ativa/gestantes/Equipe/cardsEquipe";
import { TabelaEquipeGestantesAtivas } from "@componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesAtivas";
import { TabelaEquipeGestantesEncerradas } from "@componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesEncerradas";
import { TabelaEquipeGestantesSemDUM } from "@componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesSemDUM";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import {
    ButtonLightSubmit,
    CardAlert,
    PanelSelector,
    TituloTexto,
} from "@impulsogov/design-system";
import mixpanel from "mixpanel-browser";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { PainelComLegenda } from "./PainelComLegenda";

interface GestantesEquipeProps {
    tabelaDataEquipe: any;
    tabelaData: any;
    setTabelaData: Dispatch<SetStateAction<any>>;
    activeTabIndex: any;
    setActiveTabIndex: Dispatch<SetStateAction<any>>;
    activeTitleTabIndex: any;
    setActiveTitleTabIndex: Dispatch<SetStateAction<any>>;
    Voltar: () => void;
    showSnackBar: any;
    setShowSnackBar: Dispatch<SetStateAction<any>>;
    filtros_aplicados: any;
    setFiltros_aplicados: Dispatch<SetStateAction<any>>;
}

export const GestantesEquipe: React.FC<GestantesEquipeProps> = ({
    tabelaDataEquipe,
    tabelaData,
    setTabelaData,
    activeTabIndex,
    setActiveTabIndex,
    activeTitleTabIndex,
    setActiveTitleTabIndex,
    Voltar,
    showSnackBar,
    setShowSnackBar,
    filtros_aplicados,
    setFiltros_aplicados,
}) => {
    const dataAtual = Date.now();
    const Children = [
        [
            [
                <CardsEquipe
                    tabelaDataEquipe={tabelaDataEquipe}
                    key="CardsEquipeGestantesAtivas"
                />,
                <TabelaEquipeGestantesAtivas
                    tabelaDataEquipe={tabelaDataEquipe}
                    tabelaData={tabelaData}
                    setTabelaData={setTabelaData}
                    trackObject={mixpanel}
                    aba={activeTitleTabIndex}
                    sub_aba={activeTabIndex}
                    showSnackBar={showSnackBar}
                    setShowSnackBar={setShowSnackBar}
                    filtros_aplicados={filtros_aplicados}
                    setFiltros_aplicados={setFiltros_aplicados}
                    liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
                    key="TabelaEquipeGestantesAtivas"
                />,
                <PainelComLegenda key="PainelComLegendaGestantesAtivas" />,
            ],
            [
                <CardsEquipe tabelaDataEquipe={tabelaDataEquipe} key="" />,
                <TabelaEquipeGestantesSemDUM
                    tabelaDataEquipe={tabelaDataEquipe}
                    tabelaData={tabelaData}
                    setTabelaData={setTabelaData}
                    mixpanel={mixpanel}
                    aba={activeTitleTabIndex}
                    sub_aba={activeTabIndex}
                    showSnackBar={showSnackBar}
                    setShowSnackBar={setShowSnackBar}
                    liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
                    filtros_aplicados={filtros_aplicados}
                    setFiltros_aplicados={setFiltros_aplicados}
                    key="TabelaEquipeGestantesSemDUM"
                />,
                <PainelComLegenda key="PainelComLegendaGestantesSemDUM" />,
            ],
            [
                <CardsEquipe
                    tabelaDataEquipe={tabelaDataEquipe}
                    key="CardsEquipeGestantesEncerradas"
                />,
                <TabelaEquipeGestantesEncerradas
                    tabelaDataEquipe={tabelaDataEquipe}
                    tabelaData={tabelaData}
                    setTabelaData={setTabelaData}
                    trackObject={mixpanel}
                    aba={activeTitleTabIndex}
                    sub_aba={activeTabIndex}
                    showSnackBar={showSnackBar}
                    setShowSnackBar={setShowSnackBar}
                    filtros_aplicados={filtros_aplicados}
                    setFiltros_aplicados={setFiltros_aplicados}
                    liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
                    key="TabelaEquipeGestantesEncerradas"
                />,
                <PainelComLegenda key="PainelComLegendaGestantesEncerradas" />,
            ],
        ],
    ];

    return (
        <>
            <div
                style={
                    window.screen.width > 1024
                        ? { padding: "30px 80px 30px 80px", display: "flex" }
                        : { padding: "30px 0 0 5px", display: "flex" }
                }
            >
                <ButtonLightSubmit
                    icon="https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG"
                    label="VOLTAR"
                    submit={Voltar}
                />
            </div>
            <TituloTexto
                titulo="Lista Nominal de Pré-Natal"
                texto=""
                imagem={{ posicao: null, url: "" }}
            />
            <CardAlert
                destaque="IMPORTANTE: "
                msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
            />
            <MunicipioQuadrimestre data={dataAtual} />
            {tabelaData && (
                <PanelSelector
                    components={Children}
                    conteudo="components"
                    states={{
                        activeTabIndex: Number(activeTabIndex),
                        setActiveTabIndex: setActiveTabIndex,
                        activeTitleTabIndex: activeTitleTabIndex,
                        setActiveTitleTabIndex: setActiveTitleTabIndex,
                    }}
                    list={[
                        [
                            {
                                label: "GESTANTES ATIVAS",
                            },
                            {
                                label: "GESTANTES SEM DUM",
                            },
                            {
                                label: "GESTANTES ENCERRADAS",
                            },
                        ],
                    ]}
                    titles={[
                        {
                            label: "",
                        },
                    ]}
                />
            )}
        </>
    );
};
