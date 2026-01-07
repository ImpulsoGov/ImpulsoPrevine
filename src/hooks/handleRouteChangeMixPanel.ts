import type { Mixpanel } from "mixpanel-browser";

export const handleRouteChangeMixPanel = (
    mixpanel: Mixpanel,
    sessionStatus: string,
    pathname?: string,
    search?: string | null
) => {
    if (mixpanel.track && sessionStatus !== "loading") {
        mixpanel.track(
            "Page View",
            {
                Logged: sessionStatus === "authenticated",
                path: pathname?.replace(/\/+$/, "") ?? "",
                search: search ?? "",
                url: typeof window !== "undefined" ? window.location.href : "",
            },
            { send_immediately: true }
        );
    }
};
