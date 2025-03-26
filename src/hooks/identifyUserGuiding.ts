import { getUserProfileName } from "@/utils/identifyUserProfile";
import { isTestUser } from "@/utils/isTestUser";
import type { Session } from "next-auth";

export function identifyUserGuiding(session: Session | null) {
    if (session && session.user && typeof window !== "undefined") {
        window.userGuiding.identify(session.user.id, {
            cargo: session.user.cargo,
            equipe: session.user.equipe,
            municipio: session.user.municipio,
            municipio_id_sus: session.user.municipio_id_sus,
            is_test_user: isTestUser(session.user),
            perfil: getUserProfileName(session.user.perfis),
        });
    }
}
