"use client";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";

import Analytics from "@/componentes/Analytics/Analytics";
import { FooterMounted } from "@componentes/mounted/base/FooterMonted";
import { NavBarMounted } from "@componentes/mounted/base/NavBarMounted";
import { Spinner } from "@impulsogov/design-system";

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
	if (process.env.ENV != "dev")
		Hotjar.init(Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID), hotjarVersion);
	mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "");
	useEffect(() => {
		if (typeof window !== "undefined") window.mixpanel = mixpanel;
	}, []);
	useEffect(() => TagManager.initialize(tagManagerArgs), []);
	useEffect(() => rotaDinamica(path.toString()), [path]);
	useEffect(() => setMode(true), [dynamicRoute]);
	useEffect(() => {
		getLayoutDataHook(setRes);
	}, []);

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
									: path == "/"
										? "0px"
										: path == "/apoio"
											? "0px"
											: "30px",
							height: "100%",
						}}
					>
						{children}
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
