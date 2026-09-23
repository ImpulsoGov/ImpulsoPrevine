import dynamic from "next/dynamic";
import { buildPortalImpulsoUrl } from "@/middlewares/portalImpulsoRedirect";
const Home = dynamic(() => import("./Home").then((mod) => mod.Home));

const PORTAL_IMPULSO_URL_PADRAO = "https://portal.impulsogov.org/";

const HomePage = () => {
    const portalImpulsoUrl =
        buildPortalImpulsoUrl(
            process.env.PORTAL_IMPULSO_URL ?? ""
        )?.toString() ?? PORTAL_IMPULSO_URL_PADRAO;
    return <Home portalImpulsoUrl={portalImpulsoUrl} />;
};

export default HomePage;
