import { getData } from "@/services/cms";
import { HOME } from "@utils/QUERYS";
import { QuemSomos } from "./QuemSomos";

const Index = async () => {
	const res = (await getData(HOME)) as any;
	return <QuemSomos res={res} />;
};

export default Index;
