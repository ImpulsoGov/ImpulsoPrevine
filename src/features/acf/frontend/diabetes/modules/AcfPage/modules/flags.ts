import { flag } from "flags/next";

//TODO: Implementara tipos mais especificos para municipioID
export const allowedMunicipalitiesIdFlag = flag<boolean>({
    key: "allowed-municipalities-id-flag",
    decide() {
        return true;
    },
});

export const precomputeFlags = [allowedMunicipalitiesIdFlag] as const;
