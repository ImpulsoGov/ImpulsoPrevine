import type { Mixpanel } from "mixpanel-browser";

export const handleRouteChangeMixPanel = (
	mixpanel: Mixpanel,
	sessionStatus: string,
) => {
	if (mixpanel?.track && sessionStatus !== "loading")
		mixpanel.track("Page View", {
			Logged: sessionStatus == "authenticated",
		});
};
