import { PanelSelector, CardAlert, TituloTexto, ButtonLight} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { DATA_STUDIO_URL_DIABETICOS_EQUIPE, DATA_STUDIO_URL_DIABETICOS_COORDENACAO_APS , DATA_STUDIO_URL_DIABETICOS_COORDENACAO_APS_GRAFICOS } from "../../../constants/dataStudio";
import { validatetoken} from "../../../services/validateToken"
import style from "../../duvidas/Duvidas.module.css"
import { redirectHome } from "../../../helpers/redirectHome";
import { urlGenBuscaAtivaCoordenacaoAPS,urlGenBuscaAtivaEquipe,urlGenBuscaAtivaCoordenacaoAPSGraficos } from "../../../helpers/urlGenBuscaAtiva";

export async function getServerSideProps(ctx){
  const session = await getSession(ctx)
  const redirect = redirectHome(ctx,session)
  if(redirect) return redirect
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Index = ({res}) => {
  const { data: session,status } = useSession()
  const [tokenValido, setTokenValido] = useState();
  const router = useRouter()
  const panel = router.query?.painel
  const initialTitle = router.query?.initialTitle
  useEffect(()=>{
    if(session){
      validatetoken(session?.user?.access_token)
      .then(response=>{
        setTokenValido(response)
      }).catch(error=>{
        setTokenValido(false)
      })
      }
  })
  useEffect(()=>{
    if(session && session?.user?.access_token){
      if(tokenValido!=true && tokenValido!==undefined) signOut()
    }
  },[tokenValido])
  const titlesBuscaAtiva = [
    {
      label: "Indicadores Diabetes",
    },
  ]
  const faixas_etarias = ["0 a 40 anos","41 a 49 anos","50 a 59 anos","60 a 70 anos","70 anos ou mais"]
  if(session){
    const labelsBuscaAtiva = [[]]
    if(session.user.perfis.includes(8) || session.user.perfis.includes(5))  labelsBuscaAtiva[0].push({label: "APS - Geral"})
    faixas_etarias.forEach(faixa_etaria => {
      if(session.user.perfis.includes(8) || session.user.perfis.includes(5))  labelsBuscaAtiva[0].push({label: faixa_etaria})
    });
    faixas_etarias.forEach(faixa_etaria => {
      if(session.user.perfis.includes(9) || session.user.perfis.includes(5))  labelsBuscaAtiva[0].push({label: faixa_etaria})
    });
    const links = [[],[]]
    if (session.user.perfis.includes(8) || session.user.perfis.includes(5)) links[0].push(urlGenBuscaAtivaCoordenacaoAPSGraficos(DATA_STUDIO_URL_DIABETICOS_COORDENACAO_APS_GRAFICOS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo))
    faixas_etarias.forEach(faixa_etaria => {
      if (session.user.perfis.includes(8) || session.user.perfis.includes(5)) links[0].push(urlGenBuscaAtivaCoordenacaoAPS(DATA_STUDIO_URL_DIABETICOS_COORDENACAO_APS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo,faixa_etaria))
    });
    faixas_etarias.forEach(faixa_etaria => {
      if (session.user.perfis.includes(9) || session.user.perfis.includes(5)) links[0].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_DIABETICOS_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo,faixa_etaria))
    });
    return (
      <>
        <div className={style.BotaoVoltar}>
        <ButtonLight icone={{posicao: 'right',
          url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
          label="VOLTAR" link="/inicio"/>
        </div>
        <TituloTexto
                titulo="Lista Nominal Diabéticos"
                texto="Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos."
                imagem = {{posicao: null,url: ''}}
        />
        <CardAlert
              destaque="IMPORTANTE: "
              msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
          />  
        <PanelSelector
          links = {links}
          list={labelsBuscaAtiva}
          titles={titlesBuscaAtiva}
          panel={Number(panel)}
          initialTitle={Number(initialTitle)}
        />
      </>
    )
  }
  return(
    <p>{status}</p>
  )
}

export default Index;