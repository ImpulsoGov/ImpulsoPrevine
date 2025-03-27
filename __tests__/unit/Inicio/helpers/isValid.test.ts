import { isValid } from "@/helpers/situation";
import type { SituacaoPorIndicador } from "@/types/inicio";
import type { Indicadores } from "@/types/inicio";

// se situacaoPorIndicador[indicador]?.total e ".pendente" sao valores que nao podem ser negativos legalmente, nao precisamos testar
// entradas legais seria a, b >= 0 a,b undefined ou null

describe("isValid", () => {
    let situacao: SituacaoPorIndicador;

    beforeEach(() => {
        situacao = {
            CITOPATOLOGICO: { total: 0, pendente: 0 },
            DIABETES: { total: 0, pendente: 0 },
            HIPERTENSOS: { total: 0, pendente: 0 },
            PRE_NATAL_6_CONSULTAS: { total: 0, pendente: 0 },
            PRE_NATAL_ODONTO: { total: 0, pendente: 0 },
            PRE_NATAL_SIFILIS_HIV: { total: 0, pendente: 0 },
            VACINACAO: { total: 0, pendente: 0 },
        };
    });

    it("Retorna verdadeiro quando .total é maior que zero e .pendente é zero", () => {
        situacao = { ...situacao, DIABETES: { total: 5, pendente: 0 } };
        expect(isValid(situacao, "DIABETES" as Indicadores)).toBe(true);
    });

    it("Retorna verdadeiro quando .pendente é maior que zero e .total é zero", () => {
        situacao = { ...situacao, HIPERTENSOS: { total: 0, pendente: 3 } };
        expect(isValid(situacao, "HIPERTENSOS" as Indicadores)).toBe(true);
    });

    it("Retorna verdadeiro quando .pendente e .total são zero", () => {
        situacao = {
            ...situacao,
            PRE_NATAL_6_CONSULTAS: { total: 0, pendente: 0 },
        };
        expect(isValid(situacao, "PRE_NATAL_6_CONSULTAS" as Indicadores)).toBe(
            true,
        );
    });

    it("Retorna falso quando .pendente e .total são null", () => {
        situacao = {
            ...situacao,
            PRE_NATAL_ODONTO: { total: null, pendente: null },
        };
        expect(isValid(situacao, "PRE_NATAL_ODONTO" as Indicadores)).toBe(
            false,
        );
    });

    it("Retorna falso quando .pendente e .total são undefined", () => {
        situacao = {
            ...situacao,
            PRE_NATAL_SIFILIS_HIV: { total: undefined, pendente: undefined },
        };
        expect(isValid(situacao, "PRE_NATAL_SIFILIS_HIV" as Indicadores)).toBe(
            false,
        );
    });
});
