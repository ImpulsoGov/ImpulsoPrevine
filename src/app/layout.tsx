import "./globals.css";
import dynamic from "next/dynamic";
import { SessionWrapperLayout } from "./SessionWrapperLayout";
import { VercelToolbar } from "@vercel/toolbar/next";

const Base = dynamic(() => import("./Base").then((mod) => mod.Base));

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactElement {
    const shouldInjectToolbar = process.env.NODE_ENV === "development";
    return (
        <html lang="pt-BR">
            <body>
                <SessionWrapperLayout>
                    <Base>{children}</Base>
                </SessionWrapperLayout>
                {shouldInjectToolbar && <VercelToolbar />}
            </body>
        </html>
    );
}
