import dynamic from 'next/dynamic';
const Home = dynamic(() => import('./Home').then(mod => mod.Home));

const HomePage = () => <Home/>

export default HomePage;