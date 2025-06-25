import { render, screen } from "@testing-library/react";
import { DataTable } from "../index";
import { FiltersContext } from "@/features/acf/frontend/common/WithFilters/context";
import { PaginationContext } from "@/features/acf/frontend/common/WithPagination/context";
import { SortingContext } from "@/features/acf/frontend/common/WithSorting/context";
import { SearchContext } from "@/features/acf/frontend/common/WithSearch/context";
import type { GridColDef, GridSortItem } from "@mui/x-data-grid";
import type { AppliedFilters } from "../../WithFilters";
//mockResolvedValue = Promise.resolve()
const mockServiceGetPage = jest.fn().mockResolvedValue({
    data: {
        page: [{ id: 1, name: "Mock Row" }],
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

describe("DataTable", () => {
    it("Deve renderizar a tabela com os dados mockados", async () => {
        render(
            <SearchContext.Provider value={mockSearchModel}>
                <SortingContext.Provider value={mockSortingModel}>
                    <FiltersContext.Provider value={mockFilters}>
                        <PaginationContext.Provider value={mockPaginationModel}>
                            <DataTable
                                columns={mockColumns}
                                serviceGetPage={mockServiceGetPage}
                            />
                        </PaginationContext.Provider>
                    </FiltersContext.Provider>
                </SortingContext.Provider>
            </SearchContext.Provider>
        );

        expect(await screen.findByTestId("list-table")).toBeInTheDocument();
    });
});
