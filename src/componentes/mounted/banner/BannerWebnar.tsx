import { ModalAlert,Alert_v4 } from '@impulsogov/design-system'

export const BannerWebnarMounted = () => {
    return <ModalAlert
        Child = {Alert_v4}
        childProps = {{
            titulos : {
                Titulo : "Qualificação do cuidado da população",
                SubTitulo : "Capacitação sobre Monitoramento na APS:"
            },
            Info : [
                {
                    icon : "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
                    info : "05/04"
                },
                {
                    icon : "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
                    info : "19 horas"
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
            cardProfissional_1 : {
                profissional : "https://media.graphassets.com/2sqDyLFbTJylgJKYorEy",
                logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
                nome : "Isabela dos Santos",
                cargo : "Especialista em Saúde Coletiva"
            },
            cardProfissional_2 : {
                profissional : "https://media.graphassets.com/2sqDyLFbTJylgJKYorEy",
                logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
                nome : "Fernanda Soares",
                cargo : "Especialista em Saúde Coletiva"
            },
            botao : {
                label : "QUERO ME INSCREVER",
                url : "https://bit.ly/inscricao-webinar-9"
            }
        }}
    />
}