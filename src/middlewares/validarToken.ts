import { NextRequest, NextResponse } from "next/server";
import { AuthenticationError, decodeToken, getToken } from "@/utils/token";

interface ExtendedNextRequest extends NextRequest {
    user?: any;
}

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export const validarTokenMiddleware = async (req : ExtendedNextRequest) => {
    try {
        const token = getToken(req.headers);
        if(!secret) return Response.json({ message: 'Erro ao verificar token.', detail: 'Secret não fornecido.' }), { status: 500 };
        const decodedToken = await decodeToken(token, secret);
        // const decodedToken = await jwtVerify(token, secret); // Verifica assinatura,validade e decodifica o token
        req.user = decodedToken; // Armazena o token decodificado para uso posterior na requisição
        return NextResponse.next();
    } catch (error) {
        if ((error as Error).name === 'JWTExpired') {
            return Response.json({ message: 'Token expirado.' }, { status: 401 });
        } else if ((error as Error).name === 'JWSSignatureVerificationFailed') {
            return Response.json({ message: 'Token inválido.' }, { status: 400 });
        } else if (error instanceof AuthenticationError) {
            return Response.json({ message: error.message }, { status: 401 });
        } else {
            return Response.json({ message: 'Erro ao verificar token.', detail: (error as Error).message }, { status: 500 });
        }
    }
};