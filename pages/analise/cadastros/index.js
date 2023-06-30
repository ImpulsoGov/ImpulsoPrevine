import { v1 as uuidv1 } from 'uuid';
import { GraficoInfo, Grid12Col, TituloSmallTexto } from "@impulsogov/design-system"

const Cadastros = () => {
  return (
    <div>
      <TituloSmallTexto
        key={ uuidv1() }
        imagem={{
          posicao: null,
          url: ''
        }}
        texto="Veja como estão os cadastros no seu município."
        titulo="<b> Capitação Ponderada </b>"
      />
       </div>
  )
}
export default Cadastros;