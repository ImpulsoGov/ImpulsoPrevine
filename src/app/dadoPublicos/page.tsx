import { Suspense } from "react";
import dynamic from 'next/dynamic';

const DadosPublicos = dynamic(() => import('./DadosPublicos').then(mod => mod.DadosPublicos));

const DadosPublicosPage = () => {
	return (
		<Suspense>
			<DadosPublicos />
		</Suspense>
	);
};

export default DadosPublicosPage;
