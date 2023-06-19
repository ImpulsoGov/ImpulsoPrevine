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
    colunas: [
      {
        align: 'left',
        field: 'nome',
        headerAlign: 'center',
        headerName: 'NOME',
        width: 240
      },
      {
        align: 'center',
        field: 'cpf',
        headerAlign: 'center',
        headerName: 'CPF',
        width: 130
      },
      {
        align: 'center',
        field: 'identificacao_condicao',
        headerAlign: 'center',
        headerName: 'IDENTIFICAÇÃO DA CONDIÇÃO',
        width: 150
      },
      {
        align: 'center',
        field: 'dt_consulta_mais_recente',
        headerAlign: 'center',
        headerName: 'DATA DA CONSULTA MAIS RECENTE',
        width: 120
      },
      {
        align: 'center',
        field: 'prazo_proxima_consulta',
        headerAlign: 'center',
        headerName: 'PRAZO PARA PRÓXIMA CONSULTA',
        renderCell: () => {},
        width: 130
      },
      {
        align: 'center',
        field: 'dt_afericao_pressao_mais_recente',
        headerAlign: 'center',
        headerName: 'DATA DA AFERIÇÃO DE PA MAIS RECENTE',
        width: 130
      },
      {
        align: 'center',
        field: 'prazo_proxima_afericao_pa',
        headerAlign: 'center',
        headerName: 'PRAZO PARA PRÓXIMA AFERIÇÃO DE PA',
        renderCell: function noRefCheck() {},
        width: 130
      },
      {
        align: 'center',
        field: 'acs_nome_cadastro',
        headerAlign: 'center',
        headerName: 'ACS RESPONSÁVEL',
        width: 250
      }
    ],
    data: [
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385182604',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'Diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'até 30/04/23'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385182214',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '01/01/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Danilo Lopes Neves',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385172614',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385582514',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385122814',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06185182914',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06185182014',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385182114',
        dt_afericao_pressao_mais_recente: '01/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06885182319',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '04385182415',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '16385182514',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '06385182559',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '46385182664',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      },
      {
        acs_nome_cadastro: 'Angelica Souza Toledo Andrade',
        cpf: '56385182674',
        dt_afericao_pressao_mais_recente: '22/02/21',
        dt_consulta_mais_recente: '22/09/21',
        identificacao_condicao: 'Diagnostico Clinico',
        mail: 'aangelicasouza24@gmail.com',
        nome: 'Angelica Souza Toledo Andrade',
        prazo_proxima_afericao_pa: 'em dia',
        prazo_proxima_consulta: 'em dia'
      }
    ]
  }}
  visualizacao="equipe"
/>

        </>
      )
  }}
  return(
    <p>{status}</p>
  )
}

export default Index;