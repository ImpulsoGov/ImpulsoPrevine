import { 
    ScoreCardGrid , 
    Spinner, 
  } from "@impulsogov/design-system"
const IndicadorUmCardsGestantesAtivas = ({tabelaDataAPS}) =>{
    return tabelaDataAPS ? <ScoreCardGrid
    valores={[
        {
            descricao: 'Gestantes com primeira consulta após a 12ª semana',
            valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
            return ((item.id_status_usuario == 8) && item.gestacao_idade_gestacional_primeiro_atendimento > 12) ?
            acumulador + 1 : acumulador;
            },0)
        },
        {
            descricao: 'Gestantes com menos de 6 consultas (primeira consulta até a 12a semana)',
            valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
            return ((item.id_status_usuario == 8) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas < 6) ?
            acumulador + 1 : acumulador;
            },0)
        },
        {
            descricao: 'Gestantes com mais de 6 consultas (primeira consulta até a 12a semana)',
            valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
            return ((item.id_status_usuario == 8) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas >= 6) ?
            acumulador + 1 : acumulador;
            },0)
        },
    ]}
    /> : <Spinner/>
}
export { IndicadorUmCardsGestantesAtivas }