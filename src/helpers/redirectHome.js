//redireciona para home usuarios não logados e usuarios que não tem perfil de acesso aos paineis com dados restritos
const redirectHome = (ctx, session) => {
	const userIsActive = ctx.req.cookies["next-auth.session-token"];
	const userIsActiveSecure =
		ctx.req.cookies["__Secure-next-auth.session-token"];
	const redirect =
		(!userIsActive || !userIsActiveSecure) &&
		!(
			session?.user.perfis.includes(5) ||
			session?.user.perfis.includes(8) ||
			session?.user.perfis.includes(9)
		);
	if (redirect) {
		return {
			redirect: {
				destination: "/",
				permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
			},
		};
	}
	return false;
};
const redirectHomeNotLooged = (ctx) => {
	const userIsActive = ctx.req.cookies["next-auth.session-token"];
	const userIsActiveSecure =
		ctx.req.cookies["__Secure-next-auth.session-token"];
	const redirect = !userIsActive && !userIsActiveSecure;
	if (redirect) {
		return {
			redirect: {
				destination: "/",
				permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
			},
		};
	}
	return false;
};

const redirectHomeTrilha = (ctx, session) => {
	const userIsActive = ctx.req.cookies["next-auth.session-token"];
	const userIsActiveSecure =
		ctx.req.cookies["__Secure-next-auth.session-token"];
	const redirect =
		(!userIsActive || !userIsActiveSecure) && !session?.user.perfis.includes(7);
	if (redirect) {
		return {
			redirect: {
				destination: "/inicio",
				permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
			},
		};
	}
	return false;
};

const redirectHomeGestaoUsuarios = (ctx, session) => {
	const userIsActive = ctx.req.cookies["next-auth.session-token"];
	const userIsActiveSecure =
		ctx.req.cookies["__Secure-next-auth.session-token"];
	const redirect =
		(!userIsActive || !userIsActiveSecure) && !session?.user.perfis.includes(2);
	if (redirect) {
		return {
			redirect: {
				destination: "/inicio",
				permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
			},
		};
	}
	return false;
};

export {
	redirectHome,
	redirectHomeNotLooged,
	redirectHomeTrilha,
	redirectHomeGestaoUsuarios,
};
