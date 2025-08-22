type PageParams = {
    municipalitySusId: string;
    pageIndex: number;
    searchString?: string;
};

export type DefaultSorting = {
    field: "patientName";
    sort: "asc";
};

export const defaultSorting: DefaultSorting = {
    field: "patientName",
    sort: "asc",
} as const;

export type PageParamsCoaps<TSorting, TFilters> = PageParams & {
    sorting?: TSorting;
    filters?: TFilters;
};

export type PageParamsCoeq<TSorting, TFilters> = PageParams & {
    teamIne: string;
    sorting?: TSorting;
    filters?: TFilters;
};

export type AllDataParamsCoaps<TSorting, TFilters> = Omit<
    PageParamsCoaps<TSorting, TFilters>,
    "pageIndex"
>;

export type AllDataParamsCoeq<TSorting, TFilters> = Omit<
    PageParamsCoeq<TSorting, TFilters>,
    "pageIndex"
>;

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
