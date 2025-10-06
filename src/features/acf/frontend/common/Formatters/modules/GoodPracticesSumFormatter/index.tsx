type Props = {
    medicalRecordUpdated: string;
    goodPracticesSum: number;
};

export const GoodPracticesSumFormatter: React.FC<Props> = ({
    medicalRecordUpdated,
    goodPracticesSum,
}) => {
    const isMedicalRecordUpdated = medicalRecordUpdated === "Atualizada";
    return isMedicalRecordUpdated ? (
        <span>{goodPracticesSum}/100</span>
    ) : (
        <span style={{ color: "#B51616" }}>*{goodPracticesSum}/100</span>
    );
};
