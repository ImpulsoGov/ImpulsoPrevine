import { signOut } from "next-auth/react";

export const log_out = (session) => {
    if (session) {
        const timeOut = new Date(session.expires) - new Date();
        if (timeOut > 0) {
            const timer = setTimeout(() => {
                signOut();
            }, timeOut);
            // Limpa o timer quando o componente desmontar ou a sessão mudar
            return () => clearTimeout(timer);
        } else {
            signOut();
        }
    }
};
