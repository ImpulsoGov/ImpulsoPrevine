import { handleRouteChangeMixPanel } from "@/hooks/handleRouteChangeMixPanel";

describe("handleRouteChangeMixPanel", () => {
    const createMixpanel = () => ({ track: jest.fn() });

    beforeEach(() => {
        jest.resetAllMocks();
        window.history.pushState({}, "", "/");
    });

    it("dispara 'Page View' ao entrar na rota (session != 'loading')", () => {
        const mixpanel = createMixpanel();
        window.history.pushState({}, "", "/pacientes/lista?a=1");
        handleRouteChangeMixPanel(
            mixpanel as any,
            "authenticated",
            "/pacientes/lista/",
            "a=1"
        );

        expect(mixpanel.track).toHaveBeenCalledTimes(1);
        expect(mixpanel.track).toHaveBeenCalledWith("Page View", {
            Logged: true,
            path: "/pacientes/lista",
            search: "a=1",
            url: "http://localhost/pacientes/lista?a=1",
        });
    });

    it("não dispara quando sessionStatus === 'loading'", () => {
        const mixpanel = createMixpanel();
        window.history.pushState({}, "", "/dashboard");
        handleRouteChangeMixPanel(
            mixpanel as any,
            "loading",
            "/dashboard",
            null
        );
        expect(mixpanel.track).not.toHaveBeenCalled();
    });

    it("trata pathname indefinido e search nulo", () => {
        const mixpanel = createMixpanel();
        window.history.pushState({}, "", "/");
        handleRouteChangeMixPanel(
            mixpanel as any,
            "unauthenticated",
            undefined,
            null
        );
        expect(mixpanel.track).toHaveBeenCalledWith("Page View", {
            Logged: false,
            path: "",
            search: "",
            url: "http://localhost/",
        });
    });

    it("não quebra se mixpanel.track estiver ausente", () => {
        const mixpanel = {} as any; // sem track
        expect(() =>
            handleRouteChangeMixPanel(mixpanel, "authenticated", "/x", "")
        ).not.toThrow();
    });
});
