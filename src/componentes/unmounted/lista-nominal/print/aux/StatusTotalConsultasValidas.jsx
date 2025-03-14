import React, { useMemo } from "react";
import * as estilos from "../constantes/estilosTags";
import * as icones from "../constantes/icones";

const STYLE = {
  0: estilos.tagNulaComIcone,
  1: estilos.tagLaranjaComIcone,
  2: estilos.tagVermelhaComIcone,
  3: estilos.tagVerdeComIcone
}

export const StatusTotalConsultasValidas = ({
  values,
  orientacao = "paisagem"
})=> {
  const colorCode = useMemo(() => {
    if(!values.consultas_pre_natal_validas) {
      return 0;
    }

    if(
      values.gestacao_idade_gestacional_primeiro_atendimento <= 12
      && values.consultas_pre_natal_validas <= 5
    ) {
      return 1;
    }

    if(values.gestacao_idade_gestacional_primeiro_atendimento > 12) {
      return 2;
    }

    if(
      values.gestacao_idade_gestacional_primeiro_atendimento <= 12
      && values.consultas_pre_natal_validas >= 6
    ) {
      return 3;
    }
  }, [values]);

  return (
    <div style={{
      ...STYLE[colorCode],
      width: "40%",
      fontSize: orientacao === "retrato" && "9px"
    }}>
      {(colorCode == 0) && <span>-</span>}
      {(colorCode == 1) && <img src={icones.atencao_simbolo} /> }
      {colorCode == 2 && <img src={icones.alerta_simbolo} /> }
      {colorCode == 3 && <img src={icones.check_simbolo} /> }
      {values.consultas_pre_natal_validas}
    </div>
  )
}
