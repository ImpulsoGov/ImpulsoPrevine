import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import { SortByKey } from "..";

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
    goodPracticesSum: 25,
    goodPracticesStatusByQuarter: "Todas em dia",
    medicalRecordUpdated: "Atualizada",
    latestHomeVisitDate: new Date("2023-01-01"),
    homeVisitStatusByQuarter: "Em dia",
    latestWeightHeightDate: new Date("2023-01-01"),
    weightHeightStatusByQuarter: "Em dia",
};

describe("SortByKey", () => {
    it("Ordena array de AcfItem pela propriedade microAreaName asc", () => {
        const list = [
            { ...base, microAreaName: "Área 12" },
            { ...base, microAreaName: "Área 1" },
            { ...base, microAreaName: "Área 3" },
        ];
        const result = list.sort((a, b) =>
            SortByKey({ a, b, key: "microAreaName", order: "asc" })
        );
        const expected = [
            { ...base, microAreaName: "Área 1" },
            { ...base, microAreaName: "Área 12" },
            { ...base, microAreaName: "Área 3" },
        ];
        expect(result).toEqual(expected);
    });
    describe("Item é null", () => {
        const a = { ...base, patientCpf: null };
        const b = { ...base };

        it("retorna 0 quando ambos são null", () => {
            expect(
                SortByKey({ a, b: a, key: "patientCpf", order: "asc" })
            ).toBe(0);
            expect(
                SortByKey({ a, b: a, key: "patientCpf", order: "desc" })
            ).toBe(0);
        });

        it("coloca null por último em ascendente", () => {
            expect(SortByKey({ a, b, key: "patientCpf", order: "asc" })).toBe(
                1
            );
        });

        it("coloca null por ultimo em descendente", () => {
            expect(SortByKey({ a, b, key: "patientCpf", order: "desc" })).toBe(
                1
            );
        });
    });

    describe("strings", () => {
        const a = { ...base, patientName: "Carlos da Silva" };
        const b = { ...base, patientName: "Adão Alves" };

        it("ordena ascendente corretamente", () => {
            expect(SortByKey({ a, b, key: "patientName", order: "asc" })).toBe(
                1
            );
            expect(
                SortByKey({ a: b, b: a, key: "patientName", order: "asc" })
            ).toBe(-1);
        });

        it("ordena descendente corretamente", () => {
            expect(SortByKey({ a, b, key: "patientName", order: "desc" })).toBe(
                -1
            );
            expect(
                SortByKey({ a: b, b: a, key: "patientName", order: "desc" })
            ).toBe(1);
        });
    });

    describe("números", () => {
        const a = { ...base, patientAge: 21 };
        const b = { ...base, patientAge: 44 };

        it("ordena ascendente corretamente", () => {
            expect(
                SortByKey({ a, b, key: "patientAge", order: "asc" })
            ).toBeLessThan(0);
            expect(
                SortByKey({ a: b, b: a, key: "patientAge", order: "asc" })
            ).toBeGreaterThan(0);
        });

        it("ordena descendente corretamente", () => {
            expect(
                SortByKey({ a, b, key: "patientAge", order: "desc" })
            ).toBeGreaterThan(0);
            expect(
                SortByKey({ a: b, b: a, key: "patientAge", order: "desc" })
            ).toBeLessThan(0);
        });
    });

    describe("datas", () => {
        const d1 = new Date("2020-01-01");
        const d2 = new Date("2021-01-01");
        const a = { ...base, latestAppointmentDate: d1 };
        const b = { ...base, latestAppointmentDate: d2 };
        const invalid = { ...base, latestAppointmentDate: new Date("invalid") };

        it("ordena ascendente corretamente", () => {
            expect(
                SortByKey({ a, b, key: "latestAppointmentDate", order: "asc" })
            ).toBeLessThan(0);
            expect(
                SortByKey({
                    a: b,
                    b: a,
                    key: "latestAppointmentDate",
                    order: "asc",
                })
            ).toBeGreaterThan(0);
        });

        it("ordena descendente corretamente", () => {
            expect(
                SortByKey({ a, b, key: "latestAppointmentDate", order: "desc" })
            ).toBeGreaterThan(0);
            expect(
                SortByKey({
                    a: b,
                    b: a,
                    key: "latestAppointmentDate",
                    order: "desc",
                })
            ).toBeLessThan(0);
        });

        it("coloca datas inválidas no final em ordem ascendente", () => {
            expect(
                SortByKey({
                    a,
                    b: invalid,
                    key: "latestAppointmentDate",
                    order: "asc",
                })
            ).toBeLessThan(0);
            expect(
                SortByKey({
                    a: invalid,
                    b,
                    key: "latestAppointmentDate",
                    order: "asc",
                })
            ).toBeGreaterThan(0);
        });

        it("coloca datas inválidas no final em ordem descendente", () => {
            expect(
                SortByKey({
                    a,
                    b: invalid,
                    key: "latestAppointmentDate",
                    order: "desc",
                })
            ).toBeLessThan(0);
            expect(
                SortByKey({
                    a: invalid,
                    b,
                    key: "latestAppointmentDate",
                    order: "desc",
                })
            ).toBeGreaterThan(0);
        });

        it("retorna 0 quando ambos os itens têm datas inválidas", () => {
            expect(
                SortByKey({
                    a: invalid,
                    b: invalid,
                    key: "latestAppointmentDate",
                    order: "asc",
                })
            ).toBe(0);
            expect(
                SortByKey({
                    a: invalid,
                    b: invalid,
                    key: "latestAppointmentDate",
                    order: "desc",
                })
            ).toBe(0);
        });
    });

    describe("tipos não suportados", () => {
        const invalidType = {
            ...base,
            latestAppointmentDate: true,
        } as unknown as HypertensionAcfItem;
        const invalidKey = {
            ...base,
            latestAppointmentDate: { test: "test" },
        } as unknown as HypertensionAcfItem;
        const invalidDate = {
            ...base,
            latestAppointmentDate: new Date("invalid"),
        } as unknown as HypertensionAcfItem;

        it("coloca tipos não suportados no final em ordem ascendente", () => {
            expect(
                SortByKey({
                    a: invalidType,
                    b: invalidDate,
                    key: "latestAppointmentDate",
                    order: "asc",
                })
            ).toBe(0);
        });

        it("coloca tipos não suportados no final em ordem descendente", () => {
            expect(
                SortByKey({
                    a: invalidType,
                    b: invalidDate,
                    key: "latestAppointmentDate",
                    order: "desc",
                })
            ).toBe(0);
        });

        it("retorna 0 quando ambos os tipos são não suportados", () => {
            expect(
                SortByKey({
                    a: invalidType,
                    b: invalidKey,
                    key: "latestAppointmentDate",
                    order: "asc",
                })
            ).toBe(0);
            expect(
                SortByKey({
                    a: invalidType,
                    b: invalidKey,
                    key: "latestAppointmentDate",
                    order: "desc",
                })
            ).toBe(0);
        });
    });
});
