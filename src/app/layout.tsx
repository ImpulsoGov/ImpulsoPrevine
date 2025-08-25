import "./globals.css";
import dynamic from "next/dynamic";
import { SessionWrapperLayout } from "./SessionWrapperLayout";
import { VercelToolbar } from "@vercel/toolbar/next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./api/auth/[...nextauth]/nextAuthOptions";
import { menuNavBar } from "@/helpers/menuNavBar";
import { PROFILE_ID } from "@/types/profile";

const Base = dynamic(() => import("./Base").then((mod) => mod.Base));

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): Promise<React.ReactElement> {
    const shouldInjectToolbar = process.env.NODE_ENV === "development";
    const session = await getServerSession(nextAuthOptions);
    let userView: "aps" | "equipe" | null = null;
    if (session?.user.perfis.includes(PROFILE_ID.COAPS)) {
        userView = "aps";
    } else if (session?.user.perfis.includes(PROFILE_ID.COEQ)) {
        userView = "equipe";
    }
    const menuNavBarOptions = await menuNavBar(userView);
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
