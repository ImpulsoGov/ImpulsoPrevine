import "./globals.css";
import dynamic from 'next/dynamic';
import { SessionWrapperLayout } from "./SessionWrapperLayout";

const Base = dynamic(() => import('./Base').then(mod => mod.Base));

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<SessionWrapperLayout>
					<Base>{children}</Base>
				</SessionWrapperLayout>
			</body>
		</html>
	);
}
