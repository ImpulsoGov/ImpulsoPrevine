import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const rotasPublicas = ["/", "/quem-somos", "/apoio", "/faq", "/blog"];

export const rotasProtegidas = [
  '/inicio',
  '/capacitacao',
  '/capacitacoes',
  '/conteudo',
  '/conteudo-programatico',
  '/duvidas',
  '/gestao-usuarios',
  '/busca-ativa',
  '/busca-ativa/citopatologico',
  '/busca-ativa/diabeticos',
  '/busca-ativa/hipertensos',
  '/busca-ativa/gestantes',
  '/busca-ativa/vacinacao',
  '/cadastros-duplicados',
  '/lista-nominal'
]

const ExibirURL = [
    "/capacitacao",
    "/conteudo",
    "/conteudo-programatico",
    "/dadosPublicos",
];

export const middlewarePages = async (request: NextRequest) => {
    const url = request.nextUrl;
    const headers = new Headers(request.headers);
    let response = NextResponse.next();
    if (ExibirURL.includes(url.pathname)) {
        headers.set("x-current-url", url.href);
        response = NextResponse.next({ headers });
    }
    return response;
};
