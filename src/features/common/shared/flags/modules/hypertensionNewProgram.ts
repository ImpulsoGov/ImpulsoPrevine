import { flag } from "flags/next";
import * as allowByMunicipalityId from "./common/allowByMunicipalityId";

const allowedMunicipalities = ["111111"];

export const hypertensionNewProgram = flag<
    boolean,
    allowByMunicipalityId.MunicipalityIdSus
>({
    key: "hypertensionNewProgram",
    identify: allowByMunicipalityId.identify,
    decide: allowByMunicipalityId.buildDecide(allowedMunicipalities),
});
