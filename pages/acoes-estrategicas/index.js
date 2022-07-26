import Layout from "../../componentes/Layout";
import { IFrame } from "../../componentes/IFrame/IFrame.jsx";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | Ações Estratégicas">
      <IFrame
        height="3200"
        link="https://datastudio.google.com/embed/reporting/d28c7264-d346-4b64-9042-4455f0235f35/page/p_mdgdcavlwc"
      />
      <IFrame
        height="3000"
        link="https://gabriellearruda-acoes-estrategicas-app-41jlka.streamlitapp.com/?embed=true"
      />
    </Layout>
  )
}

export default Index;
