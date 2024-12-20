'use client'
import { PanelSelectorWithCards } from '@impulsogov/design-system';
import { ListContainer } from "./ListContainer";

export const ListaNominal = () => {
  //esses dados vao vir da API do CMS, com exceção do data e children que é passado por props
  const props = {
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
    cards: [
      {
        customStyles: {
          backgroundColor: '#FFF',
          width: '180px'
        },
        title: 'Card Title 1',
        titlePosition: 'top',
        value: '100'
      },
      {
        customStyles: {
          backgroundColor: '#FFF',
          width: '180px'
        },
        title: 'Card Title 2',
        titlePosition: 'top',
        value: '100'
      },
      {
        customStyles: {
          backgroundColor: '#FFF',
          width: '180px'
        },
        title: 'Card Title 3',
        titlePosition: 'top',
        value: '100'
      }
    ],
    inicialContent: {
      subTabID: 'ChartSubTabID1',
      tabID: 'charts'
    },
    municipality: "São Paulo - SP",
    tabs: {
      charts: {
        subTabs: [
          {
            child: <div key="1a" style={{padding:"250px",textAlign: "center", fontSize: "28px"}}>Gráficos em breve</div>,
            icon: {
              active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
              inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr'
            },
            subTabID: 'ChartSubTabID1',
            text: 'Sub-Aba 1'
          },
          {
            child: <div key="1b" style={{padding:"250px",textAlign: "center", fontSize: "28px"}}>Gráficos em breve</div>,
            icon: {
              active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
              inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX'
            },
            subTabID: 'ChartSubTabID2',
            text: 'Sub-Aba 2'
          }
        ],
        tabID: 'chart',
        title: 'Gráficos'
      },
      lists: {
        subTabs: [
          {
            // A prop list virá da URL com nome da lista acessada
            child: <ListContainer key={1} list="hipertensao" />,
            icon: {
              active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
              inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr'
            },
            subTabID: 'subTabID1',
            text: 'text1'
          },
          {
            child: <ListContainer key={2} list="hipertensao" />,
            icon: {
              active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
              inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX'
            },
            subTabID: 'subTabID2',
            text: 'text2'
          },
          {
            child: <ListContainer key={3} list="hipertensao" />,
            icon: {
              active: 'https://media.graphassets.com/EQSROnFQRm20pX1CVbT2',
              inactive: 'https://media.graphassets.com/8sikQD27QLO3IkoxkQ9D'
            },
            subTabID: 'subTabID3',
            text: 'text3'
          }
        ],
        tabID: 'list',
        title: 'Listas'
      }
    },
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
    title: "Pré-natal (indicadores 1, 2 e 3)"
  }

  return <PanelSelectorWithCards {...props}/>
}