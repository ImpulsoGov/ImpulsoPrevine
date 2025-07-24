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

export type GenericQueryWhere<TFilters> = {
    [K in keyof TFilters]: TFilters[K] extends Array<string>
        ? { in: Array<string> }
        : { in: Array<number> };
} & {
    municipalitySusId: string;
    patientName?: { contains: string };
};

export type GenericQueryWhereCoaps<TFilters> = GenericQueryWhere<TFilters>;

export type GenericQueryWhereCoeq<TFilters> = GenericQueryWhere<TFilters> & {
    careTeamName: string;
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

export type AreKeysNullable<TField> = {
    //{} extends Pick<T, K> checa se o campo é opcional, null extends T[K] checa se o campo é nullable
    // Esse campo é null? -> T[K] extends null
    // Esse campo aceita null? -> null extends T[K]
    [K in keyof TField]: null extends TField[K]
        ? { nullable: true }
        : { nullable: false };
};
