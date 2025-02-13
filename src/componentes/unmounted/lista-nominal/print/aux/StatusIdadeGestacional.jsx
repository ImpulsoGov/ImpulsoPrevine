import React, { useMemo } from "react";
import * as estilos from "../constantes/estilosTags";

export const StatusIdadeGestacional = ({
  value,
  orientacao = "paisagem"
})=> {
  const style = useMemo(() => {
    if(value){
      return Number(value) <= 12 ? estilos.tagVerdeSemIcone : estilos.tagVermelhaSemIcone;
    }

    return estilos.tagNulaSemIcone;
  }, [value]);

  return (
    <div style={{
      ...style,
      width: "35%",
      fontSize: orientacao === "retrato" && "9px"
    }}>
      {value ? value : "-"}
    </div>
  );
}
