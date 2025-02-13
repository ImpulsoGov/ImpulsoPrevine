import React, { useMemo } from "react";
import * as estilos from "../constantes/estilosTags";
import * as icones from "../constantes/icones";

const STYLE = {
  1: estilos.tagLaranjaComIcone,
  2: estilos.tagLaranjaComIcone,
  3: estilos.tagVermelhaComIcone,
  4: estilos.tagVerdeComIcone,
  5: estilos.tagNulaComIcone,
}

export const StatusExameSifilisHIV = ({
  value,
  identificacao_exame_hiv_sifilis,
  orientacao = "paisagem"
})=> {
  const descricao = useMemo(() => {
    return identificacao_exame_hiv_sifilis.find(item => item.id_exame_hiv_sifilis == value).exame_hiv_sifilis_descricao;
  }, [identificacao_exame_hiv_sifilis, value]);

  return (
    <div style={{
      ...STYLE[value],
      fontSize: orientacao === "retrato" && "9px"
    }}>
      {(value == 1 || value == 2) && <img src={icones.atencao_simbolo} />}
      {value == 3 && <img src={icones.alerta_simbolo} />}
      {value == 4 && <img src={icones.check_simbolo} />}
      {descricao}
    </div>
  );
}
