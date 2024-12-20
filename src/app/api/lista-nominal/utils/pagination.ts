import { BadRequestError } from "./errors";

export function validatePaginationParams({
  page,
  pageSize,
}: {
  page: string | null;
  pageSize: string | null;
}): Response | void {
  const hasOnlyPage = page && !pageSize;
  const hasOnlyPageSize = !page && pageSize;

  if (hasOnlyPage || hasOnlyPageSize) {
    throw new BadRequestError('Os parâmetros ´paginacao[pagina]´ e ´paginacao[tamanho]´ devem ser usados em conjunto');
  }
  const parsedPage = Number(page);
  const parsedPageSize = Number(pageSize);

  if (parsedPage < 0) {
    throw new BadRequestError('O parâmetro ´paginacao[pagina]´ deve ser maior ou igual a 0')
  }

  if (parsedPageSize < 0) {
    throw new BadRequestError('O parâmetro ´paginacao[tamanho]´ deve ser maior ou igual a 0')
  }
}

export function paginateData({
  data,
  page,
  pageSize
}: {
  data: Record<string, string | null>[];
  page: number;
  pageSize: number;
}) {
  // Aceita página igual a 0 (primeira página)
  const start = page * pageSize;
  const end = start + pageSize;

  return data.slice(start, end);
}
