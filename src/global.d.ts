import { Mixpanel } from "mixpanel-browser";

type UserGuidingData = {
  cargo: string;
  municipio: string;
  equipe: string;
  municipio_id_sus: string;
  is_test_user: boolean;
  perfil: string;
}

interface UserGuiding {
  identify: (id: string, data: UserGuidingData) => void;
}

declare global {
  interface Window {
    mixpanel: Mixpanel;
    userGuiding: UserGuiding;
  }
}

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        nome: string;
        mail: string;
        cargo: string;
        municipio: string;
        equipe: string;
        municipio_id_sus: string;
        perfis: number[];
        access_token: string;
      },
      status : string;
    }
  }
