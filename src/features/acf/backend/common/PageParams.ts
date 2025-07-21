type PageParams = {
    municipalitySusId: string;
    pageIndex: number;
    searchString?: string;
};

export type GenericQueryWhere<TSomething> = {
    [K in keyof TSomething]: { in: Array<string> };
} & {
    municipalitySusId: string;
    patientName?: { contains: string };
};

// export type QueryWhereCoeq = GenericQueryWhere<> & {
//     careTeamIne: string;
// };
export type PageParamsCoaps<TSorting, TFilters> = PageParams & {
    sorting?: TSorting;
    filters?: TFilters;
};

export type PageParamsCoeq<TSorting, TFilters> = PageParams & {
    teamIne: string;
    sorting?: TSorting;
    filters?: TFilters;
};

type RowCountParams = {
    municipalitySusId: string;
    searchString?: string;
};

export type RowCountParamsCoaps<TFilters> = RowCountParams & {
    filters?: TFilters;
};

export type RowCountParamsCoeq<TFilters> = RowCountParams & {
    teamIne: string;
    filters?: TFilters;
};
