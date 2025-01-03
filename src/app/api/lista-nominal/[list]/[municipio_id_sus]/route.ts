import { type NextRequest } from 'next/server';
import data from '../../data.json';
import { sortData, SortOrder, validateSortOrder } from '../../utils/sorting';
import { paginateData, validatePaginationParams } from '../../utils/pagination';
import { BadRequestError } from '../../utils/errors';
import { filterData } from '@/utils/FilterData';
import type { DataItem, Filters } from '@/utils/FilterData';

const getParams = async(searchParams: URLSearchParams) => {
    const filters: { [key: string]: string | string[] } = {};
    searchParams.get('filters')?.split(';').forEach((filter) => {
        const [key, valueString] = filter.split(':');
        const valueArray = valueString.split(',');
        filters[key] = valueArray.length !== 1 ? valueArray : valueArray[0];
    });
    return filters as Filters
}

const VALID_LIST_NAMES = ['hipertensao'];

type Data = DataItem[];
type Params = {
  list: string;
  municipio_id_sus: string;
}

function searchBaseData({
  data,
  municipio_id_sus,
}: {
  data: DataItem[];
  municipio_id_sus: string;
}): DataItem[] {
  const municipalityData = data.filter((item) => item.municipio_id_sus === municipio_id_sus);
  return municipalityData;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filters = await getParams(searchParams);
    const pagination = {
      page: searchParams.get('pagination[page]'),
      pageSize: searchParams.get('pagination[pageSize]')
    };
    const sorting = searchParams.get('sortBy');
    const baseData = searchBaseData({
      data: [...data],
      municipio_id_sus: params.municipio_id_sus,
    });
    let responseData: Data = [...baseData];

    if (!VALID_LIST_NAMES.includes(params.list)) {
      return Response.json({ message: 'Lista não encontrada' }, { status: 404 });
    }

    responseData = filterData(responseData,filters); // será substituido por consulta no banco de dados

    if (sorting) {
      const [field, sortOrder] = sorting.includes(':')
        ? sorting.split(':')
        : [sorting, 'asc'];

      validateSortOrder(sortOrder);

      responseData = [...sortData({
        data: responseData,
        field,
        sortOrder: sortOrder as SortOrder,
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
    }, { status: 200 });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: 'Erro ao consultar dados' , detail : (error as Error).message },{ status: 500 });
  }
}
