import type { Mixpanel } from "mixpanel-browser";

export const handleRouteChangeMixPanel = (
    mixpanel: Mixpanel,
    sessionStatus: string,
    pathname?: string,
    search?: string | null
): void => {
    if (pathname === "/cofin25/busca_mais") {
        mixpanel.track(
            "Page View",
            {
                Logged: sessionStatus === "authenticated",
                path: pathname.replace(/\/+$/, ""),
                search: search ?? "",
                url: typeof window !== "undefined" ? window.location.href : "",
            },
            { send_immediately: true }
        );
    } else {
        mixpanel.track_pageview(
            {
                Logged: sessionStatus === "authenticated",
                path: pathname?.replace(/\/+$/, "") ?? "",
                search: search ?? "",
                url: typeof window !== "undefined" ? window.location.href : "",
            },
            { event_name: "Page View" }
        );
    }
};
