"use client";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";

import Analytics from "@/componentes/Analytics/Analytics";

import { hotjarVersion } from "@constants/hotjarVersion";
import Hotjar from "@hotjar/browser";
import mixpanel from "mixpanel-browser";
import TagManager from "react-gtm-module";

import { useWindowWidth } from "@helpers/useWindowWidth";

import { rotaDinamica } from "@hooks/rotaDinamica";

import { UserGuiding } from "@/componentes/UserGuiding";
import { addUserDataLayer } from "@/hooks/addUserDataLayer";
import { getLayoutDataHook } from "@/hooks/getLayoutDataHook";
import { handleRouteChangeMixPanel } from "@/hooks/handleRouteChangeMixPanel";
import { identifyUserGuiding } from "@/hooks/identifyUserGuiding";
import { sessionIdentifyMixPanel } from "@/hooks/sessionIdentifyMixPanel";
import { userSetterSentry } from "@/hooks/userSetterSentry";

import { rotasProtegidas, rotasPublicas } from "@/middlewares/middlewarePages";

import dynamic from "next/dynamic";
import { matchesRoute } from "@/features/common/frontend/path";

import type { Menu } from "@/helpers/menuNavBar";

const FooterMounted = dynamic(() =>
    import("@componentes/mounted/base/FooterMonted").then(
        (mod) => mod.FooterMounted
    )
);
const NavBarMounted = dynamic(
    () =>
        import("@componentes/mounted/base/NavBarMounted").then(
            (mod) => mod.NavBarMounted
        ),
    { ssr: false }
);
const Spinner = dynamic(() =>
    import("@impulsogov/design-system").then((mod) => mod.Spinner)
);

const tagManagerArgs = {
    gtmId: process.env.GTM_ID || "default-gtm-id",
};
type BaseProps = {
    children: React.ReactNode;
    menuNavBarOptions: Array<Menu>;
};

export const Base: React.FC<BaseProps> = ({ children, menuNavBarOptions }) => {
    const dynamicRoute = usePathname();
    const path = usePathname();
    const [res, setRes] = useState(null);
    const width = useWindowWidth() || 0;
    const { data: session } = useSession();
    const [cidade, setCidade] = useState("João Pessoa - PB");
    const [isLoading] = useState(true);
    const [active, setMode] = useState(true);
    if (process.env.ENV !== "development") {
        Hotjar.init(
            Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID),
            hotjarVersion
        );
    }
    useEffect(() => {
        mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "", {
            debug: true,
        });

        if (typeof window !== "undefined") window.mixpanel = mixpanel;
    }, []);
    useEffect(() => TagManager.initialize(tagManagerArgs), []);
    useEffect(() => rotaDinamica(path.toString()), [path]);
    useEffect(() => setMode(true), [dynamicRoute]);
    useEffect(() => {
        getLayoutDataHook(setRes);
    }, []);
    const LoginFallback = () => (
        <div style={{ padding: "200px", textAlign: "center" }}>
            Usuário não autenticado, realize login em ACESSO RESTRITO no canto
            superior direito da tela
        </div>
    );
    return (
        <>
            <Suspense
                fallback={
                    <div>
                        <Spinner />
                    </div>
                }
            >
                <SessionWrapper>
                    {isLoading && (
                        <NavBarMounted
                            mixpanel={mixpanel}
                            session={session}
                            nome={session?.user?.nome || ""}
                            path={path}
                            cidade={cidade}
                            setCidade={setCidade}
                            width={width}
                            active={active}
                            setMode={setMode}
                            menuNavBarOptions={menuNavBarOptions}
                        />
                    )}
                    <div
                        style={{
                            paddingTop:
                                width > 1000
                                    ? "76px"
                                    : path === "/"
                                      ? "0px"
                                      : path === "/apoio"
                                        ? "0px"
                                        : "30px",
                            height: "100%",
                        }}
                    >
                        {session ? (
                            matchesRoute(rotasProtegidas, path) ? (
                                children
                            ) : null // Redirecionamento será tratado no middleware
                        ) : matchesRoute(rotasPublicas, path) ? (
                            children
                        ) : (
                            <LoginFallback />
                        )}
                    </div>
                    {res && <FooterMounted res={res} session={session} />}
                </SessionWrapper>
            </Suspense>
            <Analytics />
        </>
    );
};

const SessionWrapper = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement => {
    const session = useSession();
    const params = useSearchParams();
    const path = usePathname();
    const search = params.toString();

    useEffect(() => {
        identifyUserGuiding(session.data);
    }, [session]);

    useEffect(() => {
        sessionIdentifyMixPanel(mixpanel, Hotjar, session.data);

        const isNewRoute = path.startsWith("/cofin25");

        if (isNewRoute) {
            handleRouteChangeMixPanel(mixpanel, session.status, path);
        } else {
            handleRouteChangeMixPanel(mixpanel, session.status, path, search);
        }
    }, [session, path, search]);
    useEffect(() => {
        addUserDataLayer(session.data);
    }, [session]);
    useEffect(() => {
        userSetterSentry(session.data);
    }, [session]);
    return (
        <>
            {session.status === "authenticated" && <UserGuiding />}
            {children}
        </>
    );
};
