import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { BaseRow } from "..";
import { RenderPatientNameCpfCns } from "..";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import { cnsFormatter } from "../modules/Formatters/CnsFormatter";
import { cpfFormatter } from "../modules/Formatters/CpfFormatter";

jest.mock("../modules/Formatters/CnsFormatter", () => ({
    cnsFormatter: jest.fn(),
}));
jest.mock("../modules/Formatters/CpfFormatter", () => ({
    cpfFormatter: jest.fn(),
}));
jest.mock("@/features/acf/frontend/common/NameFormatter", () => ({
    nameFormatter: jest.fn(),
}));
const mockedNameFormatter = nameFormatter as jest.Mock;
const mockedCpfFormatter = cpfFormatter as jest.Mock;
const mockedCnsFormatter = cnsFormatter as jest.Mock;

describe("RenderPatientNameCpfCns", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Deve renderizar o nome e o CPF quando CPF e CNS existem", () => {
        const params = {
            row: {
                patientName: "JOSÉ DA SILVA",
                patientCpf: "12345678922",
                patientCns: "123456789012345",
            },
        } as GridRenderCellParams<BaseRow>;
        const formattedName = "José da Silva";
        const formattedCpf = "123.456.789-22";

        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCpfFormatter.mockReturnValue(formattedCpf);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByTestId("patient-name")).toHaveTextContent(
            formattedName
        );
        expect(screen.getByTestId("patient-cpf-cns")).toHaveTextContent(
            formattedCpf
        );
    });

    it("Deve renderizar o nome e o CPF quando CPF existe e o CNS não", () => {
        const params = {
            row: {
                patientName: "JOSÉ DA SILVA",
                patientCpf: "12345678922",
                patientCns: "",
            },
        } as GridRenderCellParams<BaseRow>;
        const formattedName = "José da Silva";
        const formattedCpf = "123.456.789-22";

        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCpfFormatter.mockReturnValue(formattedCpf);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByTestId("patient-name")).toHaveTextContent(
            formattedName
        );
        expect(screen.getByTestId("patient-cpf-cns")).toHaveTextContent(
            formattedCpf
        );
    });

    it("Deve renderizar o nome e o CNS quando CNS existe e o CPF não", () => {
        const params = {
            row: {
                patientName: "JOSÉ DA SILVA",
                patientCpf: "",
                patientCns: "123456789012345",
            },
        } as GridRenderCellParams<BaseRow>;
        const formattedName = "José da Silva";
        const formattedCns = "123 4567 8901 2345";
        const formattedCpf = "";
        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCnsFormatter.mockReturnValue(formattedCns);
        mockedCpfFormatter.mockReturnValue(formattedCpf);
        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByTestId("patient-name")).toHaveTextContent(
            formattedName
        );
        expect(screen.getByTestId("patient-cpf-cns")).toHaveTextContent(
            formattedCns
        );
    });

    it("Deve renderizar o nome e - quando CPF e CNS não existem", () => {
        const params = {
            row: {
                patientName: "JOSÉ DA SILVA",
                patientCpf: "",
                patientCns: "",
            },
        } as GridRenderCellParams<BaseRow>;
        const formattedName = "José da Silva";
        const formattedCns = "";
        const formattedCpf = "";
        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCnsFormatter.mockReturnValue(formattedCns);
        mockedCpfFormatter.mockReturnValue(formattedCpf);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByTestId("patient-name")).toHaveTextContent(
            formattedName
        );
        expect(screen.getByTestId("patient-cpf-cns")).toHaveTextContent("-");
    });
});
