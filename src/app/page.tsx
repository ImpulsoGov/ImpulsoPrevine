import dynamic from "next/dynamic";
const Home = dynamic(() => import("./Home").then((mod) => mod.Home));

const PORTAL_IMPULSO_URL_PADRAO = "https://portal.impulsogov.org/";

const HomePage = () => {
    const portalImpulsoUrl =
        process.env.PORTAL_IMPULSO_URL || PORTAL_IMPULSO_URL_PADRAO;
    return <Home portalImpulsoUrl={portalImpulsoUrl} />;
};

export default HomePage;
