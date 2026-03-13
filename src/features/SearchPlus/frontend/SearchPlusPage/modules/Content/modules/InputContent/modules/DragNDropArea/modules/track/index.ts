import type { ThematicList } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import mixpanel from "mixpanel-browser";

type ErrorType =
    | "invalid_file_extension"
    | "invalid_thematic_list"
    | "invalid_file_encoding"
    | "invalid_file_header"
    | "invalid_creation_date"
    | "invalid_patient_birth_date"
    | "team_name_not_found"
    | "creation_date_not_found"
    | "unknown_error";

export const trackFileUploadWithError = (
    errorType: ErrorType | null = null
): void => {
    mixpanel.track("file_upload", {
        status: "error",
        error_type: errorType,
        thematic_list: null,
    });
};

export const trackFileUploadWithSuccess = (
    thematicList: ThematicList
): void => {
    mixpanel.track("file_upload", {
        status: "success",
        error_type: null,
        thematic_list: thematicList,
    });
};
