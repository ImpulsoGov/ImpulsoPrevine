import { flag } from "flags/next";
import * as allowByMunicipalityId from "./common/allowByMunicipalityId";

const allowedMunicipalities = [
    "111111",
    "220177",
    "290205",
    "240040",
    "230060",
    "150040",
    "160010",
    "230150",
    "220196",
    "210240",
    "240130",
    "220225",
    "220277",
    "150280",
    "220375",
    "291150",
    "230526",
    "230620",
    "210565",
    "260830",
    "220590",
    "292273",
    "292330",
    "230980",
    "315710",
    "220955",
    "220970",
    "221035",
    "211153",
];

export const hypertensionNewProgram = flag<
    boolean,
    allowByMunicipalityId.MunicipalityIdSus
>({
    key: "hypertensionNewProgram",
    identify: allowByMunicipalityId.identify,
    decide: allowByMunicipalityId.buildDecide(allowedMunicipalities),
});
