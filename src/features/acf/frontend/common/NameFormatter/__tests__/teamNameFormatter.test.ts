import { teamNameFormatter } from "..";

describe("teamNameFormatter", () => {
    it("retorna '-' quando value é undefined ou string vazia", () => {
        expect(teamNameFormatter(undefined)).toBe("-");
        expect(teamNameFormatter("")).toBe("-");
    });

    it("mantém preposições comuns em minúsculas (inclui 'e/')", () => {
        expect(
            teamNameFormatter("unidade de saude da familia e/ maria das dores")
        ).toBe("Unidade de Saude da Familia e/ Maria das Dores");
    });

    it("mantém siglas conhecidas em maiúsculas (ESF, PSF, EAP)", () => {
        expect(teamNameFormatter("esf maria do carmo")).toBe(
            "ESF Maria do Carmo"
        );
        expect(teamNameFormatter("psf joao e maria")).toBe("PSF Joao e Maria");
        expect(teamNameFormatter("eap unidade central")).toBe(
            "EAP Unidade Central"
        );
    });

    it("preserva algarismos romanos exatamente como vieram", () => {
        expect(teamNameFormatter("ESF JOSE II")).toBe("ESF Jose II");
        expect(teamNameFormatter("esf jose vi")).toBe("ESF Jose vi");
    });

    it("capitaliza palavras que não são preposições nem siglas", () => {
        expect(teamNameFormatter("unidade basica de saude")).toBe(
            "Unidade Basica de Saude"
        );
        expect(teamNameFormatter("MISTA DOIS IRMAOS")).toBe(
            "Mista Dois Irmaos"
        );
    });

    it("não altera caracteres além da primeira letra fora dos casos especiais", () => {
        expect(teamNameFormatter("uNIDaDe eSCoLaR do cEnTRo")).toBe(
            "Unidade Escolar do Centro"
        );
    });
});
