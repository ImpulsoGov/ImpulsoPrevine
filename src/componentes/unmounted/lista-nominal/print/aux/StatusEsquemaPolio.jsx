import React from "react";
import * as estilos from "../constantes/estilosTags";
import * as icones from "../constantes/icones";

const STYLE = {
  10: estilos.tagVerdeComIcone,
  20: estilos.tagLaranjaComIcone,
  30: estilos.tagVermelhaComIcone,
  40: estilos.tagCinzaPreenchidaComIcone,
};

const DESCRICOES = {
  10: "Completo",
  20: "Em andamento",
  30: "Em atraso",
  40: "Não iniciado"
};

export const StatusEsquemaPolio = ({
  value,
  orientacao = "paisagem"
})=> {
  return (
    <div style={{
      ...STYLE[value],
      width: "90%",
      fontSize: orientacao === "retrato" && "9px"
    }}>
      {value == 10 && <img src={icones.check_simbolo} width={9} height={9} />}
      {value == 20 && <img src={icones.andamento_simbolo} width={9} height={9} />}
      {value == 30 && <img src={icones.relogio_simbolo} width={9} height={9} />}
      {value == 40 && <img src={icones.ampulheta_simbolo} width={9} height={9} />}
      <div>{DESCRICOES[value]}</div>
    </div>
  )
}
