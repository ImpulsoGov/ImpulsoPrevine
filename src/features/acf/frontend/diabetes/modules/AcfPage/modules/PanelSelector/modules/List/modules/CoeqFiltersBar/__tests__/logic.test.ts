import * as z from "zod/v4";
import { onlyValidFilterValues, toHtmlSelectOptions } from "../logic";

// Mocks
const mockPatientStatusEnum = z.enum(["Em dia", "A fazer"]);

describe("onlyValidFilterValues", () => {
    it("filtra valores válidos de acordo com schema zod", () => {
        const input = ["Em dia", "Inválido"] as Array<unknown>;
        const result = onlyValidFilterValues(input, mockPatientStatusEnum);
        expect(result).toEqual(["Em dia"]);
    });
});

describe("selectOptions", () => {
    it("transforma valores em objetos { value, label }", () => {
        const input = ["A", "B"];
        const result = toHtmlSelectOptions(
            input as Parameters<typeof toHtmlSelectOptions>[0]
        );
        expect(result).toEqual([
            { value: "A", label: "A" },
            { value: "B", label: "B" },
        ]);
    });
});

// describe("searchParamsToSelectedValues", () => {
//     it("converte corretamente os filtros", () => {
//         const params = new URLSearchParams({
//             patientStatus:
//                 "Consulta e solicitação de hemoglobina a fazer,Apenas a consulta a fazer,Apenas a solicitação de hemoglobina a fazer,Consulta e solicitação de hemoglobina em dia,Inválido",
//             patientAgeRange: "Menos de 17 anos,Inválido",
//             visitantCommunityHealthWorker: "ACS1,ACS2",
//             conditionIdentifiedBy: "Diagnóstico Clínico,Inválido",
//         });

//         const result = searchParamsToSelectedValues(params);

//         expect(result).toEqual({
//             visitantCommunityHealthWorker: ["ACS1", "ACS2"],
//             patientStatus: [
//                 "Consulta e solicitação de hemoglobina a fazer",
//                 "Apenas a consulta a fazer",
//                 "Apenas a solicitação de hemoglobina a fazer",
//                 "Consulta e solicitação de hemoglobina em dia",
//             ],
//             conditionIdentifiedBy: "Diagnóstico Clínico",
//             patientAgeRange: ["Menos de 17 anos"],
//         });
//     });

//     it("retorna arrays vazias para filtros ausentes", () => {
//         const params = new URLSearchParams();
//         const result = searchParamsToSelectedValues(params);

//         expect(result).toEqual({
//             visitantCommunityHealthWorker: [],
//             patientStatus: [],
//             conditionIdentifiedBy: "",
//             patientAgeRange: [],
//         });
//     });
// });
