import { getData } from '../../services/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { Cadastro} from '../../componentes/Cadastro/Cadastro'
import { CriarSenha } from '../../componentes/CriarSenha/CriarSenha'
import { FullModal } from '../../componentes/FullModal/FullModal'
import { API_URL } from '../../constants/API_URL'
import axios from 'axios'
import FormData from "form-data";


export async function getServerSideProps() {
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res : res
    }
  }
}

const submit_cadastro = async (nome, mail,senha,cpf)=>{
  let data = new FormData();
  data.append('nome', nome);
  data.append('mail', mail);
  data.append('senha', senha);
  data.append('cpf', cpf);
  const config = {
    method: 'POST',
    url: API_URL +'suporte/usuarios/cadastro',
    headers: { 
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryxXxXxXx',
    },
    data : data
  };
  
  return await axios(config)
  .then(function (response) {
    console.log(response)
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

const submit_cadastro_ip = async(municipio,cargo,telefone,whatsapp,mail)=>{
  if (whatsapp){console.log('true');whatsapp='1'}else{console.log('false');whatsapp='0'}
  var data = new FormData();
  data.append('municipio', municipio);
  data.append('cargo', cargo);
  data.append('telefone', telefone);
  data.append('whatsapp', whatsapp);
  data.append('mail', mail);
  
  var config = {
    method: 'post',
    url: API_URL + 'suporte/usuarios/cadastro-ip',
    headers: { 
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryxXxXxXx'
    },
    data : data
  };
  
  return await axios(config)
  .then(function (response) {
    console.log(response)
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
  }



const Index = ({res}) => {
  const { data: session,status } = useSession()
  return (
    <>
      <FullModal
        logo="https://media.graphassets.com/b8gtgIBS0ylOa0zlD9wT?_gl=1*hmdi2k*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
        back="https://media.graphassets.com/mRR3uFHeQeW8SG0qYSIY?_gl=1*15r7evo*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
        backLink="/"
      />
        <Cadastro
          titulo= "Cadastro do município"
          campos={[
                  {label:"Nome Completo"},
                  {label:"Municipio"},
                  {label:"Cargo"},
                  {label:"E-mail"},
                  {label:"(DDD) Telefone"},
              ]}
              button = {{label:"Próximo",link:""}}
              submitCadastro ={submit_cadastro}
              submitCadastroIP = {submit_cadastro_ip}
          />      
      </>
  )
}

export default Index;