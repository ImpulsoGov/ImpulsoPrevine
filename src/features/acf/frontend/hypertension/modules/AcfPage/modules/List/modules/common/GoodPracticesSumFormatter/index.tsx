export const goodPracticesSumFormatter = (
    medicalRecordUpdated: string,
    goodPracticesSum: number
): React.ReactNode => {
    const isMedicalRecordUpdated = medicalRecordUpdated === "Atualizada";
    return isMedicalRecordUpdated ? (
        <span>{goodPracticesSum}/100</span>
    ) : (
        <span style={{ color: "#B51616" }}>*{goodPracticesSum}/100</span>
    );
};
