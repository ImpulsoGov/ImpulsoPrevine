"use client";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import {
    ButtonLightSubmit,
    CardAlert,
    PanelSelector,
    TituloTexto,
} from "@impulsogov/design-system";
import type { Mixpanel } from "mixpanel-browser";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { CardsComExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/CardsComExame";
import { CardsSemExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/CardsSemExame";
import { TabelaEquipeComExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/TabelaEquipeComExame";
import { TabelaEquipeSemExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/TabelaEquipeSemExame";

interface CitoEquipeProps {
    tabelaDataEquipe: any;
    tabelaData: any;
    setTabelaData: Dispatch<SetStateAction<any>>;
    mixpanel: Mixpanel;
    showSnackBar: any;
    setShowSnackBar: Dispatch<SetStateAction<any>>;
    setFiltros_aplicados: Dispatch<SetStateAction<any>>;
    dispararEventoAbrirImpressaoEquipe: () => void;
    Voltar: () => void;
    activeTitleTabIndex: number;
    activeTabIndex: number;
    setActiveTabIndex: Dispatch<SetStateAction<number>>;
    setActiveTitleTabIndex: Dispatch<SetStateAction<number>>;
}
export const CitoEquipe: React.FC<CitoEquipeProps> = ({
    tabelaDataEquipe,
    tabelaData,
    setTabelaData,
    mixpanel,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
    dispararEventoAbrirImpressaoEquipe,
    Voltar,
    activeTitleTabIndex,
    activeTabIndex,
    setActiveTabIndex,
    setActiveTitleTabIndex,
}) => {
    const dataAtual = Date.now();
    const CardsChildSemExame = (
        <CardsSemExame tabelaDataEquipe={tabelaDataEquipe} />
    );
    const CardsChildComExame = (
        <CardsComExame tabelaDataEquipe={tabelaDataEquipe} />
    );
    const TabelaChildSemExame = (
        <TabelaEquipeSemExame
            tabelaDataEquipe={tabelaDataEquipe}
            liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
            tabelaData={tabelaData}
            setTabelaData={setTabelaData}
            mixpanel={mixpanel}
            aba={activeTitleTabIndex}
            sub_aba={activeTabIndex}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
        />
    );
    const TabelaChildComExame = (
        <TabelaEquipeComExame
            tabelaDataEquipe={tabelaDataEquipe}
            liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
            tabelaData={tabelaData}
            setTabelaData={setTabelaData}
            mixpanel={mixpanel}
            aba={activeTitleTabIndex}
            sub_aba={activeTabIndex}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
        />
    );
    const Children = [
        [CardsChildSemExame, TabelaChildSemExame],
        [CardsChildComExame, TabelaChildComExame],
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
                titulo="Lista Nominal de Citopatológico"
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
                    components={[Children]}
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
                                label: "PESSOAS COM EXAME A SER REALIZADO",
                            },
                            {
                                label: "PESSOAS EM DIA COM EXAME",
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
