'use client'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { NavBarMounted } from "@componentes/mounted/base/NavBarMounted";
import { FooterMounted } from "@componentes/mounted/base/FooterMonted";
import Analytics from "@/componentes/Analytics/Analytics";

import TagManager from "react-gtm-module";
import mixpanel from 'mixpanel-browser';
import Hotjar from '@hotjar/browser';
import { hotjarVersion } from '@constants/hotjarVersion';

import { useWindowWidth } from '@helpers/useWindowWidth';

import { rotaDinamica } from '@hooks/rotaDinamica';

import { UserGuiding } from "@/componentes/UserGuiding";
import { getLayoutDataHook } from "@/hooks/getLayoutDataHook";
import { SessionHooks } from "./SessionHooks";
import { getUserProfileName } from "@/utils/identifyUserProfile";
import { isTestUser } from "@/utils/isTestUser";


const tagManagerArgs = {
    gtmId: process.env.GTM_ID || 'default-gtm-id',
};
interface BaseProps {
    children : React.ReactNode
}

export const Base : React.FC<BaseProps> = ({
    children
})=>{
    const dynamicRoute = usePathname();
    const path = usePathname();
    const [res, setRes] = useState(null);
    const width = useWindowWidth() || 0;
    const { data: session } = useSession();
    const [cidade, setCidade] = useState("João Pessoa - PB");
    const [isLoading] = useState(true);
    const [active, setMode] = useState(true);
    if(process.env.ENV != 'dev') Hotjar.init(Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID), hotjarVersion);
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "");
    useEffect(() =>{ if(typeof window !== "undefined") window.mixpanel = mixpanel}, [])
    useEffect(() => TagManager.initialize(tagManagerArgs), []);
    useEffect(() => rotaDinamica(path.toString()), [path]);
    useEffect(() => setMode(true), [dynamicRoute]);
    useEffect(() =>{ getLayoutDataHook(setRes) }, []);

    return <>
            <SessionWrapper>
                { isLoading && res &&
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
                }
                <div 
                style={{
                    paddingTop: width > 1000  ? "76px" :  path == '/' ? "0px" : path == '/apoio' ? "0px" :"30px",
                    height: "100%"
                }}
                >
                {children}
                </div>
                {res && <FooterMounted res={res} session={session}/>}
            </SessionWrapper>
            <Analytics />
    </>
}

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const path = usePathname();

    useEffect(() => {
        if (session && session.data && session.data.user && typeof window !== "undefined") {
            window.userGuiding.identify(session.data.user.id, {
                cargo: session.data.user.cargo,
                equipe: session.data.user.equipe,
                municipio: session.data.user.municipio,
                municipio_id_sus: session.data.user.municipio_id_sus,
                is_test_user: isTestUser(session.data.user),
                perfil: getUserProfileName(session.data.user.perfis),
            })
          }
    }, [session]);

    return (
        <>
            {session.status === "authenticated" && <UserGuiding />}
            { mixpanel && <SessionHooks session={session} mixpanel={mixpanel} Hotjar={Hotjar} path={path} />}
            {children}
        </>
    );
};