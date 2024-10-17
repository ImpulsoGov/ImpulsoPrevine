import { 
    CardAlert,
    TituloTexto, 
    PanelSelector,
    ButtonLightSubmit
} from "@impulsogov/design-system";
import { Grafico } from "@componentes/mounted/busca-ativa/citopatologico/APS/Grafico";
import { TabelaAPSSemExame } from "@componentes/mounted/busca-ativa/citopatologico/APS/TabelaAPSSemExame";
import { TabelaAPSComExame } from "@componentes/mounted/busca-ativa/citopatologico/APS/TabelaAPSComExame";
import { Cards } from "@componentes/mounted/busca-ativa/citopatologico/APS/Cards";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import React, { Dispatch, SetStateAction } from "react";
import { Mixpanel } from "mixpanel-browser";

interface CitoAPSProps {
  tabelaDataAPS: any; 
  tabelaData: any; 
  setTabelaData: Dispatch<SetStateAction<any>>; 
  mixpanel: Mixpanel; 
  showSnackBar: any; 
  setShowSnackBar: Dispatch<SetStateAction<any>>;
  filtros_aplicados: any;
  setFiltros_aplicados: Dispatch<SetStateAction<any>>; 
  dispararEventoAbrirImpressaoAPS: () => void;
  Voltar: () => void;
  activeTitleTabIndex: number;
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  setActiveTitleTabIndex: Dispatch<SetStateAction<number>>;
}

export const CitoAPS : React.FC<CitoAPSProps>= ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    mixpanel,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
    dispararEventoAbrirImpressaoAPS,
    Voltar,
    activeTitleTabIndex,
    activeTabIndex,
    setActiveTabIndex,
    setActiveTitleTabIndex
}) => {
    const dataAtual = Date.now();
    const CardsChild = <Cards tabelaDataAPS={tabelaDataAPS}/>
    const GraficoChild = <Grafico tabelaDataAPS={tabelaDataAPS}/>
    const TabelaChildSemExame = <TabelaAPSSemExame 
        tabelaDataAPS={tabelaDataAPS} 
        tabelaData={tabelaData}
        setTabelaData={setTabelaData}
        mixpanel={mixpanel}
        aba={activeTitleTabIndex}
        sub_aba={activeTabIndex}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        setFiltros_aplicados={setFiltros_aplicados}
        liberarPesquisa={dispararEventoAbrirImpressaoAPS}
    />
    const TabelaChildComExame = <TabelaAPSComExame
        tabelaDataAPS={tabelaDataAPS}
        tabelaData={tabelaData}
        setTabelaData={setTabelaData}
        mixpanel={mixpanel}
        aba={activeTitleTabIndex}
        sub_aba={activeTabIndex}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        setFiltros_aplicados={setFiltros_aplicados}
        liberarPesquisa={dispararEventoAbrirImpressaoAPS}
    />
    const Children = [[CardsChild,GraficoChild],[TabelaChildSemExame],[TabelaChildComExame]]

    return (
    <>
        <div style={{ padding: "30px 80px 30px 80px", display: "flex" }}>
            <ButtonLightSubmit 
                icon='https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'
                label="VOLTAR" 
                submit={Voltar}
            />
        </div>
        <TituloTexto
                titulo="Lista Nominal de Citopatológico"
                texto=""
                imagem = {{posicao: null,url: ''}}
        />
        <CardAlert
            destaque="IMPORTANTE: "
            msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
        />  
        <MunicipioQuadrimestre data={dataAtual} />
        <PanelSelector
            components={[Children]}
            conteudo = "components"
            states={ {
                activeTabIndex: Number(activeTabIndex),
                setActiveTabIndex: setActiveTabIndex,
                activeTitleTabIndex: activeTitleTabIndex,
                setActiveTitleTabIndex: setActiveTitleTabIndex
            } }
            list={[
                [
                    {
                        label: 'GRÁFICOS'
                    },
                    {
                        label: 'PESSOAS COM EXAME A SER REALIZADO'
                    },
                    {
                        label: 'PESSOAS EM DIA COM EXAME'
                    }
                ],
            ]}
            titles={[
                {
                    label: ''
                },
            ]}
        />
    </>
    )
}