import {
    CardAlert,
    TituloTexto, 
    ButtonLightSubmit, 
    PanelSelector,
  } from "@impulsogov/design-system";
import { dispararEventoAbrirImpressaoEquipe } from "@helpers/eventosImpressaoHotjar";  
import React, { Dispatch, SetStateAction } from "react";
import { TabelaAPSQuadrimestreAtual as TabelaEquipeQuadrimestreAtual } from "@componentes/mounted/busca-ativa/vacinacao/equipe/quadrimestre_atual/tabelaQuadrimestreAtual";
import { TabelaAPSQuadrimestreProximo as TabelaEquipeQuadrimestreProximo } from "@componentes/mounted/busca-ativa/vacinacao/equipe/proximo_quadrimestre/tabelaQuadrimestreProximo";
import { TabelaAPSQuadrimestreFuturo as TabelaEquipeQuadrimestreFuturo } from "@componentes/mounted/busca-ativa/vacinacao/equipe/quadrimestre_futuro/tabelaQuadrimestreFuturo";

interface VacinacaoEquipeProps {
    tabelaDataEquipe: any;
    tabelaData: any;
    setTabelaData: Dispatch<SetStateAction<any>>;
    showSnackBar: any;
    setShowSnackBar: Dispatch<SetStateAction<any>>;
    Voltar: ()=>void;
    session: any;
    activeTabIndex: number;
    setActiveTabIndex: Dispatch<SetStateAction<any>>;
    activeTitleTabIndex: number;
    setActiveTitleTabIndex: Dispatch<SetStateAction<any>>;
    filtros_aplicados: any;
    setFiltros_aplicados: Dispatch<SetStateAction<any>>;
}

export const VacinacaoEquipe : React.FC<VacinacaoEquipeProps> = async ({
    tabelaDataEquipe,
    tabelaData,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    Voltar,
    session,
    activeTabIndex,
    setActiveTabIndex,
    activeTitleTabIndex,
    setActiveTitleTabIndex,
    filtros_aplicados,
    setFiltros_aplicados
}) => { 
    const Children =  
    [
      [
          [
            <TabelaEquipeQuadrimestreAtual
                tabelaDataAPS={tabelaDataEquipe} 
                tabelaData={tabelaData} 
                setTabelaData={setTabelaData}
                showSnackBar={showSnackBar}
                setShowSnackBar={setShowSnackBar}
                aba={activeTitleTabIndex}
                subAba={activeTabIndex}
                liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
                filtros_aplicados={filtros_aplicados}
                setFiltros_aplicados={setFiltros_aplicados}
                key="TabelaEquipeQuadrimestreAtual"
            />
          ],
      ],
      [
        [
          <TabelaEquipeQuadrimestreProximo
              tabelaDataAPS={tabelaDataEquipe} 
              tabelaData={tabelaData} 
              setTabelaData={setTabelaData}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              aba={activeTitleTabIndex}
              subAba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
              filtros_aplicados={filtros_aplicados}
              setFiltros_aplicados={setFiltros_aplicados}
              key="TabelaEquipeQuadrimestreAtual"
          />
        ],
    ],
    [
      [
        <TabelaEquipeQuadrimestreFuturo
            tabelaDataAPS={tabelaDataEquipe} 
            tabelaData={tabelaData} 
            setTabelaData={setTabelaData}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            aba={activeTitleTabIndex}
            subAba={activeTabIndex}
            liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
            filtros_aplicados={filtros_aplicados} 
            setFiltros_aplicados={setFiltros_aplicados}
            key="TabelaEquipeQuadrimestreAtual"
        />
      ],
  ],
    ]

    return <>
    <div 
        style={
            window.screen.width > 1024 ?
            {padding: "30px 80px 30px 80px",display: "flex"} :
            {padding: "30px 0 0 5px",display: "flex"} 
        }
    >
          <ButtonLightSubmit 
              icon='https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'
              label="VOLTAR" 
              submit={Voltar}
          />
    </div>
    <TituloTexto
            titulo="Lista Nominal de Vacinação"
            texto=""
            imagem = {{posicao: null,url: ''}}
    />
    <CardAlert
        destaque="IMPORTANTE: "
        msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
    />  
    <div 
        style={{
            marginLeft : window.screen.width > 1024 ?  "80px" : "20px",
            marginTop : "30px",
            color: "#1F1F1F",
            fontSize: "22px",
            fontFamily: "Inter",
            fontWeight: 500,
            lineHeight: "130%",
        }}
    >
    {session.user.municipio}
    </div>
    {
      session?.user && tabelaDataEquipe.length > 0 &&
      <PanelSelector
          components={Children}
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
                  label: 'LISTA NOMINAL'
                },
              ],  
              [
                {
                  label: 'LISTA NOMINAL'
                },
              ],  
              [
                {
                  label: 'LISTA NOMINAL'
                },
              ],  
                ]}
            titles={[
              {
                  label: 'QUADRIMESTRE ATUAL'
              },
              {
                  label: 'PRÓXIMO QUADRIMESTRE'
              },
              {
                  label: 'QUADRIMESTRES FUTUROS'
              },

          ]}
      />
    }
</>
}