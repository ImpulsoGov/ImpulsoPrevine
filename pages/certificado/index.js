import react from 'react'

const Index = ()=>{
    const indicador = "Hipertensão e Diabetes"
    const nome_usuario = "José Silva"
    const carga_horaria = '10'
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth(); 
    const ano = dataAtual.getFullYear();
    const dataPorExtenso = dia + " de " + meses[mes] + " de " + ano;
    return(
        <div style={{ width: '297mm', height: '210mm' }}>
            <div style={{
                backgroundColor : '#145C56',
                height : '100px',
                textAlign: 'center',
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center',
                width : "100%",
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight : 'normal',
                color : "#1F1F1F"
            }}>
                <p style={{color : 'white', fontSize : "24px", width : "60%"}}><span style={{color : '#2EB280',fontWeight : 550}}>Trilha de Capacitação:</span> Indicadores de {indicador} do Previne Brasil</p>
            </div>
            <div 
                style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                flexDirection : 'column',
                padding : '20px',
                fontSize : "19px"
            }}
            >
                <p>Certificamos que</p>
                <p style={{color :'#145C56', fontSize : "40px", fontWeight : 500}}>{nome_usuario}</p>
                <p style={{textAlign : 'center',width : "70%"}}>participou com êxito da Trilha de Capacitação sobre {indicador}, realizada pela ImpulsoGov no formato online, contabilizando carga horária total de {carga_horaria} horas</p>
                <p>São Paulo, {dataPorExtenso}</p>
            </div>
            <div style={{
                display : "flex",
                justifyContent: "space-between",
                width : '70%',
                marginLeft : "150px",
            }}>
                <div style={{
                    textAlign : "center",
                    borderTop : "solid 1px #1F1F1F",
                    width : "300px",
                    marginBottom : "20px"
                }}>
                    <p>Isabel Opice</p>
                    <p>Diretora de Operações da Impulso Gov</p>
                </div>
                <div style={{
                    textAlign : "center",
                    borderTop : "solid 1px #1F1F1F",
                    width : "300px"
                }}>
                    <p>Juliana Ramalho</p>
                    <p>Responsável Técnica</p>
                </div>
            </div>
            <div style={{
                backgroundColor : '#145C56',
                height : '100px',
                display : "flex",
                gap : "200px",
                color : '#9DEECD'
            }}>
                <div 
                    style={{
                        marginLeft : "75px",
                        paddingTop : "30px"
                    }}
                >
                    <img
                        src='https://media.graphassets.com/Kal4aulRmYkqd0L6RBAd'
                    ></img>
                </div>
                <div>
                    <p>Realização :</p>
                    <img 
                        style={{
                            width : "115px"
                        }}
                        src='https://media.graphassets.com/RFXqGGcTTeaQLzslYkJq'></img>
                </div>
                <div>
                    <p>Financiadora do Impulso Previne:</p>
                    <img 
                        style={{
                            width : "115px"
                        }}
                        src='https://media.graphassets.com/qul9PgnLRA2m5JPMYXmw'></img>
                </div>
            </div>
        </div>
    )
}

export default Index