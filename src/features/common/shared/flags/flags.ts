import { decodeToken } from "@/utils/token";
import { flag } from "flags/next";
import type { JWTVerifyResult } from "jose";
import { decode } from "next-auth/jwt";

//TODO: Implementara tipos mais especificos para municipioID
type MunicipalityIdSus = string;

type CookieTokenType = JWTVerifyResult & {
    user: {
        access_token: string;
        token_type: string;
        mail: string;
        perfis: Array<number>;
        nome: string;
        id: string;
        cargo: string;
        municipio: string;
        equipe: string;
        municipio_id_sus: string;
    };
};

const allowedMunicipalities = ["111111"];

export const diabetesNewProgram = flag<boolean, MunicipalityIdSus>({
    key: "diabetesNewProgram",
    identify: async (req) => {
        const authHeader = req.headers.get("authorization");
        const tokenHeader = authHeader?.split(" ")[1];
        const secret = process.env.NEXTAUTH_SECRET || "";
        let municipalityId = "";

        if (tokenHeader) {
            const secretUint8 = new TextEncoder().encode(secret);
            const decodedToken = await decodeToken(tokenHeader, secretUint8);
            municipalityId = decodedToken.payload
                .municipio as MunicipalityIdSus;
        } else {
            const isDev = process.env.ENV === "development";
            const cookieName = isDev
                ? "next-auth.session-token"
                : "__Secure-next-auth.session-token";
            const token = req.cookies.get(cookieName)?.value || "";
            const decoded = (await decode({
                token: token,
                secret: secret,
            })) as unknown as CookieTokenType;
            municipalityId = decoded.user.municipio_id_sus;
        }
        return municipalityId;
    },
    decide({ entities: municipalityIdSus }) {
        if (municipalityIdSus)
            return allowedMunicipalities.includes(municipalityIdSus);
        return false;
    },
});
