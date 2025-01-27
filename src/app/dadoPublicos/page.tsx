import { DadosPublicos } from "./DadosPublicos";
import { Suspense } from "react";
const DadosPublicosPage = () => {
	return (
		<Suspense>
			<DadosPublicos />
		</Suspense>
	);
};

export default DadosPublicosPage;
