import { csvDownloadInstructions } from "./consts";
import { AvailableLists } from "./modules/AvailableLists";
import { Instructions } from "./modules/Instructions";

// TODO: rever nome deste componente
export const Overview: React.FC<{
    isSearchPlusNewCarePathwayEnabled: boolean;
}> = ({ isSearchPlusNewCarePathwayEnabled }) => {
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
            <AvailableLists
                isSearchPlusNewCarePathwayEnabled={
                    isSearchPlusNewCarePathwayEnabled
                }
            />
            <p
                style={{
                    margin: "16px 0px",
                    color: "#4294D8",
                    fontSize: "19px",
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
