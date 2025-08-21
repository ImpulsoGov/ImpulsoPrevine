import type { Payload } from "@/utils/token";

export type CookieToken = {
    user: {
        access_token: string;
        token_type: string;
        mail: string;
        perfis: Array<number>;
        nome: string;
        id: string;
        cargo: string;
        municipio: string;
        equipe: string;
        municipio_id_sus: string;
    };
    sub: string;
    iat: number;
    exp: number;
    jti: string;
};

export type UserProperty = CookieToken["user"][keyof CookieToken["user"]];

export type PayloadProperty = Payload[keyof Payload];
