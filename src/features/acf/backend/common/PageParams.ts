type PageParams = {
    municipalitySusId: string;
    pageIndex: number;
    searchString?: string;
};

export type GenericQueryWhere<TFilters> = {
    [K in keyof TFilters]: { in: Array<string> };
} & {
    municipalitySusId: string;
    patientName?: { contains: string };
};

export type GenericQueryWhereCoaps<TFilters> = GenericQueryWhere<TFilters>;

export type GenericQueryWhereCoeq<TFilters> = GenericQueryWhere<TFilters> & {
    careTeamIne: string;
};

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
