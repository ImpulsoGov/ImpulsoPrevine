import { Suspense } from "react";
import { DadosPublicos } from "./DadosPublicos";
const DadosPublicosPage = () => {
	return (
		<Suspense>
			<DadosPublicos />
		</Suspense>
	);
};

export default DadosPublicosPage;
