import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { GridRenderCellParams } from "@mui/x-data-grid";

export const goodPracticesSumFormatter = (
    param: GridRenderCellParams
): React.ReactNode => {
    const isMedicalRecordUpdated =
        (param.row as HypertensionAcfItem).medicalRecordUpdated ===
        "Atualizada";
    return isMedicalRecordUpdated ? (
        <span>{param.value}/100</span>
    ) : (
        <span style={{ color: "#B51616" }}>*{param.value}/100</span>
    );
};
