import { flag } from "flags/next";

//TODO: Implementara tipos mais especificos para municipioID
type Entities = {
    municipalityId: string;
};

const allowedMunicipalities = ["111111", "222222", "333333"];

export const allowedMunicipalitiesIdFlag = flag<boolean, Entities>({
    key: "allowed-municipalities-id-flag",
    decide({ entities }) {
        return allowedMunicipalities.includes(entities?.municipalityId || "");
    },
});
