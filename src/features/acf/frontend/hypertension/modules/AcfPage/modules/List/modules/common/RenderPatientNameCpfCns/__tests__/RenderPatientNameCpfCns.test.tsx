import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import type { BaseRow } from "..";
import { RenderPatientNameCpfCns } from "..";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import { cpf } from "cpf-cnpj-validator";
import { cnsFormatter } from "../modules/CnsFormatter";

jest.mock("cpf-cnpj-validator", () => ({ cpf: { format: jest.fn() } }));
jest.mock("../modules/CnsFormatter", () => ({ cnsFormatter: jest.fn() }));
jest.mock("@/features/acf/frontend/common/NameFormatter", () => ({
    nameFormatter: jest.fn(),
}));

const mockedNameFormatter = nameFormatter as jest.Mock;
const mockedCpfFormat = cpf.format as jest.Mock;
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
        const formattedCns = "123 4567 8901 2345";

        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCpfFormat.mockReturnValue(formattedCpf);
        mockedCnsFormatter.mockReturnValue(formattedCns);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByText(formattedName)).toBeInTheDocument();
        expect(screen.getByText(formattedCpf)).toBeInTheDocument();
        expect(screen.queryByText(formattedCns)).not.toBeInTheDocument();
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
        const formattedCns = "";

        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCpfFormat.mockReturnValue(formattedCpf);
        mockedCnsFormatter.mockReturnValue(formattedCns);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByText(formattedName)).toBeInTheDocument();
        expect(screen.getByText(formattedCpf)).toBeInTheDocument();
        expect(screen.queryByText(formattedCns)).not.toBeInTheDocument();
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
        const formattedCpf = "";
        const formattedCns = "123 4567 8901 2345";

        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCpfFormat.mockReturnValue(formattedCpf);
        mockedCnsFormatter.mockReturnValue(formattedCns);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByText(formattedName)).toBeInTheDocument();
        expect(screen.getByText(formattedCns)).toBeInTheDocument();
        expect(screen.queryByText(formattedCpf)).not.toBeInTheDocument();
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
        const formattedCpf = "";
        const formattedCns = "";

        mockedNameFormatter.mockReturnValue(formattedName);
        mockedCpfFormat.mockReturnValue(formattedCpf);
        mockedCnsFormatter.mockReturnValue(formattedCns);

        render(<RenderPatientNameCpfCns {...params} />);

        expect(screen.getByText(formattedName)).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
    });
});
