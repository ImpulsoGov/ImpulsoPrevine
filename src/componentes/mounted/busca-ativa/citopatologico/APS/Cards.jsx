import { ScoreCardGrid,Spinner } from "@impulsogov/design-system";

export const Cards = ({tabelaDataAPS})=>
tabelaDataAPS ? <ScoreCardGrid
valores={[
    {
        descricao: 'Total de pessoas de 25 a 64 anos',
        valor: tabelaDataAPS.length
    },
    {
        descricao: 'Total de pessoas com a coleta de citopatológico em dia',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 12) ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Total de pessoas que nunca relizaram a coleta de citopatológico',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 13) ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Total de pessoas com a coleta de citopatológico vencida (ou a vencer até o fim do quadrimestre)',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 15 || item.id_status_usuario == 16) ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Coleta realizada antes dos 25 anos (Não contabilizada para o Previne Brasil)',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 14) ?
        acumulador + 1 : acumulador;
        },0)
    }
]}
/> : <Spinner/>
