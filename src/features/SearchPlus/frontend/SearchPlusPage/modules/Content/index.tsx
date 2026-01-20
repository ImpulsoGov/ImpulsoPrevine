import { useState } from "react";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import { ResultContent } from "./modules/ResultContent";
import { InputContent } from "./modules/InputContent";
import { Error } from "./modules/ErrorPage";
import mixpanel from "mixpanel-browser";
import type { BreastAndUterusCareItem } from "../common/carePathways/modules/breastAndUterusCare";
import type { PregnancyAndPuerperiumCareItem } from "../common/carePathways/modules/pregnancyAndPuerperiumCare";

export type { CsvRow } from "./modules/InputContent";

type Props = {
    setSnackbarError: React.Dispatch<React.SetStateAction<ErrorData>>;
    setSuccessSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    isSearchPlusABEnabled: boolean;
    isSearchPlusNewCarePathwayEnabled: boolean;
};

export const Content: React.FC<Props> = ({
    setSnackbarError,
    setSuccessSnackbar,
    isSearchPlusABEnabled,
    isSearchPlusNewCarePathwayEnabled,
}) => {
    const [jsonData, setJsonData] = useState<
        Array<BreastAndUterusCareItem> | Array<PregnancyAndPuerperiumCareItem>
    >([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [header, setHeader] = useState<HeaderData>({
        thematicList: null,
        createdAtDate: "01/01/1970",
        createdAtTime: "00:00",
        filters: {},
        teamName: undefined,
    });
    if (errorMessage.length > 0) {
        mixpanel.track("file_transform", {
            status: "error",
            thematic_list: header.thematicList,
            error_type: "unknown_error",
        });

        return (
            <Error
                setJsonData={setJsonData}
                setErrorMessage={setErrorMessage}
                error={errorMessage}
            />
        );
    }

    if (jsonData.length > 0) {
        mixpanel.track("file_transform", {
            status: "success",
            thematic_list: header.thematicList,
            error_type: null,
        });
        return (
            <ResultContent
                jsonData={jsonData}
                setJsonData={setJsonData}
                header={header}
            />
        );
    }

    return (
        <div
            style={{
                width: "100%",
                paddingLeft: 80,
                paddingRight: 80,
                boxSizing: "border-box",
            }}
        >
            <p
                style={{
                    width: "100%",
                    fontSize: "24px",
                    fontWeight: 400,
                    marginBottom: "54px",
                    textAlign: isSearchPlusABEnabled ? "left" : "center",
                    marginTop: "0px",
                }}
            >
                Uma ferramenta exclusiva para conversão dos relatórios do PEC em
                listas nominais do programa de <br></br> cofinanciamento do
                governo federal, prontas para impressão e distribuição para os
                agentes comunitários de saúde.
            </p>
            <InputContent
                setSnackbarError={setSnackbarError}
                setJsonData={setJsonData}
                setHeader={setHeader}
                header={header}
                setErrorMessage={setErrorMessage}
                setSuccessSnackbar={setSuccessSnackbar}
                isSearchPlusNewCarePathwayEnabled={
                    isSearchPlusNewCarePathwayEnabled
                }
            />
        </div>
    );
};
