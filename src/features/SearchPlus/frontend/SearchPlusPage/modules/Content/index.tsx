import { useState } from "react";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import type { SearchPlusItem } from "../common/carePathways";
import { ResultContent } from "./modules/ResultContent";
import { InputContent } from "./modules/InputContent";
import { Error } from "./modules/ErrorPage";
import mixpanel from "mixpanel-browser";

export type { CsvRow } from "./modules/InputContent";

type Props = {
    setSnackbarError: React.Dispatch<React.SetStateAction<ErrorData>>;
};

export const Content: React.FC<Props> = ({ setSnackbarError }) => {
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
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
        <InputContent
            setSnackbarError={setSnackbarError}
            setJsonData={setJsonData}
            setHeader={setHeader}
            header={header}
            setErrorMessage={setErrorMessage}
        />
    );
};
