import { getToken } from "next-auth/jwt";
import jwt from 'jsonwebtoken';

const secret = process.env.NEXTAUTH_SECRET;

export const validarTokenMiddleware = async (req, res) => {
    try {
        const token = await getToken({ req, secret, raw: true });
        if (!token) return res.status(401).json({ message: 'Token não fornecido.' });
        const decodedToken = jwt.verify(token, secret); // Verifica assinatura,validade e decodifica o token
        req.user = decodedToken; // Armazena o token decodificado para uso posterior na requisição
        return  { tokenValido : true }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Token inválido.' });
        } else {
            return res.status(500).json({ message: 'Erro ao verificar token.', detail: error.message });
        }
    }
};

