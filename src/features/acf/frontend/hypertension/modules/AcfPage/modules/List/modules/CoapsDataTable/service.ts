"use client";
import type { BodyBuilder } from "@/features/acf/frontend/common/DataTable";
import { getPageBuilder } from "@/features/acf/frontend/common/DataTable";
import type * as schema from "@/features/acf/shared/hypertension/schema";
import type { CoapsAppliedFilters } from "./model";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";

type SortingSchema = schema.CoapsSort | schema.CoeqSort;
type RequestBody = schema.CoapsPageRequestBody | schema.CoeqPageRequestBody;

export const bodyBuilder = <
    TAppliedFilters extends AppliedFilters, //AppliedFilters = Coaps | CoeqAppliedFilters
    TRequestBody,
    TSortingSchema extends SortingSchema,
>(
    appliedSorting: TSortingSchema,
    appliedFilters: TAppliedFilters,
    searchString: string
): TRequestBody => {
    const appliedFiltersNotNull = appliedFilters ?? ({} as TAppliedFilters);

    const filters = Object.keys(appliedFiltersNotNull).reduce<
        NonNullable<TRequestBody["filters"]>
    >(
        (acc, key) => {
            const inferedKey = key as keyof TAppliedFilters;
            const value = appliedFiltersNotNull[inferedKey];
            if (typeof value === "string") {
                acc[inferedKey] = value === "" ? [] : [value];
                return acc;
            }

            acc[inferedKey] = value;
            return acc;
        },
        {} as NonNullable<TRequestBody["filters"]>
    );

    return {
        ...appliedSorting,
        searchString,
        filters,
    };
    // return Object.assign(
    //     {},
    //     !appliedSorting ? {} : { sorting: appliedSorting },
    //     !searchString ? {} : { search: searchString },
    //     !appliedFilters
    //         ? {}
    //         : {
    //             filters: {
    //                 ...appliedFilters,
    //                 patientAgeRange:
    //                     appliedFilters.patientAgeRange === ""
    //                         ? []
    //                         : [appliedFilters.patientAgeRange],
    //             },
    //         }
    // );
};

export const getCoapsPage = getPageBuilder<
    schema.CoapsPageRequestBody,
    schema.PageResponse,
    CoapsAppliedFilters,
    schema.CoapsSort
>("hypertension", "coaps", bodyBuilder);
