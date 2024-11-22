import { Mixpanel } from 'mixpanel-browser';

export const handleRouteChangeMixPanel = (
    mixpanel : Mixpanel, 
    sessionStatus : string | null
) => {
    if(mixpanel?.track && sessionStatus !== 'loading') mixpanel.track('Page View', {
        'Logged': (sessionStatus == 'authenticated'),
    });
}