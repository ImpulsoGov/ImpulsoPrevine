import { useEffect } from "react";
import { addUserDataLayer } from '@hooks/addUserDataLayer';
import { handleRouteChangeMixPanel } from "@/hooks/handleRouteChangeMixPanel";
import { sessionIdentifyMixPanel } from "@/hooks/sessionIdentifyMixPanel";
import { Mixpanel } from "mixpanel-browser";

interface SessionHooksProps {
    session: any; 
    mixpanel: Mixpanel; 
    Hotjar: any; 
    path: string; 
  }
export const SessionHooks : React.FC<SessionHooksProps> = ({
    session,
    mixpanel,
    Hotjar,
    path
}) => {
    useEffect(() => addUserDataLayer(session), [session]);
    useEffect(() => handleRouteChangeMixPanel(mixpanel,session), [path, session, mixpanel]);
    useEffect(() => sessionIdentifyMixPanel(mixpanel,Hotjar,session), [session, mixpanel, Hotjar]);
    return <></>
}
