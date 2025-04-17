import { isCpfPatientNotBirthday } from '@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/modules/isCpfPatientNotBirthday';

describe("isCpf", () => {
    it("retorna true para CPF válido de 11 dígitos sem hífen", () => {
        expect(isCpfPatientNotBirthday("52998224725")).toBe(true);
        expect(isCpfPatientNotBirthday("12345678909")).toBe(true);
    });

    it("retorna false para CPF que contém hífen ou ponto", () => {
        expect(isCpfPatientNotBirthday("529.982.247-25")).toBe(false);
        expect(isCpfPatientNotBirthday("529982247-25")).toBe(false);
        expect(isCpfPatientNotBirthday("1234567890-")).toBe(false);
    });
    it("retorna false para string vazia", () => {
        expect(isCpfPatientNotBirthday("")).toBe(false);
    });
    it("retorna false para string contendo espaços", () => {
        expect(isCpfPatientNotBirthday("52998224725 ")).toBe(false);
        expect(isCpfPatientNotBirthday(" 52998224725 ")).toBe(false);
        expect(isCpfPatientNotBirthday("52998 224725")).toBe(false);
        expect(isCpfPatientNotBirthday(" 52998224725")).toBe(false);
    });

    it("retorna false para CNPJ", () => {
        expect(isCpfPatientNotBirthday("48976292000129")).toBe(false);
        expect(isCpfPatientNotBirthday("00.332.905/0001-69")).toBe(false);
    });
    it("retorna false para sequência de dígitos todos iguais", () => {
        expect(isCpfPatientNotBirthday("00000000000")).toBe(false);
        expect(isCpfPatientNotBirthday("11111111111")).toBe(false);
        expect(isCpfPatientNotBirthday("22222222222")).toBe(false);
    });

    it("retorna false para strings com quantidade de dígitos diferente de 11", () => {
        expect(isCpfPatientNotBirthday("1234567890")).toBe(false); // 10 dígitos
        expect(isCpfPatientNotBirthday("123456789012")).toBe(false); // 12 dígitos
    });

    it("retorna false para strings com caracteres não numéricos", () => {
        expect(isCpfPatientNotBirthday("abcdef12345")).toBe(false);
        expect(isCpfPatientNotBirthday("12345abc901")).toBe(false);
    });
    it("retorna false para data no formato ISO sem timestamp", () => {
        expect(isCpfPatientNotBirthday("2023-01-23")).toBe(false);
    });
    it("retorna false para entrada null", () => {
        expect(isCpfPatientNotBirthday(null)).toBe(false);
    });
});
