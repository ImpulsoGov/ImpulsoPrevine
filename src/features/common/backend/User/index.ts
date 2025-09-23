import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { NextRequest } from "next/server";

export type User = {
    municipalitySusId: string;
    teamIne: string;
    profiles: Array<number>;
};

export const getUser = async (req: NextRequest): Promise<User> => {
    const token = getToken(req.headers);
    const secret = getEncodedSecret();
    const { payload } = (await decodeToken(token, secret)) as JWTToken;

    return {
        municipalitySusId: payload.municipio,
        teamIne: payload.equipe,
        profiles: payload.perfis,
    };
};
