import type { MunicipalityIdSus } from "../../diabetesNewProgram";
// TODO: Mover os municipios permitidos para o .env
const allowedMunicipalities = ["111111"];
export const decide = ({
    entities: municipalityIdSus,
}: {
    entities?: MunicipalityIdSus;
}): boolean => {
    if (municipalityIdSus)
        return allowedMunicipalities.includes(municipalityIdSus);
    return false;
};
