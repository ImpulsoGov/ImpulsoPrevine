import { useEffect,useState,useContext } from 'react';
import Context from "../../utils/Context";
import { getData } from '../../services/cms';
import { LAYOUT } from '../../utils/QUERYS';
import { PanelSelector } from "@impulsogov/design-system"

export async function getServerSideProps() {
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res : res
    }
  }
}

const urlGenIndicadores = (cidade)=>{
  const encode = (city)=> encodeURIComponent(encodeURIComponent(city))
  let baseURL = 'https://datastudio.google.com/embed/reporting/a7b8746b-caff-4d07-8a57-ce3739c52f0a/page/p_1i1fd8auvc?params=%7B%22df58%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580'
  let endURL = '"%7D'
  const link = baseURL  + encode(cidade) + endURL
  return link
}

const urlGenCaptacao = (cidade)=>{
  const encode = (city)=> encodeURIComponent(encodeURIComponent(city))
  let baseURL = 'https://datastudio.google.com/embed/reporting/12fb288f-4955-4930-b091-63da3f846c51/page/p_8qgdgiz2xc/edit?params=%7B%22df56%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580'
  let endURL = '"%7D'
  const link = baseURL  + encode(cidade) + endURL
  return link
}
const urlGenAE = (cidade)=>{
  const encode = (city)=> encodeURIComponent(encodeURIComponent(city))
  let baseURL = 'https://datastudio.google.com/embed/reporting/b3614781-b39a-4f3b-8956-d628c3db169c/page/cMHxC/edit?params=%7B%22df4%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580'
  let endURL = '"%7D'
  const link = baseURL  + encode(cidade) + endURL
  return link
}

const Index = ({res}) => {
  const [cidade, setCidade] = useContext(Context);
  const [dsLink, setDSLink] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);

  useEffect(() => {
    setDSLink([urlGenIndicadores(cidade),urlGenCaptacao(cidade),urlGenAE(cidade)])
    setLoading(true)
  }, [cidade]);
  const labels = [
    {
      label: "Indicadores de Desempenho",
    },
    {
      label: "Capitação Ponderada",
    },
    {
      label: "Incentivos a Ações Estratégicas",
    },
  ]
  const titles = [
    {
      label: "Análises",
    }
  ]
  return (
    <>
      {
        isLoading==true &&
        <PanelSelector
          links = {[dsLink]}
          list={[labels]}
          titles={titles}
          states={ {
            activeTabIndex: Number(activeTabIndex),
            setActiveTabIndex: setActiveTabIndex,
            activeTitleTabIndex: activeTitleTabIndex,
            setActiveTitleTabIndex: setActiveTitleTabIndex
          } }
    
        />
      }
    </>
  )
}

export default Index;
