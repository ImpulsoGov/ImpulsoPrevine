import React from 'react'
import { 
    Alert, 
    Alert_v2, 
    AtualizacaoCadastral, 
    ModalAlert, 
    CardAlertModal,
    NPS 
} from './index'


export default {
    title: "Componentes/ModalAlert",
    component: ModalAlert,
};



const Template = (args) => <ModalAlert {...args}/>
export const Webnar = Template.bind({});
Webnar.args ={
    Child : Alert,
    childProps : {
        titulos : {
            Titulo : "Citopatológico",
            SubTitulo : "Capacitação sobre o Previne Brasil:"
        },
        Info : [
            {
                icon : "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
                info : "05/04"
            },
            {
                icon : "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
                info : "19h às 21h (BRT)"
            },
            {
                icon : "https://media.graphassets.com/wb3wQPKRQY6o1Mb7pLzE",
                info : "Online"
            },
            {
                icon : "https://media.graphassets.com/Ui2qHF9IR9WyqEQv8H1v",
                info : "Gratuito"
            },
        ],
        cardProfissional : {
            profissional : "https://media.graphassets.com/2sqDyLFbTJylgJKYorEy",
            logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
            nome : "Isabela dos Santos",
            cargo : "Especialista em Saúde Coletiva"
        },
        botao : {
            label : "QUERO ME INSCREVER",
            url : "https://bit.ly/inscricao-webinar-9"
        }
    }
}
export const Webnar_v2 = Template.bind({});
Webnar_v2.args ={
    Child : Alert_v2,
    childProps : {
        titulos : {
            Titulo : "Impulso Previne:",
            SubTitulo : "Uso das listas nominais na rotina das equipes"
        },
        Info : [
            {
                icon : "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
                info : "22 de feverreiro"
            },
            {
                icon : "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
                info : "14h"
            },
            {
                icon : "https://media.graphassets.com/Ui2qHF9IR9WyqEQv8H1v",
                info : "Certificado para os participantes"
            },
        ],
        cardProfissional : {
            profissional : "https://media.graphassets.com/CL8x2D45RxKZCGJZSXLa",
            logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
            nome : "Isabela Santos",
            cargo : "Especialista em Saúde Coletiva"
        },
        botao : {
            label : "ACESSAR EVENTO",
            url : "https://bit.ly/encontro-listas-nominais"
        }
    }
}
export const Atualizacao_Cadastral = Template.bind({});
Atualizacao_Cadastral.args ={
    Child : AtualizacaoCadastral,
    childProps : {
        titulos : {
            Titulo : "ATENÇÃO",
            SubTitulo : "Para garantir o seu acesso na área logada, atualize seu cadastro"
        },
        Info : "Em breve vamos alterar os dados necessários para acessar o site do Impulso Previne. Clique no botão abaixo e atualize sua ficha de cadastro!",
        imagem : "https://media.graphassets.com/fnBPBSsuS2aUWu0pjQV9",
        botao : {
            label : "ATUALIZAR CADASTRO",
            url : "https://bit.ly/encontro-listas-nominais"
        }
    }
}

export const NPS_ = Template.bind({});
NPS_.args ={
    Child : CardAlertModal,
    childProps : {
        child : NPS,
        childProps : {
            titulo : "Como você avalia sua experiência na área logada até agora?",
            user : "userID",
            token : "dsfsdfsfs",
            submit : (arg)=>console.log(arg)
        }
    }
}