import type { GridSortModel } from "@mui/x-data-grid";

export const DEFAULT_SORTING: GridSortModel = [{ field: "nome", sort: "asc" }];

export const handleSortModelChangeFunction = (
    newSortModel: GridSortModel, 
    setSorting: React.Dispatch<React.SetStateAction<GridSortModel>>,
)=> {
    newSortModel.length > 0
        ? setSorting([...newSortModel])
        : setSorting([...DEFAULT_SORTING]);
}
