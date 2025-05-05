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

const FooterMounted = dynamic(() =>
    import("@componentes/mounted/base/FooterMonted").then(
        (mod) => mod.FooterMounted,
    ),
);
const NavBarMounted = dynamic(
    () =>
        import("@componentes/mounted/base/NavBarMounted").then(
            (mod) => mod.NavBarMounted,
        ),
    { ssr: false },
);
const Spinner = dynamic(() =>
    import("@impulsogov/design-system").then((mod) => mod.Spinner),
);

const tagManagerArgs = {
    gtmId: process.env.GTM_ID || "default-gtm-id",
};
interface BaseProps {
    children: React.ReactNode;
}

export const Base: React.FC<BaseProps> = ({ children }) => {
    const dynamicRoute = usePathname();
    const path = usePathname();
    const [res, setRes] = useState(null);
    const width = useWindowWidth() || 0;
    const { data: session } = useSession();
    const [cidade, setCidade] = useState("João Pessoa - PB");
    const [isLoading] = useState(true);
    const [active, setMode] = useState(true);
    if (process.env.NEXT_PUBLIC_HOTJAR_SITE_ID) {
        Hotjar.init(
            Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID),
            hotjarVersion,
        );
        mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "");
    }
    useEffect(() => {
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
                    {isLoading && res && (
                        <NavBarMounted
                            mixpanel={mixpanel}
                            session={session}
                            nome={session?.user?.nome || ""}
                            path={path}
                            cidade={cidade}
                            setCidade={setCidade}
                            width={width}
                            res={res}
                            active={active}
                            setMode={setMode}
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
                            rotasProtegidas.includes(path) ? (
                                children
                            ) : null // Redirecionamento será tratado no middleware
                        ) : rotasPublicas.includes(path) ? (
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

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const params = useSearchParams();
    useEffect(() => {
        identifyUserGuiding(session.data);
    }, [session]);
    useEffect(() => {
        sessionIdentifyMixPanel(mixpanel, Hotjar, session.data);
    }, [session]);
    useEffect(() => {
        handleRouteChangeMixPanel(mixpanel, session.status);
    }, [session, params]);
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
