import { ListTitles } from "./common/carePathways";
import { nameFormatter } from "./common/UnitTable/modules/Formatters";

export const AvailableLists: React.FC = () => {
    return (
        <div
            style={{
                backgroundColor: "#CF4047",
                width: "100%",
                color: "#FFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "42px 118px 118px 118px",
                lineHeight: "130%",
            }}
        >
            <p
                style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    letterSpacing: "-0.4px",
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
                            border: "1px solid #FFF",
                            fontSize: "14px",
                            fontWeight: 500,
                            letterSpacing: "-0.3px",
                            padding: "6px 12px",
                        }}
                    >
                        {nameFormatter(list)}
                    </div>
                ))}
            </div>
        </div>
    );
};
