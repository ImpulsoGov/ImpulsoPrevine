import type * as Diabetes from "./diabetes/schema";
import type * as Hypertension from "./hypertension/schema";
import type * as HypertensionModel from "./hypertension/model";
import type * as DiabetesModel from "./diabetes/model";
import type { AxiosError } from "axios";

//TODO: Pensar se existe alguma forma de evitar isso
export type FilterResponses =
    | Diabetes.CoapsFilters
    | Diabetes.CoeqFilters
    | Hypertension.CoapsFilters
    | Hypertension.CoeqFilters;

export type AcfResponse<TResponse> = TResponse extends PageResponse
    ? PageResponse | null
    : AcfItem | AxiosError | null;

export type DataResponses = PageResponse | AcfItem;

export type PageResponse = {
    page: Array<AcfItem>;
    totalRows: number;
};

export type AcfItem =
    | HypertensionModel.HypertensionAcfItem
    | DiabetesModel.DiabetesAcfItem;
