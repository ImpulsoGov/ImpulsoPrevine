import { cpfFormatter } from "../";
import { cpf } from "cpf-cnpj-validator";

jest.mock("cpf-cnpj-validator", () => ({
    cpf: {
        isValid: jest.fn(),
        format: jest.fn(),
    },
}));

const mockedCpfIsValid = cpf.isValid as jest.Mock;
const mockedCpfFormat = cpf.format as jest.Mock;

describe("cpfFormatter", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve formatar corretamente um CPF valido", () => {
        const cpf = "20352901047";
        const formattedCpf = "203.529.010-47";
        mockedCpfIsValid.mockReturnValueOnce(true);
        mockedCpfFormat.mockReturnValueOnce("203.529.010-47");
        expect(cpfFormatter(cpf)).toBe(formattedCpf);
    });

    it("deve formatar corretamente um CPF valido com menos de 11 dígitos", () => {
        const cpf = "1352901047";
        mockedCpfIsValid.mockReturnValueOnce(true);
        mockedCpfFormat.mockReturnValueOnce("013.529.010-47");
        const formattedCpf = cpfFormatter(cpf);
        expect(formattedCpf).toBe("013.529.010-47");
    });

    it("deve lidar com cpf invalido", () => {
        const cpf = "000000000";
        mockedCpfIsValid.mockReturnValueOnce(false);
        const formattedCpf = cpfFormatter(cpf);
        expect(formattedCpf).toBe("");
    });

    it("deve lidar com cpf inexistente", () => {
        const cpf = "";
        const formattedCpf = cpfFormatter(cpf);
        expect(formattedCpf).toBe("");
    });
});
