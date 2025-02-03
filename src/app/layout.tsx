import "./globals.css";
import { Base } from "./Base";
import { SessionWrapperLayout } from "./SessionWrapperLayout";
import Script from "next/script";
import newrelic from "newrelic";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	if(process.env.NEW_RELIC_LICENSE_KEY !== undefined) {
	// Ensure the New Relic agent is connected before injecting the script
	if (newrelic.agent.collector.isConnected() === false) {
		await new Promise((resolve) => {
			newrelic.agent.on("connected", resolve);
		});
	}
}
	// Get New Relic browser monitoring script
	const browserTimingHeader = newrelic.getBrowserTimingHeader({
		hasToRemoveScriptWrapper: true,
		allowTransactionlessInjection: true,
	});
	return (
		<html lang="pt-BR">
			<head>
				<Script
					id="nr-browser-agent"
					dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
				/>
			</head>
			<body>
				<SessionWrapperLayout>
					<Base>{children}</Base>
				</SessionWrapperLayout>
			</body>
		</html>
	);

}