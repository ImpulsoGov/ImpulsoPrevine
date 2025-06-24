import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const rotasPublicas = [
    "/",
    "/quem-somos",
    "/apoio",
    "/faq",
    "/blog",
    "/dadoPublicos",
    "/analise",
    "/termos-uso-e-privacidade",
];

export const rotasProtegidas = [
    "/inicio",
    "/capacitacao",
    "/capacitacoes",
    "/conteudo",
    "/conteudo-programatico",
    "/duvidas",
    "/gestao-usuarios",
    "/gestao-usuarios/cadastro/individual",
    "/gestao-usuarios/cadastro/lotes",
    "/busca-ativa",
    "/busca-ativa/citopatologico",
    "/busca-ativa/diabeticos",
    "/busca-ativa/hipertensos",
    "/busca-ativa/gestantes",
    "/busca-ativa/vacinacao",
    "/cadastros-duplicados",
    "/lista-nominal",
    "/dadoPublicos",
    "/analise",
    "/termos-uso-e-privacidade",
];

const ExibirURL = [
    "/capacitacao",
    "/conteudo",
    "/conteudo-programatico",
    "/dadosPublicos",
];

const secret = process.env.NEXTAUTH_SECRET;

export const middlewarePages = async (
    request: NextRequest
): Promise<NextResponse> => {
    const url = request.nextUrl;
    const headers = new Headers(request.headers);
    const token = (await getToken({ req: request, secret })) as {
        exp: number;
    } | null;
    let response = NextResponse.next();
    if (
        token &&
        !rotasProtegidas.includes(url.pathname) &&
        rotasPublicas.includes(url.pathname)
    )
        return NextResponse.redirect(new URL("/inicio", request.url));
    if (ExibirURL.includes(url.pathname)) {
        headers.set("x-current-url", url.href);
        response = NextResponse.next({ headers });
    }
    return response;
};
