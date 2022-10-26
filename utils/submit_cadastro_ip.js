import axios from "axios";
import FormData from "form-data";

const submit_cadastro_ip = async(municipio,cargo,telefone,whatsapp,mail)=>{
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
      console.log('--------------------------------')
      console.log(response)
      return response.data;
    })
    .catch(function (error) {
      console.log('--------------------------------')
      console.log(error);
    });
    }
  
  submit_cadastro_ip('Juquitiba - SP','Impulser','11999117985',1,'danilo@impulsogov.org')