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
    setSuccessSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO: rever se esse componente é a melhor solução para o espaçamento e, se sim, mover para outror arquivo
const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div style={{ width: "100%", marginBottom: "100px" }}>{children}</div>
    );
};

export const Content: React.FC<Props> = ({
    setSnackbarError,
    setSuccessSnackbar,
}) => {
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
            <Container>
                <Error
                    setJsonData={setJsonData}
                    setErrorMessage={setErrorMessage}
                    error={errorMessage}
                />
            </Container>
        );
    }

    if (jsonData.length > 0) {
        mixpanel.track("file_transform", {
            status: "success",
            thematic_list: header.thematicList,
            error_type: null,
        });

        return (
            <Container>
                <ResultContent
                    jsonData={jsonData}
                    setJsonData={setJsonData}
                    header={header}
                />
            </Container>
        );
    }

    return (
        <Container>
            <p
                style={{
                    width: "51%",
                    fontSize: "20px",
                    marginBottom: "48px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    marginTop: "0px",
                    paddingTop: "0px",
                }}
            >
                Converta seus relatórios do PEC em segundos, e tenha listas
                prontas para distribuir aos ACS e simplificar o acompanhamento
                dos cidadãos.
            </p>
            <InputContent
                setSnackbarError={setSnackbarError}
                setJsonData={setJsonData}
                setHeader={setHeader}
                header={header}
                setErrorMessage={setErrorMessage}
                setSuccessSnackbar={setSuccessSnackbar}
            />
        </Container>
    );
};
