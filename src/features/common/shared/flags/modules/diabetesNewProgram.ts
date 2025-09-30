import { flag } from "flags/next";
import * as allowByMunicipalityId from "./common/allowByMunicipalityId";

const allowedMunicipalities = ["111111"];

export const diabetesNewProgram = flag<
    boolean,
    allowByMunicipalityId.MunicipalityIdSus
>({
    key: "diabetesNewProgram",
    identify: allowByMunicipalityId.identify,
    decide: allowByMunicipalityId.buildDecide(allowedMunicipalities),
});
