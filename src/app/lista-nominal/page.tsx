import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { ListaNominal } from "./ListaNominal";
import type { GetListDataProps } from "@services/lista-nominal/ListaNominal";
import type { ExtendedPanelSelectorWithCardsProps } from './ListaNominal';
import { getCardsData } from "@/services/lista-nominal/cards";
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import { baseURL } from '@/utils/baseURL';
import type { CardDetailsMap } from "@/helpers/cardsList";
import { getCardsProps } from "@/helpers/cardsList";
import { captureException } from "@sentry/nextjs";
import { ErrorPage } from "./ErrorPage";
import { AllowProfile } from "@/componentes/unmounted/Auth/AllowProfile";
import { PROFILE_ID, ProfileID } from "@types/profile";
const ListaNominalPage = async(
    { searchParams }: { searchParams: Promise<{[key: string]: string | undefined}> }
) => {
    // Dados mockados que virão do CMS. Quantidade e conteúdo varia com a lista.
    const cardsDetails: CardDetailsMap = {
        "COM_CONSULTA_AFERICAO_PRESSAO": {
            title: "Total de pessoas com consulta e aferição de PA em dia",
            titlePosition: "top",
            customStyles: {
                width: "180px",
                backgroundColor: "#FFF",
            }
        },
        "DIAGNOSTICO_AUTORREFERIDO": {
            title: "Total de pessoas com diagnóstico autorreferido",
            titlePosition: "top",
            customStyles: {
                width: "180px",
                backgroundColor: "#FFF",
            }
        },
        "DIAGNOSTICO_CLINICO": {
            title: "Total de pessoas com diagnóstico clínico",
            titlePosition: "top",
            customStyles: {
                width: "180px",
                backgroundColor: "#FFF",
            }
        },
    }
    const session = await getServerSession(nextAuthOptions) as Session;
    const user = session?.user as Session['user'];

    const resolvedSearchParams = await searchParams;
    const tabID = resolvedSearchParams?.tabID || "charts"; 
    const subTabID = resolvedSearchParams?.subTabID || "ChartSubTabID1";

    let externalCardsProps: CardProps[] = [];
    if (session?.user){
        const params: GetListDataProps = {
            token: user.access_token,
            listName: "HIPERTENSÃO", //esse valor inicial vai vir da url, assim como os filtros e ordenacao inicial
        }
        try {
            const { data } = await getCardsData({
                token: params.token,
                listName: params.listName,
                cardType: "external",
                baseUrl: baseURL() ,
            });
    
            externalCardsProps = getCardsProps(cardsDetails, data);
        } catch (error) {
            captureException(error);
            return <p>Erro ao buscar dados cards</p>;
        }
        const props: ExtendedPanelSelectorWithCardsProps = {
            breadcrumb: [
                {
                    label: 'Inicio',
                    link: '/inicio'
                },
                {
                    label: 'Pré-natal (indicadores 1, 2 e 3)',
                    link: '/lista=pre-natal'
                }
            ],
            municipality: 'São Paulo - SP',
            title: 'Pré-natal (indicadores 1, 2 e 3)',
            tooltip: 'Tooltip, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.',
            cards : externalCardsProps,
            listaNominalID: params.listName,
            tabs: {
                charts: {
                    title: 'Gráficos',
                    tabID: 'chart',
                    subTabs: [
                        { 
                            icon: {
                            active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
                            inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr',
                            inactiveHover: 'https://media.graphassets.com/QyT9jkJRkiq73uwGHPBg'
                            }, 
                            text: 'Sub-Aba 1',
                            subTabID: 'ChartSubTabID1',
                            child: <div>Sub-Aba</div>,
                            title: 'Gráfico 1', 
                        },
                        { 
                            icon: {
                            active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
                            inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX',
                            inactiveHover: 'https://media.graphassets.com/nFtUIgG3TDSIBD0Mzsq4'
                        }, 
                            text: 'Sub-Aba 2',
                            subTabID: 'ChartSubTabID2',
                            child: <div>Sub-Aba</div>,
                            title: 'Gráfico 2',
                        },
                        ],
                    },
                lists: {
                    title: 'Listas',
                    tabID: 'list',
                    subTabs: [
                        { 
                            icon: {
                            active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
                            inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr',
                            inactiveHover: 'https://media.graphassets.com/QyT9jkJRkiq73uwGHPBg'
                        }, 
                            text: 'Lista 1',
                            subTabID: 'subTabID1',
                            child: <div>Sub-Aba</div>,
                            title: 'Lista 1',
                        },
                        { 
                            icon: {
                            active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
                            inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX',
                            inactiveHover: 'https://media.graphassets.com/nFtUIgG3TDSIBD0Mzsq4'
                        }, 
                            text: 'Lista 2',
                            subTabID: 'subTabID2',
                            child: <div>Sub-Aba</div>,
                            title: 'Lista 2',
                        },
                        { 
                            icon: {
                            active: 'https://media.graphassets.com/EQSROnFQRm20pX1CVbT2',
                            inactive: 'https://media.graphassets.com/8sikQD27QLO3IkoxkQ9D',
                            inactiveHover: 'https://media.graphassets.com/M0tdvdQLaVoWOcCjjWGQ'
                        }, 
                            text: 'Lista 3',
                            subTabID: 'subTabID3',
                            child: <div>Sub-Aba</div>,
                            title: 'Lista 3',
                        },
                        ],
                    }
            },
            inicialContent: {
                tabID: tabID,
                subTabID: subTabID
            },
        };
        return props && session && 
        <AllowProfile user={user}   profileID={PROFILE_ID.impulser} error={<p style={{padding: "80px",textAlign: "center"}}>Usuário sem permissão</p>}>
            <ListaNominal props={props}/>
        </AllowProfile>
    }
    return <ErrorPage />;
}
export default ListaNominalPage;
