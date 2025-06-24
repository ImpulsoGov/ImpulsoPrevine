import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { Session } from "next-auth";
import type { JWTVerifyResult } from "jose";
import { errorHandler } from "@/app/api/shared/errorHandler";

type ExtendedNextRequest = NextRequest & {
    user?: Session["user"];
};

export const validarTokenMiddleware = async (
    req: ExtendedNextRequest
): Promise<Response> => {
    try {
        const secret = getEncodedSecret();
        if (secret.length === 0) {
            return Response.json(
                {
                    message: "Erro ao verificar token.",
                    detail: "Secret não fornecido.",
                },
                { status: 500 }
            );
        }
        const token = getToken(req.headers);

        type DecodedToken = JWTVerifyResult & Session["user"];
        const decodedToken = (await decodeToken(token, secret)) as DecodedToken; // Verifica assinatura, validade e decodifica o token
        // const decodedToken = await jwtVerify(token, secret); // Verifica assinatura,validade e decodifica o token
        req.user = decodedToken; // Armazena o tokendecodificado para uso posterior na requisição
        return NextResponse.next();
    } catch (error) {
        return errorHandler(error);
    }
};
