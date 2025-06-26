import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import * as DataTableModule from "../index";
import { FiltersContext } from "@/features/acf/frontend/common/WithFilters/context";
import { PaginationContext } from "@/features/acf/frontend/common/WithPagination/context";
import { SortingContext } from "@/features/acf/frontend/common/WithSorting/context";
import { SearchContext } from "@/features/acf/frontend/common/WithSearch/context";
import { SessionProvider } from "next-auth/react";
import type { GridColDef, GridSortItem } from "@mui/x-data-grid";
import type { AppliedFilters } from "../../WithFilters";
import type { AxiosError, AxiosRequestHeaders } from "axios";

jest.mock("@impulsogov/design-system", () => ({
    Table: jest.fn(() => <div data-testid="list-table"> TABLE </div>),
}));
jest.mock("next-auth", () => ({
    useSession: jest.fn(),
}));

const mockServiceGetPage = jest.fn().mockResolvedValue({
    data: {
        page: [{ id: 1, name: "Mocked" }],
        totalRows: 1,
    },
});

const mockColumns: Array<GridColDef> = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
];

const mockFilters = {} as AppliedFilters;
const mockPaginationModel = {
    gridPaginationModel: { page: 0, pageSize: 10 },
    onPaginationModelChange: jest.fn(),
    resetPagination: jest.fn(),
};
const mockSortingModel = {
    gridSortingModel: { field: "id", sort: "asc" } as GridSortItem,
    onSortingModelChange: jest.fn(),
};

const mockSearchModel = {
    searchString: "",
};

const clientSession = {
    user: {
        id: "xxxxxxxx",
        nome: "usuarioNome",
        mail: "usuario@mail.com",
        cargo: "impulser",
        municipio: "Impulsolandia - BR",
        equipe: "equipe1",
        municipio_id_sus: "1111111",
        perfis: [5, 8],
        access_token: "token",
    },
    status: "authenticated",
    expires: "1",
};
describe("DataTable", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Deve renderizar a tabela com o teste id correto quando serviceGetPage retorna com sucesso.", async () => {
        render(
            <SearchContext.Provider value={mockSearchModel}>
                <SortingContext.Provider value={mockSortingModel}>
                    <FiltersContext.Provider value={mockFilters}>
                        <PaginationContext.Provider value={mockPaginationModel}>
                            <SessionProvider session={clientSession}>
                                <DataTableModule.DataTable
                                    columns={mockColumns}
                                    serviceGetPage={mockServiceGetPage}
                                />
                            </SessionProvider>
                        </PaginationContext.Provider>
                    </FiltersContext.Provider>
                </SortingContext.Provider>
            </SearchContext.Provider>
        );

        expect(await screen.findByTestId("list-table")).toBeInTheDocument();
    });

    test("Deve exibir mensagem de erro quando serviceGetPage retorna um AxiosError", async () => {
        const axiosError: AxiosError = {
            name: "AxiosError",
            message: "Request failed",
            code: "ERR_BAD_REQUEST",
            isAxiosError: true,
            config: {
                headers: {} as AxiosRequestHeaders,
            },
            toJSON: () => ({}),
        };
        mockServiceGetPage.mockRejectedValue(axiosError);
        render(
            <SearchContext.Provider value={mockSearchModel}>
                <SortingContext.Provider value={mockSortingModel}>
                    <FiltersContext.Provider value={mockFilters}>
                        <PaginationContext.Provider value={mockPaginationModel}>
                            <SessionProvider session={clientSession}>
                                <DataTableModule.DataTable
                                    columns={mockColumns}
                                    serviceGetPage={mockServiceGetPage}
                                />
                            </SessionProvider>
                        </PaginationContext.Provider>
                    </FiltersContext.Provider>
                </SortingContext.Provider>
            </SearchContext.Provider>
        );

        expect(await screen.findByTestId("error-message")).toBeInTheDocument();
    });
});
