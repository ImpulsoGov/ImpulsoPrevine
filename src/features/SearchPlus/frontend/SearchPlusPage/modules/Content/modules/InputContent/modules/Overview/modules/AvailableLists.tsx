import { ListTitles } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { nameFormatter } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/UnitTable/modules/Formatters";

export const AvailableLists: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "24px",
            }}
        >
            <p
                style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "-0.36px",
                    marginBottom: "12px",
                }}
            >
                Listas disponíveis para conversão
            </p>
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                {Object.values(ListTitles).map((list: string) => (
                    <div
                        key={list}
                        style={{
                            borderRadius: "8px",
                            padding: "6px 12px",
                            backgroundColor: "#ADE3F4",
                            color: "#3679B1",
                            fontSize: "14px",
                            fontWeight: 500,
                            letterSpacing: "-0.28px",
                        }}
                    >
                        {nameFormatter(list)}
                    </div>
                ))}
            </div>
        </div>
    );
};
