import {
    diabetesNewProgram,
    hypertensionNewProgram,
    searchPlus,
    searchPlusAB,
} from "@/features/common/shared/flags";

export type Menu = {
    label: string;
    url: string;
    sub?: Array<Menu>;
    onClick?: () => void;
    telemetryEvent?: string;
};

type Profile = "aps" | "equipe" | "";

const subMenuListasNominais = async (visao: Profile): Promise<Array<Menu>> => {
    const isHypertensionNewProgramEnabled = await hypertensionNewProgram();
    const isDiabetesNewProgramEnabled = await diabetesNewProgram();
    const isSearchPlusABEnabled = await searchPlusAB();
    return [
        ...(isDiabetesNewProgramEnabled
            ? [
                  {
                      label: "⭐ [NOVO] Diabetes",
                      url: `/cofin25/indicadores/cuidado_da_pessoa_com_diabetes`,
                      telemetryEvent:
                          "acessar_lista_cuidado_da_pessoa_com_diabetes",
                  },
              ]
            : [
                  {
                      label: "Diabetes",
                      url: `/busca-ativa/diabeticos?aba=&sub_aba=&visao=${visao}`,
                      telemetryEvent: "acessar_lista_diabetes",
                  },
              ]),
        ...(isHypertensionNewProgramEnabled
            ? [
                  {
                      label: "⭐ [NOVO] Hipertensão",
                      url: `/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao`,
                      telemetryEvent:
                          "acessar_lista_cuidado_da_pessoa_com_hipertensao",
                  },
              ]
            : [
                  {
                      label: "Hipertensão",
                      url: `/busca-ativa/hipertensos?aba=&sub_aba=&visao=${visao}`,
                      telemetryEvent: "acessar_lista_hipertensao",
                  },
              ]),
        {
            label: "Pré-Natal",
            url: `/busca-ativa/gestantes?aba=0&sub_aba=0&visao=${visao}`,
            telemetryEvent: "acessar_lista_pre_natal",
        },
        {
            label: "Vacinação",
            url: `/busca-ativa/vacinacao?aba=0&sub_aba=0&visao=${visao}`,
            telemetryEvent: "acessar_lista_vacinacao",
        },

        ...(isSearchPlusABEnabled
            ? [
                  {
                      label: "Citopatológico",
                      url: `/cofin25/busca_mais`,
                      telemetryEvent: "acessar_pg_busca_mais",
                  },
              ]
            : [
                  {
                      label: "Citopatológico",
                      url: `/busca-ativa/citopatologico?aba=&sub_aba=0&visao=${visao}`,
                      telemetryEvent: "acessar_lista_citopatologico",
                  },
              ]),
    ];
};

const loggedMenu = async (
    view: "aps" | "equipe" | null,
    isSearchPlusEnabled: boolean
): Promise<Array<Menu>> => {
    const menus: Array<Menu> = [
        {
            label: "Início",
            url: "/inicio",
            telemetryEvent: "acessar_pg_inicio",
        },
        ...(isSearchPlusEnabled
            ? [
                  {
                      label: "busca+mais",
                      url: "/cofin25/busca_mais",
                      telemetryEvent: "acessar_pg_busca_mais",
                  },
              ]
            : []),
        {
            label: "Listas Nominais",
            url: "",
            sub: await subMenuListasNominais(view ?? ""),
        },
        {
            label: "Dados do SISAB",
            url: "/analise",
            telemetryEvent: "acessar_pg_dados_sisab",
        },
        {
            label: "Entenda os Novos Indicadores",
            url: "https://impulsogov-2jxn.help.userguiding.com/pt/categories/3587-novos-indicadores-da-aps",
            telemetryEvent: "acessar_pg_faq_novos_indicadores",
        },
    ];

    return menus;
};

const notLoggedMenu = (): Array<Menu> => {
    return [
        { label: "Quem Somos", url: "/quem-somos" },
        { label: "Dados do SISAB", url: "/analise" },
        { label: "Apoio aos Municípios", url: "/apoio" },
        { label: "FAQ", url: "/faq" },
        { label: "Blog", url: "/blog" },
    ];
};

export const menuNavBar = async (
    view: "aps" | "equipe" | null
): Promise<Array<Menu>> => {
    const isSearchPlusEnabled = await searchPlus();
    const loggedMenuOptions = await loggedMenu(view, isSearchPlusEnabled);
    return view ? loggedMenuOptions : notLoggedMenu();
};
