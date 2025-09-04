import type * as Diabetes from "./diabetes/schema";
import type * as Hypertension from "./hypertension/schema";
import type * as HypertensionModel from "./hypertension/model";
import type * as DiabetesModel from "./diabetes/model";
<<<<<<< HEAD
=======
import type { AxiosError } from "axios";
>>>>>>> 7b78d5ea (feat: refatora estrutura de dados e implementa hook useAcfData para gerenciamento de dados)

//TODO: Pensar se existe alguma forma de evitar isso
export type FilterResponses =
    | Diabetes.CoapsFilters
    | Diabetes.CoeqFilters
    | Hypertension.CoapsFilters
    | Hypertension.CoeqFilters;

export type AcfResponse<TResponse> = TResponse extends PageResponse
    ? PageResponse
    : Array<TResponse>;

export type DataResponses = PageResponse | AcfItem;

export type PageResponse = {
    page: Array<AcfItem>;
    totalRows: number;
};

export type AcfItem =
    | HypertensionModel.HypertensionAcfItem
    | DiabetesModel.DiabetesAcfItem;
