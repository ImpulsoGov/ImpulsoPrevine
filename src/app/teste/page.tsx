import { developmentFlag } from "@/features/common/shared/flags/modules/developmentFlag";

const Index: React.FC = async () => {
    const isDevelopmentFlagEnabled = await developmentFlag();
    return (
        <div>
            <h1>Teste Route</h1>
            <p>{isDevelopmentFlagEnabled ? "Sim" : "Não"}</p>
        </div>
    );
};

export default Index;
