import { Mixpanel } from "mixpanel-browser";

declare global {
  interface Window {
    mixpanel: Mixpanel; 
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
      };
    }
  }
