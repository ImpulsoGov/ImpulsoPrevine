import { useState } from "react";
import type { ErrorData, HeaderData } from "../..";
import type { SearchPlusItem } from "../common/carePathways";
import { ResultContent } from "./modules/ResultContent";
import { InputContent } from "./modules/InputContent";
import { Error } from "./modules/ErrorPage";

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
    });

    if (errorMessage.length > 0) {
        return (
            <Error
                setJsonData={setJsonData}
                setErrorMessage={setErrorMessage}
                error={errorMessage}
            />
        );
    }

    if (jsonData.length > 0)
        return (
            <ResultContent
                jsonData={jsonData}
                setJsonData={setJsonData}
                header={header}
            />
        );

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
