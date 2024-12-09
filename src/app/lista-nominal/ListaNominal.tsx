'use client'
import { ListConteiner } from "./ListConteiner";
import { PanelSelectorWithCards } from '@impulsogov/design-system';

export type ListaNominalProps = {
    data: Record<string, string | number | Date>[];
}

export const ListaNominal = ({ 
    data 
}: ListaNominalProps) => {
    //esses dados vao vir da API do CMS, com exceção do data que é passado por props
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
        municipio: 'São Paulo - SP',
        titulo: 'Pré-natal (indicadores 1, 2 e 3)',
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.',
        cards : [
          {
            value: '100',
            title: 'Card Title',
            titlePosition: 'top',
            customStyles: {
              width: "180px",
              backgroundColor: "#FFF",
            }
          },
          {
            value: '100',
            title: 'Card Title',
            titlePosition: 'top',
            customStyles: {
              width: "180px",
              backgroundColor: "#FFF",
            }
          },
          {
            value: '100',
            title: 'Card Title',
            titlePosition: 'top',
            customStyles: {
              width: "180px",
              backgroundColor: "#FFF",
            }
          },
        ],
        tabs: {
          titles: ['Gráficos', 'Listas Nominais'],
          subTabs: [
            [
              { 
                icon: {
                  active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
                  inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr'
                }, 
                text: 'Sub-Aba 1' 
              },
              { 
                icon: {
                  active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
                  inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX'
                }, 
                text: 'Sub-Aba 2' 
              },
            ],
            [
              { 
                icon: {
                  active: 'https://media.graphassets.com/dVxSjSUyROm9A2YkiEMj',
                  inactive: 'https://media.graphassets.com/jPDKYUhTXaEkGHFpjpfr'
                }, 
                text: 'text1' 
              },
              { 
                icon: {
                  active: 'https://media.graphassets.com/Tx39n37HTGWapXUq8UBv',
                  inactive: 'https://media.graphassets.com/veVDjWw1ROmaXsuOY7LX'
                }, 
                text: 'text2' 
              },
              { 
                icon: {
                  active: 'https://media.graphassets.com/EQSROnFQRm20pX1CVbT2',
                  inactive: 'https://media.graphassets.com/8sikQD27QLO3IkoxkQ9D'
                }, 
                text: 'text3' 
              },
            ],
          ]
        },
        children: [
          [
            <div key="1a" style={{padding:"250px",textAlign: "center", fontSize: "28px"}}>Gráficos em breve</div>,
            <div key="1b" style={{padding:"250px",textAlign: "center", fontSize: "28px"}}>Gráficos em breve</div>,
          ],
          [
            <ListConteiner key={1} data={data}/>,
            <ListConteiner key={2} data={data}/>,
            <ListConteiner key={3} data={data}/>,
          ],
    
      ]
    }
    return <PanelSelectorWithCards {...selectorProps}/>
}