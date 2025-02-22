import * as estilos from "./estilosTags";
import * as icones from "./icones";

export const PrazoStyle = ({
  value,
  orientacao = "paisagem",
  width = "90%"
})=>{
  const style = value !== "Em dia"
    ? {...estilos.tagLaranjaComIcone}
    : {...estilos.tagVerdeComIcone};

  return (
    <div style={{
      ...style,
      width,
      fontSize: orientacao === "retrato" && "9px"
    }}>
      {value !== "Em dia" && <img src={icones.atencao_simbolo} alt="simbolo atenção"/>}
      {value === "Em dia" && <img src={icones.check_simbolo} alt="simbolo verificado"/>}
      {value}
    </div>
  )
}
