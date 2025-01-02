import { type NextRequest } from 'next/server';
import data from '../../data.json';
import { sortData, validateSortOrder } from '../../utils/sorting';
import { paginateData, validatePaginationParams } from '../../utils/pagination';
import { BadRequestError } from '../../utils/errors';

const VALID_LIST_NAMES = ['hipertensao'];

type Data = Array<Record<string, string | null>>;
type Params = {
  list: string;
  municipio_id_sus: string;
}

function searchBaseData({
  data,
  municipio_id_sus,
}: {
  data: Data;
  municipio_id_sus: string;
}): Data {
  const municipalityData = data.filter((item) => item.municipio_id_sus === municipio_id_sus);
  return municipalityData;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const requestParams = await params;
    const searchParams = req.nextUrl.searchParams;
    const pagination = {
      page: searchParams.get('pagination[page]'),
      pageSize: searchParams.get('pagination[pageSize]')
    };
    const sorting = searchParams.get('sortBy');
    const baseData = searchBaseData({
      data: [...data],
      municipio_id_sus: requestParams.municipio_id_sus,
    });
    let responseData: Data = [...baseData];

    if (!VALID_LIST_NAMES.includes(requestParams.list)) {
      return Response.json({ message: 'Lista não encontrada' }, { status: 404 });
    }

    if (sorting) {
      const [field, sortOrder] = sorting.includes(':')
        ? sorting.split(':')
        : [sorting, 'asc'];

      validateSortOrder(sortOrder);

      responseData = [...sortData({
        data: responseData,
        field,
        sortOrder: sortOrder as 'asc' | 'desc',
      })];
    }

    if (pagination.page || pagination.pageSize) {
      validatePaginationParams(pagination);

      responseData = [...paginateData({
        data: responseData,
        page: Number(pagination.page),
        pageSize: Number(pagination.pageSize),
      })];
    }

    return Response.json({
      data: responseData,
      totalRows: baseData.length,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: 'Erro interno' }, { status: 500 });
  }
}
