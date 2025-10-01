import type * as model from "@/features/acf/shared/diabetes/model";

export type PageItem = Omit<
    model.DiabetesAcfItem,
    "patientAgeRange" | "goodPracticesStatusByQuarter"
>;
