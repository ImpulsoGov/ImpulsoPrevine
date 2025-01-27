import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const rotasPublicas = ["/", "/quem-somos", "/apoio", "/faq", "/blog"];

const rotasProtegidas = [
	"/inicio",
	"/capacitacao",
	"/capacitacoes",
	"/conteudo",
	"/conteudo-programatico",
	"/duvidas",
	"/gestao-usuarios",
	"/busca-ativa",
	"/busca-ativa/citopatologico",
	"/busca-ativa/diabeticos",
	"/busca-ativa/hipertensos",
	"/busca-ativa/gestantes",
	"/busca-ativa/vacinacao",
	"/cadastros-duplicados",
];

const ExibirURL = [
	"/capacitacao",
	"/conteudo",
	"/conteudo-programatico",
	"/dadosPublicos",
];
const secret = process.env.NEXTAUTH_SECRET;

export const middlewarePages = async (request: NextRequest) => {
	const url = request.nextUrl;
	const headers = new Headers(request.headers);
	if (!secret) return NextResponse.redirect(new URL("/", url));
	const token = (await getToken({ req: request, secret })) as {
		exp: number;
	} | null;
	let expiracao = true;
	if (token) expiracao = Date.now() > new Date(token.exp * 1000).getTime();
	let response = NextResponse.next();
	if ((!token || expiracao) && rotasProtegidas.includes(url.pathname)) {
		response = NextResponse.redirect(new URL("/", request.url));
		response.cookies.set("next-auth.session-token", "", {
			maxAge: -1,
			path: "/",
		});
		response.cookies.set("next-auth.csrf-token", "", { maxAge: -1, path: "/" });
		response.cookies.set("next-auth.callback-url", "", {
			maxAge: -1,
			path: "/",
		});
		if (url.pathname !== "/") return response;
	}
	if (token && rotasPublicas.includes(url.pathname))
		return NextResponse.redirect(new URL("/inicio", request.url));
	if (ExibirURL.includes(url.pathname)) {
		headers.set("x-current-url", url.href);
		response = NextResponse.next({ headers });
	}
	return response;
};
