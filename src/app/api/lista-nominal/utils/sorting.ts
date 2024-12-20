import { BadRequestError } from "./errors";

const VALID_SORT_ORDER = ['asc', 'desc'];

type SortableRecord = Record<string, string | null>;
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  data: SortableRecord[];
  field: string;
  sortOrder: SortOrder;
}

export function validateSortOrder(sortOrder: string): Response | void {
  const isValidSort = VALID_SORT_ORDER.includes(sortOrder);

  if (!isValidSort) {
    throw new BadRequestError('Valor de ´ordem´ inválido, deve ser igual a asc ou desc');
  }
}

export function isDateField(value: string) {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return datePattern.test(value);
};

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map((item) => Number(item));
  // Subtrai 1 porque espera o índice do mês (inicia em 0)
  const date = new Date(year, month - 1, day);
  return date;
};

const compareValues = (
  a: string | null,
  b: string | null,
  sortOrder: SortOrder
): number => {
  if (a === b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  const dateA = isDateField(a) ? parseDate(a) : null;
  const dateB = isDateField(b) ? parseDate(b) : null;

  if (dateA && dateB) {
    return sortOrder === 'asc' 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  }

  return sortOrder === 'asc'
    ? a.localeCompare(b)
    : b.localeCompare(a);
};

export function sortData({
  data,
  field,
  sortOrder
}: SortConfig): SortableRecord[] {
  return [...data].sort((a, b) =>
    compareValues(a[field], b[field], sortOrder)
  );
}
