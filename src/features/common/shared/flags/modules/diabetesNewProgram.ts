import { flag } from "flags/next";
import * as allowByMunicipalityId from "./common/allowByMunicipalityId";

const allowedMunicipalities = [
    "111111",
    "220177",
    "290205",
    "240040",
    "230060",
];

export const diabetesNewProgram = flag<
    boolean,
    allowByMunicipalityId.MunicipalityIdSus
>({
    key: "diabetesNewProgram",
    identify: allowByMunicipalityId.identify,
    decide: allowByMunicipalityId.buildDecide(allowedMunicipalities),
});
