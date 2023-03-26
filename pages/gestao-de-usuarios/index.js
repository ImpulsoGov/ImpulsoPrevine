import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT, CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { TituloTexto } from "@impulsogov/design-system";
import { DataGrid } from '@mui/x-data-grid';
import { redirectHomeNotLooged } from '../../helpers/redirectHome'
import { getSession } from "next-auth/react";
import React, { Component, useState, useEffect } from 'react';



export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeNotLooged(ctx,session)
    if(redirect) return redirect
      const res = [
        await getData(LAYOUT)
    ]
    return {
        props: {
        res : res
        }
    }
}


const Index = ({res}) => {
    const { data: session,status } = useSession()
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpbXB1bHNlckBpbXB1bHNvZ292Lm9yZyIsImV4cCI6MTY3OTUxNzI5MH0.-fBsCIuhKq_lErM8qsnaVfNXWMeuF9NpiBA61U3wc10");
    var urlUsuarios = "https://impulsoapi.herokuapp.com/suporte/ger_usuarios/lista-usuarios";
    const getRequestOptions = {method: 'GET', redirect: 'follow', headers: myHeaders};
    
    const [dados, setDados] = useState();

    useEffect(() => {
        fetch(urlUsuarios, getRequestOptions).then(response => response.json()).then(result => setDados(result)).catch(error => console.log('error', error));
    }, []);

    const columns = [
        { field: 'nome_usuario', headerName: 'Nome do Usuário',  editable: true, width: 300 },
        { field: 'mail',headerName: 'Email', editable: true, width: 300},
        { field: 'cpf', headerName: 'CPF', width: 200 },
    ];
      
    if (session){
        return(
            <>
                {
                    dados && session?.user.perfis.includes(5) &&
                    <>
                        <TituloTexto imagem = {{
                            posicao: null,
                            url: ''
                            }}
                            titulo = 'Bem vindo a área de gestão de usuários'
                            texto = ''
                        />
                        <div style={{ padding:80, paddingTop:0, height: 800, width: '100%' }}>
                            <DataGrid
                                rows={dados["usuarios"]}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[15]}
                                getRowId={(row) => row.cpf}
                            />
                        </div>
                    </>
                }
            </>
        )
    }
}

export default Index;