import { handleRouteChangeMixPanel } from "@/hooks/handleRouteChangeMixPanel";
import type { Mixpanel } from "mixpanel-browser"; // Importe a interface Mixpanel

describe("handleRouteChangeMixPanel", () => {
    let mixpanel: Partial<Mixpanel>;

    beforeEach(() => {
        jest.resetAllMocks();
        window.history.pushState({}, "", "/");

        mixpanel = {
            track: jest.fn(),
        };
    });

    it("dispara 'Page View' ao entrar na rota antiga (session != 'loading') e com parâmetros de busca", () => {
        window.history.pushState({}, "", "/pacientes/lista?a=1");
        handleRouteChangeMixPanel(
            mixpanel as Mixpanel,
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
        window.history.pushState({}, "", "/dashboard");
        handleRouteChangeMixPanel(
            mixpanel as Mixpanel,
            "loading",
            "/dashboard",
            null
        );
        expect(mixpanel.track).not.toHaveBeenCalled();
    });

    it("trata pathname indefinido e search nulo", () => {
        window.history.pushState({}, "", "/");
        handleRouteChangeMixPanel(
            mixpanel as Mixpanel,
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
        const mixpanelSemTrack = {} as Mixpanel; //
        expect(() =>
            handleRouteChangeMixPanel(
                mixpanelSemTrack,
                "authenticated",
                "/x",
                ""
            )
        ).not.toThrow();
    });

    it("dispara 'Page View' para uma rota do /cofin25 sem search", () => {
        const path = "/cofin25/indicadores";
        window.history.pushState({}, "", path);
        handleRouteChangeMixPanel(
            mixpanel as Mixpanel,
            "authenticated",
            path,
            ""
        );

        expect(mixpanel.track).toHaveBeenCalledTimes(1);
        expect(mixpanel.track).toHaveBeenCalledWith("Page View", {
            Logged: true,
            path: "/cofin25/indicadores",
            search: "",
            url: "http://localhost/cofin25/indicadores",
        });
    });

    it("dispara 'Page View' para uma rota do /cofin25 com search, mas ignora o search no rastreamento", () => {
        const path = "/cofin25/indicadores/hipertensao";
        const search = "teste=123&filtro=abc";
        window.history.pushState({}, "", `${path}?${search}`);

        handleRouteChangeMixPanel(
            mixpanel as Mixpanel,
            "authenticated",
            path,
            search
        );

        expect(mixpanel.track).toHaveBeenCalledTimes(1);
        expect(mixpanel.track).toHaveBeenCalledWith("Page View", {
            Logged: true,
            path: "/cofin25/indicadores/hipertensao",
            search: "teste=123&filtro=abc",
            url: "http://localhost/cofin25/indicadores/hipertensao?teste=123&filtro=abc",
        });
    });
});
