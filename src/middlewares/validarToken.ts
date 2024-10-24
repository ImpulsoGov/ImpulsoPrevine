import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

interface ExtendedNextRequest extends NextRequest {
    user?: any;
}

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export const validarTokenMiddleware = async (req : ExtendedNextRequest) => {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return Response.json({ message: 'Autorização não fornecida.' }, { status: 401 });
        const token = authHeader.split(' ')[1];
        if (!token) return Response.json({ message: 'Token não fornecido.' }, { status: 401 });
        if(!secret) return Response.json({ message: 'Erro ao verificar token.', detail: 'Secret não fornecido.' }), { status: 500 };
        const decodedToken = await jwtVerify(token, secret); // Verifica assinatura,validade e decodifica o token
        req.user = decodedToken; // Armazena o token decodificado para uso posterior na requisição
        return NextResponse.next();
    } catch (error) {
        if ((error as Error).name === 'JWTExpired') {
            return Response.json({ message: 'Token expirado.' }, { status: 401 });
        } else if ((error as Error).name === 'JWSSignatureVerificationFailed') {
            return Response.json({ message: 'Token inválido.' }, { status: 400 });
        } else {
            return Response.json({ message: 'Erro ao verificar token.', detail: (error as Error).message }, { status: 500 });
        }
    }
};