import { NextRequest } from 'next/server';
import { middlewarePages } from './middlewares/middlewarePages';
import { middlewareAPIRoutes } from './middlewares/middlewareAPIRoutes';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  return url.pathname.startsWith('/api') ? middlewareAPIRoutes(request) : middlewarePages(request);
}
