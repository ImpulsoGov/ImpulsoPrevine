export type MunicipalityIdSus = string | undefined;

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
