import type { GridPaginationModel } from "@mui/x-data-grid";
import { BadRequestError } from "./errors";

export function validatePaginationParams({
    page, pageSize,
}: GridPaginationModel): void {

    if (page < 0) {
        throw new BadRequestError(
            "O parâmetro ´paginacao[pagina]´ deve ser maior ou igual a 0"
        );
    }

    if (pageSize < 0) {
        throw new BadRequestError(
            "O parâmetro ´paginacao[tamanho]´ deve ser maior ou igual a 0"
        );
    }
}
