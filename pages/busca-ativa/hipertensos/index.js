import { PanelSelector, CardAlert, TituloTexto, ButtonLight, PainelBuscaAtiva} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { DATA_STUDIO_URL_HIPERTENSOS_EQUIPE, DATA_STUDIO_URL_HIPERTENSOS_COORDENACAO_APS,DATA_STUDIO_URL_HIPERTENSOS_COORDENACAO_APS_GRAFICOS } from "../../../constants/dataStudio";
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import style from "../../duvidas/Duvidas.module.css"
import { urlGenBuscaAtivaCoordenacaoAPS,urlGenBuscaAtivaEquipe, urlGenBuscaAtivaCoordenacaoAPSGraficos } from "../../../helpers/urlGenBuscaAtiva";
import { colunasHipertensao } from "../../../helpers/colunasHipertensao";
import { tabelaHipertensao } from "../../../services/busca_ativa/Hipertensao";

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
  const [tabelaData, setTabelaData] = useState();

  const HipertensaoTabelaData = async()=> await tabelaHipertensao('355060','0001540971',session?.user?.access_token)
  useEffect(()=>{
      session &&  
      HipertensaoTabelaData().then((response)=>{
        console.log(response)
        setTabelaData(response)
        console.log(tabelaData)
  })},[session]) 
  console.log(tabelaData)

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
    if(session.user.perfis.includes(5) || session.user.perfis.includes(9)){
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
              tabelaData &&
              <PainelBuscaAtiva
                cards={[
                  {
                    descricao: 'Total de pessoas com Hipertensão',
                    valor: 102
                  },
                  {
                    descricao: 'Total de pessoas com Hipertensão',
                    valor: 102
                  },
                  {
                    descricao: 'Total de pessoas com Hipertensão',
                    valor: 102
                  },
                  {
                    descricao: 'Total de pessoas com Hipertensão',
                    valor: 102
                  }
                ]}
                dadosFiltros={[
                  {
                    data: [
                      'equipe sol',
                      'equipe lua',
                      'equipe estrela'
                    ],
                    filtro: 'nome_equipe',
                    rotulo: 'Filtrar por nome da equipe'
                  },
                  {
                    data: [
                      '12345678',
                      '87654321',
                      '18273645'
                    ],
                    filtro: 'ine',
                    rotulo: 'Filtrar por INE da equipe'
                  },
                  {
                    data: [
                      'Luana',
                      'Soraia',
                      'Estela'
                    ],
                    filtro: 'acs_nome_cadastro',
                    rotulo: 'Filtrar por nome do ACS'
                  },
                  {
                    data: [
                      'Diagnostico Clinico',
                      'Autorreferido'
                    ],
                    filtro: 'identificacao_condicao',
                    rotulo: 'Filtrar por tipo de diagnóstico'
                  },
                  {
                    data: [
                      'apenas em dia',
                      'consulta e aferição de PA em dia',
                      'apenas aferição de PA em dia',
                      'nada em dia'
                    ],
                    filtro: '',
                    rotulo: 'Filtrar por faixa etária'
                  }
                ]}
                painel="hipertensao"
                tabela={{
                  colunas: colunasHipertensao,
                  data:tabelaData
                }}
                visualizacao="equipe"
              />
            }
        </>
      )
  }}
  return(
    <p>{status}</p>
  )
}

export default Index;