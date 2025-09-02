import type * as Diabetes from "./diabetes/schema";
import type * as Hypertension from "./hypertension/schema";

//TODO: Pensar se existe alguma forma de evitar isso
export type FilterResponses =
    | Diabetes.CoapsFilters
    | Diabetes.CoeqFilters
    | Hypertension.CoapsFilters
    | Hypertension.CoeqFilters;

export type PageResponses = Diabetes.PageResponse | Hypertension.PageResponse;
export type AllPagesResponses = Hypertension.DataResponse;
export type AllPagesResponse = AllPagesResponses[number];
