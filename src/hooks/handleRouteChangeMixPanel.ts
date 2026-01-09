import type { Mixpanel } from "mixpanel-browser";

export const handleRouteChangeMixPanel = (
    mixpanel: Mixpanel,
    sessionStatus: string,
    pathname?: string,
    search?: string | null
): void => {
    if (sessionStatus !== "loading") {
        mixpanel.track_pageview({
            Logged: sessionStatus === "authenticated",
            path: pathname?.replace(/\/+$/, "") ?? "",
            search: search ?? "",
            url: typeof window !== "undefined" ? window.location.href : "",
        });
    }
};
