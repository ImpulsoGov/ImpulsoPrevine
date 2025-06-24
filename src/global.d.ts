import type { Mixpanel } from "mixpanel-browser";

type UserGuidingData = {
    cargo: string;
    equipe: string;
    municipio: string;
    municipio_id_sus: string;
    is_test_user: boolean;
    perfil: string;
};

type UserGuiding = {
    identify: (id: string, data: UserGuidingData) => void;
};

declare global {
    type Window = {
        mixpanel: Mixpanel;
        userGuiding: UserGuiding;
    };
}

declare module "next-auth" {
    type Session = {
        user: {
            id: string;
            nome: string;
            mail: string;
            cargo: string;
            municipio: string;
            equipe: string;
            municipio_id_sus: string;
            perfis: Array<number>; //TODO alterar para PROFILE_ID
            access_token: string;
        };
        status: string;
    };
}
