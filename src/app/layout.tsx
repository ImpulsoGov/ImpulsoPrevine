import "./globals.css";
import dynamic from "next/dynamic";
import { SessionWrapperLayout } from "./SessionWrapperLayout";
import { VercelToolbar } from "@vercel/toolbar/next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./api/auth/[...nextauth]/nextAuthOptions";
import { menuNavBar } from "@/helpers/menuNavBar";

const Base = dynamic(() => import("./Base").then((mod) => mod.Base));

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): Promise<React.ReactElement> {
    const shouldInjectToolbar = process.env.NODE_ENV === "development";
    const session = await getServerSession(nextAuthOptions);
    const menuNavBarOptions = await menuNavBar(session);
    return (
        <html lang="pt-BR">
            <body>
                <SessionWrapperLayout>
                    <Base menuNavBarOptions={menuNavBarOptions}>
                        {children}
                    </Base>
                </SessionWrapperLayout>
                {shouldInjectToolbar && <VercelToolbar />}
            </body>
        </html>
    );
}
