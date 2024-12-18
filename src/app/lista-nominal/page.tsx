// import { getListData } from "@services/lista-nominal/ListaNominal";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { ListaNominal } from "./ListaNominal";
import type { getListDataProps } from "@services/lista-nominal/ListaNominal";
import type { ExtendedPanelSelectorWithCardsProps } from './ListaNominal';

const ListaNominalPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    if (!session || !session.user) return <p>Usuário não autenticado</p>;
    const params: getListDataProps = {
        municipio_id_sus: session.user.municipio_id_sus,
        token: session.user.access_token,
        list: "lista-nominal", //esse valor inicial vai vir da url, assim como os filtros e ordenacao inicial
    }
    if(session.user.perfis.includes(9)) params.ine = session.user.equipe
    // const data = await getListData(params) // comentei aqui porque a api ainda não está pronta
    // const externalCardsData = await getExternalCardsData(externalCardsParams) // escrever requisicao para cards externos
    // const internalCardsData = await getInternalCardsData(internalCardsParams) // escrever requisicao para cards internos
    // const columns = await getColumnsData() // escrever requisicao para colunas
    // const filters = await getFiltersData() // escrever requisicao para filtros
    //mock data
    const externalCardsData =  [
        {
        value: '100',
        title: 'Card Title 1',
        titlePosition: 'top',
        customStyles: {
            width: "180px",
            backgroundColor: "#FFF",
        }
        },
        {
        value: '100',
        title: 'Card Title 2',
        titlePosition: 'top',
        customStyles: {
            width: "180px",
            backgroundColor: "#FFF",
        }
        },
        {
        value: '100',
        title: 'Card Title 3',
        titlePosition: 'top',
        customStyles: {
            width: "180px",
            backgroundColor: "#FFF",
        }
        },
    ]

    const selectorProps = {
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
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.',
        cards : externalCardsData,
        tabs: {
            charts: {
                title: 'Gráficos',
                tabID: 'chart',
                subTabs: [
                { 
                    icon: {
                    active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
                    inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr'
                    }, 
                    text: 'Sub-Aba 1',
                    subTabID: 'ChartSubTabID1',
                    child: <div>Sub-Aba</div>,
                    title: 'Gráfico 1', 
                },
                { 
                    icon: {
                    active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
                    inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX'
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
                    inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr'
                    }, 
                    text: 'Lista 1',
                    subTabID: 'subTabID1',
                    child: <div>Sub-Aba</div>,
                    title: 'Lista 1',
                },
                { 
                    icon: {
                    active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
                    inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX'
                    }, 
                    text: 'Lista 2',
                    subTabID: 'subTabID2',
                    child: <div>Sub-Aba</div>,
                    title: 'Lista 2',
                },
                { 
                    icon: {
                    active: 'https://media.graphassets.com/EQSROnFQRm20pX1CVbT2',
                    inactive: 'https://media.graphassets.com/8sikQD27QLO3IkoxkQ9D'
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
            tabID: "charts",
            subTabID: "ChartSubTabID1"
        }    
    } as ExtendedPanelSelectorWithCardsProps;
    
    return <ListaNominal selectorProps={selectorProps}/>
}
export default ListaNominalPage;