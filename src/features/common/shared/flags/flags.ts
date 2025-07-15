import { flag } from "flags/next";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { getServerSession } from "next-auth";

//TODO: Implementara tipos mais especificos para municipioID
type MunicipalityIdSus = string;

const allowedMunicipalities = ["111111"];

export const diabetesNewProgram = flag<boolean, MunicipalityIdSus>({
    key: "diabetesNewProgram",
    identify: async () => {
        const session = await getServerSession(nextAuthOptions);
        const municipalityId = session?.user.municipio_id_sus || "";

        return municipalityId;
    },
    decide({ entities: municipalityIdSus }) {
        if (municipalityIdSus)
            return allowedMunicipalities.includes(municipalityIdSus);
        return false;
    },
});
