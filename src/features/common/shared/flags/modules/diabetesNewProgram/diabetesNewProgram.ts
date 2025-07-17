import { flag } from "flags/next";
import { decide } from "./modules/decide";
import { identify } from "./modules/identify";

//TODO: Implementara tipos mais especificos para municipioID
export type MunicipalityIdSus = string | undefined;

export const diabetesNewProgram = flag<boolean, MunicipalityIdSus>({
    key: "diabetesNewProgram",
    identify: identify,
    decide({ entities: municipalityIdSus }) {
        return decide({ entities: municipalityIdSus });
    },
});
