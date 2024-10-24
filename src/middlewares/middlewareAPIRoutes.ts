import { NextResponse, NextRequest } from 'next/server';
import { validarTokenMiddleware } from './validarToken';

const rotasPublicas = [
    '/api',
]
  

export const middlewareAPIRoutes = async (request : NextRequest) => rotasPublicas.includes(request.nextUrl.pathname) ? NextResponse.next() : validarTokenMiddleware(request);