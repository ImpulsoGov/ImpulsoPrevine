'use client'
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

import { NavBarMounted } from "./NavBarMounted"
import { FooterMounted } from "./FooterMonted";
import Analytics from "@/componentes/Analytics/Analytics";
import { Auth } from "./Auth"

import TagManager from "react-gtm-module";
import mixpanel from 'mixpanel-browser';
import Hotjar from '@hotjar/browser';
import { hotjarVersion } from '@constants/hotjarVersion';


import { useWindowWidth } from '@helpers/useWindowWidth';

import { addUserDataLayer } from '@hooks/addUserDataLayer';
import { rotaDinamica } from '@hooks/rotaDinamica';
import { handleRouteChangeMixPanel } from "@/hooks/handleRouteChangeMixPanel";
import { sessionIdentifyMixPanel } from "@/hooks/sessionIdentifyMixPanel";

import { getLayoutDataHook } from "@/hooks/getLayoutDataHook";


const tagManagerArgs = {
    gtmId: process.env.GTM_ID || 'default-gtm-id',
};
interface BaseProps {
    children : React.ReactNode
}
Hotjar.init(Number(process.env["NEXT_PUBLIC_HOTJAR_SITE_ID"]), hotjarVersion);

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "");

export const Base : React.FC<BaseProps> = ({
    children
})=>{
    const { data: session } = useSession()
    const dynamicRoute = usePathname();
    const path = usePathname();
    const [res, setRes] = useState<any>(null);
    const nome = session?.user?.nome || "";
    const width = useWindowWidth() || 0;

    const [cidade, setCidade] = useState("João Pessoa - PB");
    const [isLoading] = useState(true);
    const [setStatus] = useState();
    const [active, setMode] = useState(true);
  
    useEffect(() => TagManager.initialize(tagManagerArgs), []);
    useEffect(() => rotaDinamica(path.toString()), [path]);
    useEffect(() => addUserDataLayer(session), [session]);
    useEffect(() => setMode(true), [dynamicRoute]);
    useEffect(() =>{ if(typeof window !== "undefined") window.mixpanel = mixpanel}, [])
    useEffect(() => handleRouteChangeMixPanel(mixpanel,session), [path]);
    useEffect(() => sessionIdentifyMixPanel(mixpanel,Hotjar,session), [session]);
    useEffect(() =>{ getLayoutDataHook(setRes) }, []);
    return <>
        <SessionProvider refetchInterval={ 60 * 60 } refetchOnWindowFocus={ true }>
            <Auth setStatus={ setStatus } session={session}>
                { isLoading && res &&
                    <NavBarMounted
                        mixpanel={mixpanel}
                        session={session}
                        nome={nome}
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
            </Auth>
            <Analytics />
        </SessionProvider>
    </>
}