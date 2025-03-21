import { isValidSituation } from "@/helpers/inicio/isValidSituation";
import type { SituacaoPorIndicador } from "@/types/inicio";
import type { Indicadores } from "@/types/inicio";

// se situacaoPorIndicador[indicador]?.total e ".pendente" sao valores que nao podem ser negativos legalmente, nao precisamos testar


describe("isValidSituation", () => {
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
  
    it("should return true when total is greater than 0", () => {
      situacao = { ...situacao, DIABETES: { total: 5, pendente: 0 } };
      expect(isValidSituation(situacao, "DIABETES" as Indicadores)).toBe(true);
    });
  
    it("should return true when pendente is greater than 0", () => {
      situacao = { ...situacao, HIPERTENSOS: { total: 0, pendente: 3 } };
      expect(isValidSituation(situacao, "HIPERTENSOS" as Indicadores)).toBe(true);
    });
  
    it("should return true when both total and pendente are 0", () => {
      situacao = { ...situacao, PRE_NATAL_6_CONSULTAS: { total: 0, pendente: 0 } };
      expect(isValidSituation(situacao, "PRE_NATAL_6_CONSULTAS" as Indicadores)).toBe(true);
    });

    it("should return false when both total and pendente are null", () => {
      situacao = { ...situacao, PRE_NATAL_ODONTO: { total: null, pendente: null } };
      expect(isValidSituation(situacao, "PRE_NATAL_ODONTO" as Indicadores)).toBe(false);
    });

    it("should return true when both total and pendente are undefined", () => {
      situacao = { ...situacao, PRE_NATAL_SIFILIS_HIV: { total: undefined, pendente: undefined } };
      expect(isValidSituation(situacao, "PRE_NATAL_SIFILIS_HIV" as Indicadores)).toBe(true);
    });
  
});