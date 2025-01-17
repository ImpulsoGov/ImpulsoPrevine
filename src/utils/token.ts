import { jwtVerify, type JWTPayload, type JWTVerifyResult } from 'jose';

export const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export class AuthenticationError extends Error {};

export interface TokenPayload extends JWTPayload {
  perfis: number[];
  ine: string;
}

export interface JWTToken extends JWTVerifyResult {
  payload: TokenPayload;
}

export const getToken = (headers: Headers) => {
  const authHeader = headers.get('authorization');

  if (!authHeader) throw new AuthenticationError('Autorização não fornecida.');

  const token = authHeader.split(' ')[1];

  if (!token) throw new AuthenticationError('Token não fornecido.');

  return token;
};

export const decodeToken = (token: string, encodedSecrect: Uint8Array) => {
  const decodedToken = jwtVerify(token, encodedSecrect);
  return decodedToken;
};
