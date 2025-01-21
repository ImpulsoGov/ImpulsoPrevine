import dynamic from 'next/dynamic';
const Home = dynamic(() => import('./Home').then(mod => mod.Home), { ssr: false });

const HomePage = () => <Home/>

export default HomePage;