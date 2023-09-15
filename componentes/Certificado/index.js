import React, {useState, useEffect} from 'react';
import 'jspdf-autotable';

const Certificado = ({
    indicador,
    nome_usuario,
    carga_horaria
})=>{
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth(); 
    const ano = dataAtual.getFullYear();
    const dataPorExtenso = dia + " de " + meses[mes] + " de " + ano;

    useEffect(() => {
        const imageUrls = [
            'https://media.graphassets.com/Geit01wgThqPHeqquWZ9',
            'https://media.graphassets.com/KqdDDziDTIOU4oO2w949',
            'https://media.graphassets.com/Kal4aulRmYkqd0L6RBAd',
            'https://media.graphassets.com/RFXqGGcTTeaQLzslYkJq',
            'https://media.graphassets.com/qul9PgnLRA2m5JPMYXmw'
        ];
        // Pré-carregue as imagens
        const imagePromises = imageUrls.map((imageUrl) => {
            return new Promise((resolve) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => resolve();
            });
        });
        
        // Quando todas as imagens estiverem carregadas, defina imagesLoaded como true
        Promise.all(imagePromises).then(() => setImagesLoaded(true))}, []);
    
    return(
        <div style={{ width: '80mm' }}>
            <div style={{
                backgroundColor : '#145C56',
                height : '6mm',
                textAlign: 'center',
                display : 'flex',
                flexDirection : 'column',
                justifyContent : 'center',
                alignItems : 'center',
                width : "100%",
                fontFamily: 'Inter',
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight : 'normal',
                color : "#1F1F1F",
                fontSize : '8px'
            }}>
                <div style={{color : 'white', fontSize : "7px", width : "38%"}}><span style={{color : '#2EB280'}}>Trilha de Capacitação:</span> Indicadores</div>
                <div style={{color : 'white', fontSize : "7px", width : "55%"}}>de {indicador} do Previne Brasil</div>
            </div>
            <div 
                style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                flexDirection : 'column',
                padding : '10px',
                fontSize : "6px",
            }}
            >
                <p>Certificamos que</p>
                <div style={{color :'#145C56', fontSize : "12px", fontWeight : 500}}>{nome_usuario}</div>
                <p style={{textAlign : 'center',width : "80%"}}>participou com êxito da Trilha de Capacitação sobre {indicador}, realizada pela ImpulsoGov no formato online, contabilizando carga horária total de {carga_horaria} horas</p>
                <p>São Paulo, {dataPorExtenso}</p>
            </div>
            <div style={{
                display : "flex",
                justifyContent: "space-between",
                width : '70%',
                marginLeft : "45px",
            }}>
                
                <div style={{
                    textAlign : "center",
                    width : "90px",
                    marginBottom : "27.5px",
                    fontSize : '4px'
                }}>
                    <img 
                        src='https://media.graphassets.com/Geit01wgThqPHeqquWZ9' 
                        width='70px'
                        height='20px'
                    />
                    <div>Isabel Opice</div>
                    <div>Diretora de Operações da Impulso Gov</div>
                </div>
                <div style={{
                    textAlign : "center",
                    width : "90px",
                    fontSize : '4px'
                }}>
                    <img 
                        src='https://media.graphassets.com/KqdDDziDTIOU4oO2w949'
                        width = '70px' 
                        height='20px'
                    />
                    <div>Juliana Ramalho</div>
                    <div>Responsável Técnica</div>
                </div>
            </div>
            <div style={{
                backgroundColor : '#145C56',
                height : '6mm',
                display : "flex",
                justifyContent : 'center',
                alignItems : 'center',
                gap : "60px",
                color : '#9DEECD',
                fontSize : '4px'
            }}>
                <div 
                    style={{
                        marginLeft : "15px",
                        width : 'fit-content',
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src='https://media.graphassets.com/Rsqr9yaTtOfRUhC7UhIn'
                        width= '30px'
                    ></img>
                </div>
                <div>
                    <div style={{marginBottom : '2px'}}>Realização :</div>
                    <img 
                        width='30px'
                        src='https://media.graphassets.com/RFXqGGcTTeaQLzslYkJq'/>
                </div>
                <div>
                    <div style={{marginBottom : '2px'}}>Financiadores do Impulso Previne:</div>
                    <div style={{display : 'flex', gap : '2px'}}>
                        <img 
                            width='23px'
                            height='7px'
                            src='https://media.graphassets.com/MiMU4y34SlGpSgM0D4gx'
                        />
                        <img 
                            width='28px'
                            height='7px'
                            src='https://media.graphassets.com/PcavCVigQVmtc7D1ElZf'
                        />
                        <img 
                            width='25px'
                            height='6px'
                            src='https://media.graphassets.com/qul9PgnLRA2m5JPMYXmw'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Certificado }