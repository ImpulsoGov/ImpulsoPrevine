import { csvDownloadInstructions } from "./consts";
import { AvailableLists } from "./modules/AvailableLists";
import { Instructions } from "./modules/Instructions";

// TODO: rever nome deste componente
export const Overview: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "48%",
                color: "#104978",
                lineHeight: "130%",
            }}
        >
            <AvailableLists />
            <p
                style={{
                    margin: "16px 0px",
                    color: "#4294D8",
                    fontSize: "17px",
                    fontWeight: 700,
                    letterSpacing: "-0.32px",
                }}
            >
                Passo a Passo
            </p>
            <Instructions data={csvDownloadInstructions} />
        </div>
    );
};
