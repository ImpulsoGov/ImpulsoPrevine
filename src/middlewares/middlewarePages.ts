import { matchesRoute } from "@/features/common/frontend/path";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const rotasPublicas = [
    "/",
    "/quem-somos",
    "/apoio",
    "/faq",
    "/dadoPublicos",
    "/analise",
    "/termos-uso-e-privacidade",
    "/blog",
    "/blog/artigos",
    "/teste",
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
    "/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao",
    "/cofin25/indicadores/cuidado_da_pessoa_com_diabetes",
];

const isNotAllowedToAccessList = (
    currentPath: string,
    flag: boolean,
    listPath: string
): boolean => {
    return flag && matchesRoute([listPath], currentPath);
};
const ExibirURL = [
    "/capacitacao",
    "/conteudo",
    "/conteudo-programatico",
    "/dadosPublicos",
];
const secret = process.env.NEXTAUTH_SECRET;
type Flags = { diabetes: boolean; hypertension: boolean };

// const flagToListMap = {
//     diabetes: "/busca-ativa/diabeticos",
//     hypertension: "/busca-ativa/hipertensos",
// };
export const middlewarePages = async (
    request: NextRequest,
    flags: Flags
): Promise<NextResponse> => {
    const url = request.nextUrl;
    const headers = new Headers(request.headers);
    const token = (await getToken({ req: request, secret })) as {
        exp: number;
        user: {
            id: string;
            email: string;
            name: string;
            perfis: Array<string>;
            equipe: string;
            municipio_id_sus: string;
        };
    } | null;
    let response = NextResponse.next();

    if (
        token &&
        matchesRoute(rotasProtegidas, url.pathname) &&
        matchesRoute(rotasPublicas, url.pathname)
    )
        return NextResponse.redirect(new URL("/inicio", request.url));
    if (
        isNotAllowedToAccessList(
            url.pathname,
            flags.diabetes,
            "/busca-ativa/diabeticos"
        ) ||
        isNotAllowedToAccessList(
            url.pathname,
            flags.hypertension,
            "/busca-ativa/hipertensos"
        )
    )
        return NextResponse.redirect(new URL("/inicio", request.url));

    if (ExibirURL.includes(url.pathname)) {
        headers.set("x-current-url", url.href);
        response = NextResponse.next({ headers });
    }
    return response;
};
