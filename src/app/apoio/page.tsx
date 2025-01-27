import { getData } from '@/services/cms';
import { CONSULTORIA} from '@utils/QUERYS'
import dynamic from 'next/dynamic';
const Apoio = dynamic(() => import('./Apoio').then(mod => mod.Apoio));

interface SliderData {
  titulo: string;
  button: string;
  buttonLink: string;
}
interface SliderCards {
  title: string;
  imageUrl: string;
}


interface ResData {
  sliders: SliderData[];
  sliderCards: SliderCards[];
}

const ApoioPage = async() => {
  const res = await getData(CONSULTORIA) as ResData;
  return <Apoio res={res} />;
}
export default ApoioPage;
