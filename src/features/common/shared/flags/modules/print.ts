import { flag } from "flags/next";
import * as allowByMunicipalityId from "./common/allowByMunicipalityId";

const allowedMunicipalities = [
    "111111",
    "220177",
    "290205",
    "240040",
    "230060",
];

export const print = flag<boolean, allowByMunicipalityId.MunicipalityIdSus>({
    key: "print",
    identify: allowByMunicipalityId.identify,
    decide: allowByMunicipalityId.buildDecide(allowedMunicipalities),
});
