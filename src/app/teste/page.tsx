import { print } from "@/features/common/shared/flags/modules/print";

const Index: React.FC = async () => {
    const isPrintFlagEnabled = await print();
    return (
        <div>
            <h1>Teste Route</h1>
            <p>{isPrintFlagEnabled ? "Sim" : "Não"}</p>
        </div>
    );
};

export default Index;
