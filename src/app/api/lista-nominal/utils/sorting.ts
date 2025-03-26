import { DataItem, ValidValue } from "@/utils/FilterData";
import { BadRequestError } from "./errors";

const VALID_SORT_ORDER = ["asc", "desc"];

export type SortOrder = "asc" | "desc";

interface SortConfig {
    data: DataItem[];
    field: string;
    sortOrder: SortOrder;
}

export function validateSortOrder(sortOrder: string): void {
    const isValidSort = VALID_SORT_ORDER.includes(sortOrder);

    if (!isValidSort) {
        throw new BadRequestError(
            "Valor de ´ordem´ inválido, deve ser igual a asc ou desc",
        );
    }
}

export function isDateField(value: string) {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    return datePattern.test(value);
}

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map((item) => Number(item));
    // Subtrai 1 porque espera o índice do mês (inicia em 0)
    const date = new Date(year, month - 1, day);
    return date;
};

const compareValues = (
    a: ValidValue,
    b: ValidValue,
    sortOrder: SortOrder,
): number => {
    const isSortOrderAsc = sortOrder === "asc";
    // Se os valores forem iguais, não é necessário ordenar
    if (a === b) return 0;
    // Se um valor for nulo, ele deve ir para o final da lista
    if (a === null) return 1;
    if (b === null) return -1;

    if (typeof a === "number" && typeof b === "number") {
        return isSortOrderAsc ? a - b : b - a;
    }

    const dateA = typeof a === "string" && isDateField(a) ? parseDate(a) : null;
    const dateB = typeof b === "string" && isDateField(b) ? parseDate(b) : null;

    if (dateA && dateB) {
        return isSortOrderAsc
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
    }

    const strA = String(a);
    const strB = String(b);
    return isSortOrderAsc ? strA.localeCompare(strB) : strB.localeCompare(strA);
};

export function sortData({ data, field, sortOrder }: SortConfig): DataItem[] {
    return [...data].sort((a, b) =>
        compareValues(a[field], b[field], sortOrder),
    );
}
