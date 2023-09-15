import { Spinner, TituloSmallTexto, CardLarge , Greeting , ButtonLightSubmit} from '@impulsogov/design-system';
import { getSession,useSession  } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { redirectHomeGestaoUsuarios } from '../../../../helpers/redirectHome';
import { parse } from 'papaparse';
import validator from 'validator';
import { cpf } from 'cpf-cnpj-validator'; 

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = redirectHomeGestaoUsuarios(ctx, session);

  if (redirect) return redirect;

  return {
    props: {}
  };
}

const validarColunas = data =>{

}

const Tratamento = data =>{
    if(data){
        const TratarNome = nome=>nome.split(' ').map((item)=>item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ').trim()
        const TratarINE = equipe=>equipe.toString().replace(/[^0-9]/g, '').padStart(10, '0')
        const TratarMail = mail=> mail.replaceAll(' ','')
        const TratarCPF = cpf=>cpf.toString().replace(/[^0-9]/g, '')
        const TratarTelefone = num=>num.toString().replace(/[^0-9]/g, '')
        return data.map(usuario=>{
            return {
                'nome' : TratarNome(usuario.nome),
                'equipe' : TratarINE(usuario.equipe),
                'mail' : TratarMail(usuario.mail),
                'cpf' : TratarCPF(usuario.cpf),
                'telefone' : TratarTelefone(usuario.telefone),
                'cargo' : usuario.cargo,
                'municipio_uf' : usuario.municipio_uf,
                'perfil' : usuario.perfil,
                'whatsapp' : usuario.whatsapp
            }
        })
    }
    
}

const Validacao = data =>{
    const ValidarNome = nome => /^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(nome);
    const ValidarINE = INE => /^\d{10}$/.test(INE);
    const ValidarMail = mail => validator.isEmail(mail);
    const ValidarCPF = cpf => cpf.isValid(cpf);
    const ValidarTelefone = numero => /^\d{11}$/.test(numero)
    const ValidarWP = wp => wp == '1' || wp == '0'
    const validacoes = []
    data.forEach(usuario=>{
        const usuario_validacoes = {
            usuario : usuario.nome,
        }
        if(!ValidarNome(usuario.nome)) usuario_validacoes[nome] = false
        if(Object.keys(usuario_validacoes>1)) validacoes.push(usuario_validacoes)
    })
    return validacoes
}

const GestaoDeUsuarios = () => {
    const { data: session,status } = useSession()
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const [etapa,setEtapa] = useState(0)
    const [JSONDATA,setJSONDATA] = useState()
    const handleSubmit = () => {
        if(file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
            };
            fileReader.readAsText(file);
            CSVtoJSON()
            setEtapa(1)
        }
    };
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    async function CSVtoJSON() {
        fileReader.onload = function (event) {
          const csvOutput = event.target.result;
          const jsonData = parse(csvOutput, {
            header: true, // Se o CSV tem cabeçalho
            delimiter: ',', // Delimitador CSV
            dynamicTyping: true, // Converter automaticamente tipos de dados
          });
          setJSONDATA(jsonData.data)
        };
      }
    if(session){
        if(session?.user.perfis.includes(2)){
            if(etapa == 0){
                return(
                    <>
                        <div style={{
                            display : 'flex',
                            flexDirection : 'column',
                            gap : '20px',
                            justifyContent : 'center',
                            alignItems : 'center',
                            marginTop : '1%',
                            marginBottom : '30px'
                        }}>
                            <TituloSmallTexto
                                texto='Faça o upload de um arquivo no formato .csv'
                                botao={{
                                    label: '',
                                    url: ''
                                  }}
                            />
                            <input 
                                type={"file"} 
                                accept={".csv"}
                                onChange={handleOnChange}
                            />
                            <ButtonLightSubmit
                                label='IMPORTAR DADOS'
                                submit={handleSubmit}
                            />
                        </div>
                    </>
                )
            }
            if(etapa == 1){
                Validacao(Tratamento(JSONDATA)).then(res=>console.log(res))
            }
        }
    }
};

export default GestaoDeUsuarios;
