import type * as model from "@/features/acf/shared/hypertension/model";

export type PageItem = Omit<
    model.HypertensionAcfItem,
    "patientAgeRange" | "goodPracticesStatusByQuarter"
>;
