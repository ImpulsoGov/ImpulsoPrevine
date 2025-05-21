import type { GridSortModel } from "@mui/x-data-grid";

export const DEFAULT_SORTING: GridSortModel = [{ field: "nome", sort: "asc" }];

export const handleSortModelChangeFunction = (
    newSortModel: GridSortModel,
    setSorting: React.Dispatch<React.SetStateAction<GridSortModel>>
): void => {
    if (newSortModel.length > 0) {
        setSorting([...newSortModel]);
    } else {
        setSorting([...DEFAULT_SORTING]);
    }
};
