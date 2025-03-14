import React, { useMemo } from "react";
import * as estilos from "../constantes/estilosTags";

export const StatusDDP = ({
  value,
  orientacao = "paisagem"
})=> {
  const dataFormatada = useMemo(() => {
    if(!value) return null

    const parts = value.split('-');
    const dia = parts[2];
    const mes = parts[1];
    const ano = parts[0];
    const date = `${dia}/${mes}/${ano}`;

    return date
  }, [value]);

  return (
    <>
      {value
        ? <div>{dataFormatada}</div>
        : (
          <div style={{
            ...estilos.tagVermelhaComIcone,
            width: "fit-content",
            fontSize: orientacao === "retrato" && "9px"
          }}>
            sem DUM
          </div>
        )
      }
    </>
  )
}
