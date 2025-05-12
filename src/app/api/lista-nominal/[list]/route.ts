
import {
    AuthenticationError,
    decodeToken,
    getEncodedSecret,
    getToken,
} from "@/utils/token";
import type { JWTToken } from "@/utils/token";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { NextRequest } from "next/server";
// import data from "../data.json";
// import { sortData, validateSortOrder } from "../utils/sorting";
// import type { SortOrder } from "../utils/sorting";
// import { paginateData, validatePaginationParams } from "../utils/pagination";
import { BadRequestError } from "../utils/errors";
import { validatePaginationParams } from "../utils/validatePaginationParams";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { diabetesData, diabetesDataCount } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/PaginatedTable/modules/DataTable/modules/diabetes/diabetes.controller";

const getFiltersParams = async (filtersString: string | null) => {
    const filters: FilterItem = {};
    if (!filtersString) return filters;
    const filtersStringSplit = filtersString.split(";").filter(Boolean);
    for (const filter of filtersStringSplit) {
        const [key, value] = filter.split(":");
        filters[key] =
            value.split(",").length > 1
                ? value.split(",")
                : value.split(",")[0];
    }
    return filters;
};

// type Data = DataItem[];

// function searchBaseData({
//     data,
//     municipio_id_sus,
// }: {
//     data: DataItem[];
//     municipio_id_sus: string;
// }): DataItem[] {
//     const municipalityData = data.filter(
//         (item) => item.municipio_id_sus === municipio_id_sus,
//     );
//     return municipalityData;
// }

export async function GET(
    req: NextRequest,
    // { params }: {
    //   params: Promise<{
    //     list: string;
    // }>} // quando for utilizar a conexao com o banco de dados
) {
   
    try {
        // const { list } = await params; // quando for utilizar a conexao com o banco de dados
        const searchParams = req.nextUrl.searchParams;
        const filtersParams = searchParams.get("filters");
        const filters = await getFiltersParams(filtersParams);
        const pageSizeDefault = 8;
        const pageDefault = 0;
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipalitySusID = payload?.municipio as string;
        const teamIne = payload?.equipe as string;
        const pagination: GridPaginationModel = {
            page: Number(searchParams.get("pagination[page]")) || pageDefault,
            pageSize: Number(searchParams.get("pagination[pageSize]")) || pageSizeDefault,
        };
        // const sorting = searchParams.get("sortBy");
        // const searchName = searchParams.get("search");
        // const baseData = searchBaseData({
        //     data: [...data],
        //     municipio_id_sus: municipioIdSus,
        // });
        // let totalRows = baseData.length;
        // // será substituido por consulta no banco de dados
        // let responseData: Data = [...baseData];
        // if (payload?.perfis?.includes(9) && payload?.equipe) {
        //     // será substituido por consulta no banco de dados
        //     responseData = responseData.filter(
        //         (item) => item.ine === payload.equipe,
        //     );
        //     totalRows = responseData.length;
        // }
        // responseData = filterData(responseData, filters); // será substituido por consulta no banco de dados
        // if (searchName)
        //     responseData = responseData.filter((item) =>
        //         String(item.nome).includes(searchName),
        //     ); // será substituido por consulta no banco de dados
        // if (responseData.length === 0)
        //     return Response.json(
        //         {
        //             data: responseData,
        //             totalRows: 0,
        //         },
        //         { status: 200 },
        //     );

        // if (sorting) {
        //     const sortingOptions = sorting.split(",");

        //     sortingOptions.forEach((option) => {
        //         const [field, order] = option.split(":");
        //         validateSortOrder(order);
        //         // será substituido por consulta no banco de dados
        //         responseData = [
        //             ...sortData({
        //                 data: responseData,
        //                 field,
        //                 sortOrder: order as SortOrder,
        //             }),
        //         ];
        //     });
        // }
        if (pagination.page || pagination.pageSize) validatePaginationParams(pagination);
        const data = await diabetesData(municipalitySusID, teamIne, pagination, filters)
        const totalRows = await diabetesDataCount(municipalitySusID, teamIne,filters);
        return Response.json(
            {
                data,
                totalRows: totalRows,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        if (error instanceof BadRequestError) {
            return Response.json({ message: error.message }, { status: 400 });
        }

        if (error instanceof AuthenticationError) {
            return Response.json({ message: error.message }, { status: 401 });
        }

        return Response.json(
            {
                message: "Erro ao consultar dados",
                detail: (error as Error).message,
            },
            { status: 500 },
        );
    }
}