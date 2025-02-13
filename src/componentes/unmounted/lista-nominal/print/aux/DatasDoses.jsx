import { formatarDataNascimento } from "../../helpers/formatarCPF"
import React from "react";

export const DatasDoses = ({
  value,
  orientacao = "paisagem"
})=> {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      fontSize: orientacao === "paisagem" ? "9px" : "8px",
      fontWeight: "500",
      lineHeight: "10.5px",
    }}>
      {value.map((item,index) =>{
        const splitValue = item.split(": ")
        const dose = splitValue[0].split("ª")[0]+"ª"
        const data = splitValue[1]
        const dataFormatada = !data ? "" : formatarDataNascimento(data)
        return <span key={index}>{`${dose} : ${dataFormatada}`}</span>
      })}
    </div>
  )
}
