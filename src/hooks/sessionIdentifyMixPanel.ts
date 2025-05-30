import type { Mixpanel } from "mixpanel-browser";
import type { Session } from "next-auth";

export const sessionIdentifyMixPanel = (
    mixpanel: Mixpanel,
    Hotjar: any,
    session: Session | null
) => {
    if (session && session.user) {
        const atributos = {
            cargo: session.user.cargo,
            municipio: session.user.municipio,
            equipe: session.user.equipe,
            municipio_id_sus: session.user.municipio_id_sus,
            is_test_user:
                session.user.cargo == "Impulser" ||
                session.user.mail.includes("@impulsogov.org") ||
                session.user.municipio.includes("Impulsolândia") ||
                session.user.municipio_id_sus === "111111",
        };

        mixpanel.identify(session.user.id);
        mixpanel.people.set({
            $email: session.user.mail,
            $name: session.user.nome,
            ...atributos,
        });
        Hotjar.identify(session.user.id, {
            email: session.user.mail,
            name: session.user.nome,
            ...atributos,
        });
    }
};
