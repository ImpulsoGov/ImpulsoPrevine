import { Mixpanel } from 'mixpanel-browser';
import { Session } from 'next-auth';

export const handleRouteChangeMixPanel = (
    mixpanel : Mixpanel, 
    session : Session | null
) => {
    if(mixpanel?.track) mixpanel.track('Page View', {
        'Logged': (session?.status == 'authenticated'),
    });
}