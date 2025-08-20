type PageParams = {
    municipalitySusId: string;
    pageIndex: number;
    searchString?: string;
};

type PrintParams<TSorting, TFilters> = {
    municipalitySusId: string;
    searchString?: string;
    sorting?: TSorting;
    filters?: TFilters;
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

export type PrintParamsCoaps<TSorting, TFilters> = PrintParams<
    TSorting,
    TFilters
>;

export type PrintParamsCoeq<TSorting, TFilters> = PrintParams<
    TSorting,
    TFilters
> & {
    teamIne: string;
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
