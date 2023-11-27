import { 
    ScoreCardGrid , 
    Spinner, 
  } from "@impulsogov/design-system"
const CardsAPS = ({tabelaDataAPS}) => tabelaDataAPS ? <ScoreCardGrid
valores={[
    {
        descricao: 'Total de gestantes ativas e encerradas',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 8 ||item.id_status_usuario == 9) ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Total de gestantes ativas',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 8) ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Total de gestantes sem DUM preenchida (inválidas para o Previne Brasil)',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 11) ?
        acumulador + 1 : acumulador;
        },0)
    },
]}
/> : <Spinner/>

export { CardsAPS }