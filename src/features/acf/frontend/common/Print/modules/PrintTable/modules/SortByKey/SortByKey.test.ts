import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import { SortByKey } from "./SortByKey";
import type { AcfItem } from "@/features/acf/shared/schema";

const base: HypertensionAcfItem = {
    municipalitySusId: "001",
    municipalityName: "Cidade A",
    patientName: "Fulano",
    patientCpf: "12345678900",
    patientCns: "123456789000000",
    latestAppointmentDate: null,
    appointmentStatusByQuarter: "Em dia",
    latestExamRequestDate: null,
    latestExamRequestStatusByQuarter: "Em dia",
    careTeamName: "Equipe 1",
    microAreaName: "Área 1",
    patientPhoneNumber: null,
    patientAge: 40,
    patientAgeRange: "20 a 59 (Adulto)",
};

describe("SortByKey", () => {
    describe("null e undefined", () => {
        const a = { ...base, patientCpf: null };
        const b = { ...base };
        it("retorna 0 quando ambos são null", () => {
            expect(
                SortByKey({
                    a,
                    b,
                    key: "patientCpf",
                    order: "asc",
                })
            ).toBe(0);
            expect(
                SortByKey({
                    ...makeItems(null, null, "municipalitySusId"),
                    order: "desc",
                })
            ).toBe(0);
        });

        it("coloca null por último em ascendente", () => {
            expect(
                SortByKey({
                    ...makeItems(
                        null,
                        { municipalitySusId: "111111" } as unknown as AcfItem,
                        "municipalitySusId"
                    ),
                    order: "asc",
                })
            ).toBe(1);
            expect(
                SortByKey({
                    ...makeItems(
                        "111111" as unknown as AcfItem,
                        null,
                        "municipalitySusId"
                    ),
                    order: "asc",
                })
            ).toBe(-1);
        });

        it("coloca null por primeiro em descendente", () => {
            expect(SortByKey({ ...makeItems(null, "a"), order: "desc" })).toBe(
                -1
            );
            expect(SortByKey({ ...makeItems("a", null), order: "desc" })).toBe(
                1
            );
        });

        it("funciona igual para undefined", () => {
            expect(
                SortByKey({ ...makeItems(undefined, "a"), order: "asc" })
            ).toBe(1);
            expect(
                SortByKey({ ...makeItems("a", undefined), order: "asc" })
            ).toBe(-1);
        });
    });

    describe("strings", () => {
        it("ordena ascendente corretamente", () => {
            expect(
                SortByKey({ ...makeItems("a", "b"), order: "asc" })
            ).toBeLessThan(0);
            expect(
                SortByKey({ ...makeItems("b", "a"), order: "asc" })
            ).toBeGreaterThan(0);
            expect(SortByKey({ ...makeItems("a", "a"), order: "asc" })).toBe(0);
        });

        it("ordena descendente corretamente", () => {
            expect(
                SortByKey({ ...makeItems("a", "b"), order: "desc" })
            ).toBeGreaterThan(0);
            expect(
                SortByKey({ ...makeItems("b", "a"), order: "desc" })
            ).toBeLessThan(0);
            expect(SortByKey({ ...makeItems("a", "a"), order: "desc" })).toBe(
                0
            );
        });
    });

    describe("números", () => {
        it("ordena ascendente corretamente", () => {
            expect(
                SortByKey({ ...makeItems(1, 2), order: "asc" })
            ).toBeLessThan(0);
            expect(
                SortByKey({ ...makeItems(2, 1), order: "asc" })
            ).toBeGreaterThan(0);
            expect(SortByKey({ ...makeItems(5, 5), order: "asc" })).toBe(0);
        });

        it("ordena descendente corretamente", () => {
            expect(
                SortByKey({ ...makeItems(1, 2), order: "desc" })
            ).toBeGreaterThan(0);
            expect(
                SortByKey({ ...makeItems(2, 1), order: "desc" })
            ).toBeLessThan(0);
            expect(SortByKey({ ...makeItems(5, 5), order: "desc" })).toBe(0);
        });
    });

    describe("datas", () => {
        const d1 = new Date("2020-01-01");
        const d2 = new Date("2021-01-01");

        it("ordena ascendente corretamente", () => {
            expect(
                SortByKey({ ...makeItems(d1, d2), order: "asc" })
            ).toBeLessThan(0);
            expect(
                SortByKey({ ...makeItems(d2, d1), order: "asc" })
            ).toBeGreaterThan(0);
            expect(SortByKey({ ...makeItems(d1, d1), order: "asc" })).toBe(0);
        });

        it("ordena descendente corretamente", () => {
            expect(
                SortByKey({ ...makeItems(d1, d2), order: "desc" })
            ).toBeGreaterThan(0);
            expect(
                SortByKey({ ...makeItems(d2, d1), order: "desc" })
            ).toBeLessThan(0);
            expect(SortByKey({ ...makeItems(d1, d1), order: "desc" })).toBe(0);
        });

        it("retorna 0 se uma data for inválida", () => {
            const invalid = new Date("invalid");
            expect(SortByKey({ ...makeItems(invalid, d1), order: "asc" })).toBe(
                0
            );
            expect(SortByKey({ ...makeItems(d1, invalid), order: "asc" })).toBe(
                0
            );
        });
    });

    describe("tipos não suportados", () => {
        it("retorna 0 para booleanos", () => {
            expect(SortByKey({ ...makeItems(true, false), order: "asc" })).toBe(
                0
            );
        });

        it("retorna 0 para objetos arbitrários", () => {
            expect(
                SortByKey({ ...makeItems({ x: 1 }, { x: 2 }), order: "asc" })
            ).toBe(0);
        });
    });
});
