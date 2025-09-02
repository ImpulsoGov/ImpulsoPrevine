import type * as Diabetes from "./diabetes/schema";
import type * as Hypertension from "./hypertension/schema";
import type * as HypertensionModel from "./hypertension/model";

//TODO: Pensar se existe alguma forma de evitar isso
export type FilterResponses =
    | Diabetes.CoapsFilters
    | Diabetes.CoeqFilters
    | Hypertension.CoapsFilters
    | Hypertension.CoeqFilters;

export type PageResponses = Diabetes.PageResponse | Hypertension.PageResponse;

export type AcfItem = HypertensionModel.HypertensionAcfItem;
