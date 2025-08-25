import type { Session } from "next-auth";
import { hypertensionNewProgram } from "@/features/common/shared/flags";

export type Menu = {
    label: string;
    url: string;
    sub?: Array<Menu>;
    onClick?: () => void;
};

type Profile = "aps" | "equipe";

const subMenuListasNominais = async (visao: Profile): Promise<Array<Menu>> => {
    const isHypertensionNewProgramEnabled = await hypertensionNewProgram();
    return [
        {
            label: "Citopatológico",
            url: `/busca-ativa/citopatologico?aba=&sub_aba=0&visao=${visao}`,
        },
        {
            label: "Diabetes",
            url: `/busca-ativa/diabeticos?aba=&sub_aba=&visao=${visao}`,
        },
        {
            label: "Hipertensão",
            url: `/busca-ativa/hipertensos?aba=&sub_aba=&visao=${visao}`,
        },
        ...(isHypertensionNewProgramEnabled
            ? [
                  {
                      label: "👉 Cuidado da pessoa com Hipertensão [BETA]",
                      url: `/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao`,
                  },
              ]
            : []),
        {
            label: "Pré-Natal",
            url: `/busca-ativa/gestantes?aba=0&sub_aba=0&visao=${visao}`,
        },
        {
            label: "Vacinação",
            url: `/busca-ativa/vacinacao?aba=0&sub_aba=0&visao=${visao}`,
        },
    ];
};

const loggedMenu = async (session: Session | null): Promise<Array<Menu>> => {
    const menus: Array<Menu> = [
        {
            label: "Início",
            url: "/inicio",
        },
        {
            label: "Listas Nominais",
            url: "",
            sub: await subMenuListasNominais(
                session?.user.perfis.includes(8) ? "aps" : "equipe"
            ),
        },
        {
            label: "Dados do SISAB",
            url: "/analise",
        },
        {
            label: "Entenda os Novos Indicadores",
            url: "https://impulsogov-2jxn.help.userguiding.com/pt/categories/3587-novos-indicadores-da-aps",
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
    session: Session | null
): Promise<Array<Menu>> => {
    const loggedMenuOptions = await loggedMenu(session);
    return session ? loggedMenuOptions : notLoggedMenu();
};
