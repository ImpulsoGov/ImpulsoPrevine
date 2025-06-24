import { AuthenticationError } from "@/app/api/shared/errors";
import { errors, jwtVerify, type JWTPayload, type JWTVerifyResult } from "jose";
import type { Session } from "next-auth";

export const getEncodedSecret = (): Uint8Array => {
    if (!process.env.NEXTAUTH_SECRET) {
        throw new Error("NEXTAUTH_SECRET não está configurado no ambiente");
    }

    return new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
};

export type TokenPayload = JWTPayload & Session["user"];

export type JWTToken = JWTVerifyResult & {
    payload: TokenPayload;
};

export const getToken = (headers: Headers): string => {
    const authHeader = headers.get("authorization");

    if (!authHeader)
        throw new AuthenticationError("Autorização não fornecida.");

    if (!authHeader.startsWith("Bearer ")) {
        throw new AuthenticationError(
            "Formato de autorização inválido. Use: Bearer <token>"
        );
    }

    const token = authHeader.split(" ")[1];

    if (!token) throw new AuthenticationError("Token não fornecido.");

    return token;
};

export const decodeToken = async (
    token: string,
    encodedSecrect: Uint8Array
): Promise<JWTVerifyResult> => {
    try {
        return await jwtVerify(token, encodedSecrect);
    } catch (error) {
        if (error instanceof errors.JWSSignatureVerificationFailed) {
            throw new AuthenticationError("Assinatura do token inválida");
        }
        if (error instanceof errors.JWTExpired) {
            throw new AuthenticationError("Token expirado");
        }
        throw new AuthenticationError("Erro ao decodificar token");
    }
};
