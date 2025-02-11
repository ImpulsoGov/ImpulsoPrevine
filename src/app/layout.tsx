import "./globals.css";
import { Base } from "./Base";
import { SessionWrapperLayout } from "./SessionWrapperLayout";

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
