import { PanelSelector, CardAlert, TituloTexto, ButtonLight, PainelBuscaAtiva , ScoreCardGrid } from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import style from "../../duvidas/Duvidas.module.css"
import { colunasHipertensao } from "../../../helpers/colunasHipertensao";
import { tabelaHipertensaoEquipe , tabelaHipertensaoAPS } from "../../../services/busca_ativa/Hipertensao";

export async function getServerSideProps(ctx) {
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
  const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
  const [tabelaDataAPS, setTabelaDataAPS] = useState();
  const HipertensaoTabelaDataAPS = async()=> await tabelaHipertensaoAPS(session?.user?.municipio,session?.user?.access_token)
  const HipertensaoTabelaDataEquipe = async()=> await tabelaHipertensaoEquipe(session?.user?.municipio,session?.user?.equipe,session?.user?.access_token)
  useEffect(()=>{
      session &&  session.user.perfis.includes(9) &&
      HipertensaoTabelaDataEquipe().then((response)=>{
        setTabelaDataEquipe(response)
  })},[session]) 
  useEffect(()=>{
    session && session.user.perfis.includes(8) &&
    HipertensaoTabelaDataAPS().then((response)=>{
      setTabelaDataAPS(response)
})},[session]) 

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
      label: "Indicador Hipertensão",
    }
  ]
  if(session){
    console.log(session.user)
    if(session.user.perfis.includes(9)){
      return (
        <>
          <div className={style.BotaoVoltar}>
          <ButtonLight icone={{posicao: 'right',
            url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
            label="VOLTAR" link="/inicio"/>
          </div>
          <TituloTexto
                  titulo="Lista Nominal Hipertensão"
                  texto="Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos."
                  imagem = {{posicao: null,url: ''}}
              />
          <CardAlert
                destaque="IMPORTANTE: "
                msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
            />  
            {
              tabelaDataEquipe &&
              <ScoreCardGrid
                valores={[
                  {
                    descricao: 'Total de pessoas com hipertensão',
                    valor: tabelaDataEquipe.length
                  },
                  {
                    descricao: 'Total de pessoas com consulta e aferição de PA em dia',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa == "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)
                  },
                  {
                    descricao: 'Total de pessoas com diagnóstico autorreferido',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.identificacao_condicao_hipertensao == "Autorreferida") ?
                      acumulador + 1 : acumulador;
                    },0)
                  },
                  {
                    descricao: 'Total de pessoas com diagnóstico clínico',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.identificacao_condicao_hipertensao == "Diagnóstico Clínico") ?
                      acumulador + 1 : acumulador;
                    },0)
                  }
                ]}
             />
            }
            {
              tabelaDataEquipe &&
              <PainelBuscaAtiva
                dadosFiltros={[
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.equipe_nome_cadastro))],
                    filtro: 'equipe_nome_cadastro',
                    rotulo: 'Filtrar por nome da equipe'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.equipe_ine_cadastro))],
                    filtro: 'equipe_ine_cadastro',
                    rotulo: 'Filtrar por INE da equipe'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.acs_nome_cadastro))],
                    filtro: 'acs_nome_cadastro',
                    rotulo: 'Filtrar por nome do ACS'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.identificacao_condicao_hipertensao))],
                    filtro: 'identificacao_condicao_hipertensao',
                    rotulo: 'Filtrar por tipo de diagnóstico'
                  },
                ]}
                painel="hipertensao"
                tabela={{
                  colunas: colunasHipertensao,
                  data:tabelaDataEquipe
                }}
              />
            }
        </>
      )
  }
  if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
    return (
      <>
        <div className={style.BotaoVoltar}>
        <ButtonLight icone={{posicao: 'right',
          url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
          label="VOLTAR" link="/inicio"/>
        </div>
        <TituloTexto
                titulo="Lista Nominal Hipertensão"
                texto="Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos."
                imagem = {{posicao: null,url: ''}}
            />
        <CardAlert
              destaque="IMPORTANTE: "
              msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
          />  
          {
            tabelaDataAPS &&
            <PainelBuscaAtiva
              dadosFiltros={[
                {
                  data: [...new Set(tabelaDataAPS.map(item => item.equipe_nome_cadastro))],
                  filtro: 'equipe_nome_cadastro',
                  rotulo: 'Filtrar por nome da equipe'
                },
                {
                  data: [...new Set(tabelaDataAPS.map(item => item.equipe_ine_cadastro))],
                  filtro: 'equipe_ine_cadastro',
                  rotulo: 'Filtrar por INE da equipe'
                },
                {
                  data: [...new Set(tabelaDataAPS.map(item => item.acs_nome_cadastro))],
                  filtro: 'acs_nome_cadastro',
                  rotulo: 'Filtrar por nome do ACS'
                },
                {
                  data: [...new Set(tabelaDataAPS.map(item => item.identificacao_condicao_hipertensao))],
                  filtro: 'identificacao_condicao_hipertensao',
                  rotulo: 'Filtrar por tipo de diagnóstico'
                },
              ]}
              painel="hipertensao"
              tabela={{
                colunas: colunasHipertensao,
                data:tabelaDataAPS
              }}
            />
          }
      </>
    )
}
}
return(
    <p>{status}</p>
  )
}

export default Index;