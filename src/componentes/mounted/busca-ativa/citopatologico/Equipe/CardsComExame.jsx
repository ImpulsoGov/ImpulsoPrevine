import { ScoreCardGrid, Spinner } from "@impulsogov/design-system";

export const CardsComExame = ({tabelaDataEquipe})=>tabelaDataEquipe ? <ScoreCardGrid
valores={[
    {
        descricao: 'Total de pessoas',
        valor: tabelaDataEquipe.length
    },
    {
        descricao: 'Total de pessoas com a coleta de citopatológico em dia',
        valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
        return (item.id_status_usuario == 12) ?
        acumulador + 1 : acumulador;
        },0)
    },
]}
/> : <Spinner/>
