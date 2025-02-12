import { sanitize } from "../../../../sanitize";

export const CabecalhoPagina = ({
    filtros_aplicados,
    data_producao_mais_recente,
    lista,
    fontFamily="sans-serif",
    legendaImpressao=[],
    equipesDivididas=false
})=>{
    return(
      <div>
        <div 
          className="largura"
          style={{
            fontFamily: `${fontFamily}, sans-serif`,
            fontSize : "16px",
            display : "flex",
            flexDirection : "row"
          }}
        >
          <div>
            <p style={{marginTop : 0}}><b>LISTA NOMINAL <span dangerouslySetInnerHTML={{ __html: sanitize(lista) }}/></b></p>
            <p><i>PRODUÇÃO MAIS RECENTE RECEBIDA EM : {data_producao_mais_recente}</i></p>
          </div>
          <div style={{
              width : "fit-content",
              height : "fit-content",
              marginLeft: "auto",
            }}>
              <img 
                src="https://media.graphassets.com/3HLHjLzQQDmQIxkp7Ifq" 
                alt="logo"
                width="150px"
                height="45px"
              />
          </div>
        </div>
        <div style={{
          display : "flex",
          flexDirection : "row",
          flexWrap : "wrap",
          alignItems: "flex-end",
          gap : "10px",
          fontSize : "16px",
          marginBottom : "11px",
          fontFamily: `${fontFamily}, sans-serif`,
        }}>
          <p style={{
            marginBottom: 0,
            marginTop: "16px",
          }}><b>Filtros aplicados: </b></p>
          {
            filtros_aplicados && filtros_aplicados.length>0 ?
            filtros_aplicados.map((filtro,index)=>{
              return(
                <div 
                  key={index}
                  style={{
                    border : "solid 1px #757574",
                    borderRadius : "5px",
                    padding : "6px",
                    fontSize : "11px",
                    backgroundColor : "#F5F5F5"
                  }}
                >
                  {filtro}
                </div>
              )
            }) :
            ["Sem filtros aplicados"]
          }
        </div>
        {legendaImpressao.length > 0 &&
          <div style={{
            fontSize : "15px",
            fontFamily: `${fontFamily}, sans-serif`,
            lineHeight: "15px",
            marginTop: "16px",
            marginBottom: equipesDivididas ? "40px" : "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            {legendaImpressao.map((item) => (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(item),
                }}
              />
            ))}
          </div>
        }
      </div>
    )
  }
