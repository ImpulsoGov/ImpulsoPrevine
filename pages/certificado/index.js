import React from 'react';
import { Certificado } from '../../componentes/Certificado';
import { generatePDF } from '../../helpers/generatePDF';


const Index = () => {
    const GerarCertificado = () => {
        generatePDF('Hipertensão e Diabetes', 'Danilo Lopes Neves', '10');
    }
  return (
    <div>
        <Certificado/>
      <h2>Gerador de PDF</h2>
      <button onClick={GerarCertificado}>Gerar PDF</button>
    </div>
  );
};

export default Index