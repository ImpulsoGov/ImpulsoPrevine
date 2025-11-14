import { Indicadores, type SituacaoPorIndicador } from "@/types/inicio";
import { isValid } from "@/helpers/situation";
import {
    Grid12Col,
    Banner,
    CardClicavel,
    CardLista,
    DetailedInfo,
} from "@impulsogov/design-system";
import mixpanel from "mixpanel-browser";
import type React from "react";
import { DetailInfoError } from "@componentes/unmounted/Inicio/DetailInfoError";
import type { CSSProperties } from "react";
import { Tag } from "@/features/common/frontend/molecules";
import { Text } from "@/features/common/frontend/atoms";

type CardListaChild = {
    indicador: Indicadores;
    descricao: string;
    error: string;
};

type CardListaWrapper = {
    icone: {
        src: string;
        alt: string;
    };
    titulo: string;
    descricao: string;
    height: string;
    link: {
        url: string;
        newTab: boolean;
    };
    handleHeaderClick: () => void;
};

export type CardsGridProps = {
    situacaoPorIndicador: SituacaoPorIndicador;
    visao: string;
    // TODO: rever nome dessa prop
    isAlfa: {
        hasDiabetesNewProgramEnabled: boolean;
        hasHypertensionNewProgramEnabled: boolean;
    };
    hasSearchPlusEnabled: boolean;
};

export type CardIndicatorType =
    | "cardsDiabetesEVacinacao"
    | "cardsHipertensaoECito";

type CardListaType = {
    wrapper: CardListaWrapper;
    child?: CardListaChild;
};

// TODO: discutir se faz sentido retornar somente as infos de diabetes
const diabetesAndVaccinationAlfa = (visao: string): CardGridDataTypeContent => {
    return {
        div: {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                height: "100%",
            },
        },
        cardLista: [
            {
                wrapper: {
                    icone: {
                        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmgjo9sri06tq07kpstw9b4tx",
                        alt: "Ícone de uma estrela",
                    },
                    titulo: "Diabetes",
                    descricao:
                        "Veja aqui a lista de Cuidado da Pessoa com Diabetes do novo programa de cofinanciamento do governo e as boas práticas vinculadas a esse indicador.",
                    height: "50%",
                    link: {
                        url: `/cofin25/indicadores/cuidado_da_pessoa_com_diabetes`,
                        newTab: false,
                    },
                    handleHeaderClick: (): void => {
                        mixpanel.track("card_click", {
                            card_action: "acessar_lista_diabetes",
                            card_page: "pg_inicio",
                        });
                    },
                },
            },
            {
                wrapper: {
                    icone: {
                        src: "https://media.graphassets.com/hXdEtm9qRDm47poV0Udr",
                        alt: "Ícone de uma seringa",
                    },
                    titulo: "Vacinação",
                    descricao:
                        "Contempla os esquemas vacinais de poliomielite e pentavalente em crianças de zero a um ano e meio.",
                    height: "50%",
                    link: {
                        url: `/busca-ativa/vacinacao?aba=0&sub_aba=0&visao=${visao}`,
                        newTab: false,
                    },
                    handleHeaderClick: (): void => {
                        mixpanel.track("card_click", {
                            card_action: "acessar_lista_vacinacao",
                            card_page: "pg_inicio",
                        });
                    },
                },
                child: {
                    indicador: Indicadores.VACINACAO,
                    descricao: "Crianças com pelo menos uma dose em atraso",
                    error: "Não foi possível carregar os dados do indicador",
                },
            },
        ],
    };
};

// TODO: discutir se faz sentido retornar somente as infos de hipertensao
const hypertensionAndCitoAlfa = (visao: string): CardGridDataTypeContent => {
    return {
        div: {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                height: "100%",
            },
        },
        cardLista: [
            {
                wrapper: {
                    icone: {
                        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmgjo9sri06tq07kpstw9b4tx",
                        alt: "Ícone de uma estrela",
                    },
                    titulo: "Hipertensão",
                    descricao:
                        "Veja aqui a lista de Cuidado da Pessoa com Hipertensão do novo programa de cofinanciamento do governo e as boas práticas vinculadas a esse indicador.",
                    height: "50%",
                    link: {
                        url: `/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao`,
                        newTab: false,
                    },
                    handleHeaderClick: (): void => {
                        mixpanel.track("card_click", {
                            card_action: "acessar_lista_hipertensao",
                            card_page: "pg_inicio",
                        });
                    },
                },
            },
            {
                wrapper: {
                    icone: {
                        src: "https://media.graphassets.com/6H2CeiquR0KEiDAee4iz",
                        alt: "Ícone de um tubo de ensaio meio cheio",
                    },
                    titulo: "Citopatológico",
                    descricao:
                        "Mostra o status de todas as pessoas entre 25 e 64 anos que têm a coleta em dia, em atraso ou que nunca a realizaram.",
                    height: "50%",
                    link: {
                        url: `/busca-ativa/citopatologico?aba=&sub_aba=0&visao=${visao}`,
                        newTab: false,
                    },
                    handleHeaderClick: (): void => {
                        mixpanel.track("card_click", {
                            card_action: "acessar_lista_citopatologico",
                            card_page: "pg_inicio",
                        });
                    },
                },
                child: {
                    indicador: Indicadores.CITOPATOLOGICO,
                    descricao: "Pessoas com coleta de citopatológico a fazer",
                    error: "Não foi possível carregar os dados do indicador",
                },
            },
        ],
    };
};

type CardGridDataTypeContent = {
    div: {
        style: CSSProperties;
    };
    cardLista: Array<CardListaType>;
};

export type CardsGridDataType = {
    [Key in CardIndicatorType]: CardGridDataTypeContent;
};

export const CardsGrid: React.FC<CardsGridProps> = ({
    isAlfa,
    situacaoPorIndicador,
    visao,
    hasSearchPlusEnabled,
}) => {
    const CardsGridData: CardsGridDataType = {
        cardsDiabetesEVacinacao: isAlfa.hasDiabetesNewProgramEnabled
            ? diabetesAndVaccinationAlfa(visao)
            : {
                  div: {
                      style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: "24px",
                          height: "100%",
                      },
                  },
                  cardLista: [
                      {
                          wrapper: {
                              icone: {
                                  src: "https://media.graphassets.com/wKizPRr0T2eZhDSOxZ4n",
                                  alt: "Ícone de um estômago",
                              },
                              titulo: "Diabetes",
                              descricao:
                                  "Cidadãos que possuem a condição e o status de consulta e solicitação de hemoglobina.",
                              height: "50%",
                              link: {
                                  url: `/busca-ativa/diabeticos?aba=&sub_aba=&visao=${visao}`,
                                  newTab: false,
                              },
                              handleHeaderClick: (): void => {
                                  mixpanel.track("card_click", {
                                      card_action: "acessar_lista_diabetes",
                                      card_page: "pg_inicio",
                                  });
                              },
                          },
                          child: {
                              indicador: Indicadores.DIABETES,
                              descricao:
                                  "Pessoas com consulta ou solicitação de hemoglobina a fazer",
                              error: "Não foi possível carregar os dados do indicador",
                          },
                      },
                      {
                          wrapper: {
                              icone: {
                                  src: "https://media.graphassets.com/hXdEtm9qRDm47poV0Udr",
                                  alt: "Ícone de uma seringa",
                              },
                              titulo: "Vacinação",
                              descricao:
                                  "Contempla os esquemas vacinais de poliomielite e pentavalente em crianças de zero a um ano e meio.",
                              height: "50%",
                              link: {
                                  url: `/busca-ativa/vacinacao?aba=0&sub_aba=0&visao=${visao}`,
                                  newTab: false,
                              },
                              handleHeaderClick: (): void => {
                                  mixpanel.track("card_click", {
                                      card_action: "acessar_lista_vacinacao",
                                      card_page: "pg_inicio",
                                  });
                              },
                          },
                          child: {
                              indicador: Indicadores.VACINACAO,
                              descricao:
                                  "Crianças com pelo menos uma dose em atraso",
                              error: "Não foi possível carregar os dados do indicador",
                          },
                      },
                  ],
              },
        cardsHipertensaoECito: isAlfa.hasHypertensionNewProgramEnabled
            ? hypertensionAndCitoAlfa(visao)
            : {
                  div: {
                      style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: "24px",
                          height: "100%",
                      },
                  },
                  cardLista: [
                      {
                          wrapper: {
                              icone: {
                                  src: "https://media.graphassets.com/d2BJhIM2TVy2gTMqM4BC",
                                  alt: "Ícone de um estetoscópio",
                              },
                              titulo: "Hipertensão",
                              descricao:
                                  "Cidadãos que possuem a condição e o status de consulta e aferição de pressão.",
                              height: "50%",
                              link: {
                                  url: `busca-ativa/hipertensos?aba=&sub_aba=&visao=${visao}`,
                                  newTab: false,
                              },
                              handleHeaderClick: (): void => {
                                  mixpanel.track("card_click", {
                                      card_action: "acessar_lista_hipertensao",
                                      card_page: "pg_inicio",
                                  });
                              },
                          },
                          child: {
                              indicador: Indicadores.HIPERTENSOS,
                              descricao:
                                  "Pessoas com consulta ou aferição de pressão a fazer",
                              error: "Não foi possível carregar os dados do indicador",
                          },
                      },
                      {
                          wrapper: {
                              icone: {
                                  src: "https://media.graphassets.com/6H2CeiquR0KEiDAee4iz",
                                  alt: "Ícone de um tubo de ensaio meio cheio",
                              },
                              titulo: "Citopatológico",
                              descricao:
                                  "Mostra o status de todas as pessoas entre 25 e 64 anos que têm a coleta em dia, em atraso ou que nunca a realizaram.",
                              height: "50%",
                              link: {
                                  url: `/busca-ativa/citopatologico?aba=&sub_aba=0&visao=${visao}`,
                                  newTab: false,
                              },
                              handleHeaderClick: (): void => {
                                  mixpanel.track("card_click", {
                                      card_action:
                                          "acessar_lista_citopatologico",
                                      card_page: "pg_inicio",
                                  });
                              },
                          },
                          child: {
                              indicador: Indicadores.CITOPATOLOGICO,
                              descricao:
                                  "Pessoas com coleta de citopatológico a fazer",
                              error: "Não foi possível carregar os dados do indicador",
                          },
                      },
                  ],
              },
    };

    const cardsExceptPregnant = Object.keys(CardsGridData).map((key) => {
        const card = CardsGridData[key as CardIndicatorType];
        return (
            <div style={card.div.style} key={key}>
                {card.cardLista.map((cardList) => (
                    <CardLista
                        key={cardList.wrapper.titulo}
                        icone={cardList.wrapper.icone}
                        titulo={cardList.wrapper.titulo}
                        descricao={cardList.wrapper.descricao}
                        link={cardList.wrapper.link}
                        onHeaderClick={cardList.wrapper.handleHeaderClick}
                    >
                        {cardList.child === undefined ? (
                            <Tag theme="purple" style={{ borderRadius: "5px" }}>
                                <Text
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        lineHeight: "130%",
                                    }}
                                >
                                    NOVIDADE
                                </Text>
                            </Tag>
                        ) : isValid(
                              situacaoPorIndicador,
                              cardList.child.indicador
                          ) ? (
                            <>
                                <DetailedInfo
                                    descricao={cardList.child.descricao}
                                    destaque={
                                        situacaoPorIndicador[
                                            cardList.child.indicador
                                        ].pendente
                                    }
                                    complemento={`de ${situacaoPorIndicador[cardList.child.indicador].total.toString()}`}
                                />
                            </>
                        ) : (
                            <DetailInfoError error={cardList.child.error} />
                        )}
                    </CardLista>
                ))}
            </div>
        );
    });

    return (
        <Grid12Col
            proporcao="3-3-3-3"
            items={[
                ...cardsExceptPregnant,
                <div
                    key="cardsPreNatalESuporte"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        height:
                            isValid(
                                situacaoPorIndicador,
                                Indicadores.PRE_NATAL_6_CONSULTAS
                            ) &&
                            isValid(
                                situacaoPorIndicador,
                                Indicadores.PRE_NATAL_SIFILIS_HIV
                            ) &&
                            isValid(
                                situacaoPorIndicador,
                                Indicadores.PRE_NATAL_ODONTO
                            )
                                ? "100%"
                                : "fit-content",
                    }}
                >
                    <CardLista
                        icone={{
                            src: "https://media.graphassets.com/YQYyv3URTiNRGv6kWsfg",
                            alt: "Ícone de um carrinho de bebê",
                        }}
                        titulo="Pré-Natal"
                        descricao="Considera o status dos exames de sífilis e HIV, atendimento odontológico e número de consultas das gestantes."
                        link={{
                            url: `/busca-ativa/gestantes?aba=0&sub_aba=0&visao=${visao}`,
                            newTab: false,
                        }}
                        onHeaderClick={(): void => {
                            mixpanel.track("card_click", {
                                card_action: "acessar_lista_pre_natal",
                                card_page: "pg_inicio",
                            });
                        }}
                    >
                        {isValid(
                            situacaoPorIndicador,
                            Indicadores.PRE_NATAL_6_CONSULTAS
                        ) &&
                        isValid(
                            situacaoPorIndicador,
                            Indicadores.PRE_NATAL_SIFILIS_HIV
                        ) &&
                        isValid(
                            situacaoPorIndicador,
                            Indicadores.PRE_NATAL_ODONTO
                        ) ? (
                            <>
                                <DetailedInfo
                                    descricao="Gestantes com menos de 6 consultas de pré-natal**"
                                    destaque={
                                        situacaoPorIndicador[
                                            Indicadores.PRE_NATAL_6_CONSULTAS
                                        ].pendente
                                    }
                                    complemento={`de ${situacaoPorIndicador[Indicadores.PRE_NATAL_6_CONSULTAS].total.toString()}`}
                                />
                                <DetailedInfo
                                    descricao="Gestantes sem o exame de Sífilis ou de HIV identificados"
                                    destaque={
                                        situacaoPorIndicador[
                                            Indicadores.PRE_NATAL_SIFILIS_HIV
                                        ].pendente
                                    }
                                    complemento={`de ${situacaoPorIndicador[Indicadores.PRE_NATAL_SIFILIS_HIV].total.toString()}`}
                                />
                                <DetailedInfo
                                    descricao="Gestantes sem o atendimento odontológico identificado"
                                    destaque={
                                        situacaoPorIndicador[
                                            Indicadores.PRE_NATAL_ODONTO
                                        ].pendente
                                    }
                                    complemento={`de ${situacaoPorIndicador[Indicadores.PRE_NATAL_ODONTO].total.toString()}`}
                                />
                            </>
                        ) : (
                            <DetailInfoError error="Não foi possível carregar os dados do indicador" />
                        )}
                    </CardLista>
                    <CardClicavel
                        descricao={{
                            content: "Clique aqui para falar com o suporte",
                            contentOnHover:
                                "<u>Clique aqui</u> para falar com o suporte",
                        }}
                        icone={{
                            alt: "Ícone do whatsapp",
                            src: "https://media.graphassets.com/eyhtI9x1RIiXOyUgnD8K",
                            srcOnHover:
                                "https://media.graphassets.com/GBWxV5tTQjK8RKcvee3z",
                        }}
                        link={{
                            newTab: true,
                            url: "https://bit.ly/atendimento-impulso-previne-site",
                        }}
                        titulo="Falar com o suporte"
                        onClick={(): void => {
                            mixpanel.track("card_click", {
                                card_action: "solicitar_suporte_wpp",
                                card_page: "pg_inicio",
                            });
                        }}
                    />
                </div>,
                hasSearchPlusEnabled ? (
                    <Banner
                        key="bannerGuiasEDicas"
                        descricao={{
                            content:
                                "Converta seus relatórios do PEC em segundos, e tenha listas prontas para distribuir aos ACS e simplificar o acompanhamento dos cidadãos.",
                            color: "#88181D",
                        }}
                        icone={{
                            alt: "Ícone bastão brilhante",
                            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmhyvsqvb012607m0j4azkw1w",
                            width: "33px",
                            height: "40px",
                        }}
                        link={{
                            newTab: true,
                            url: "https://bit.ly/contruibua-tela-inicial",
                        }}
                        botao={{
                            label: "VER FERRAMENTA",
                            backgroundColor: "#88181D",
                            backgroundColorOnHover: "#88181D",
                        }}
                        titulo={{
                            content: "Busca+mais",
                            color: "#88181D",
                        }}
                        onClick={(): void => {
                            mixpanel.track("card_click", {
                                card_action: "enviar_feedback_novidade",
                                card_page: "pg_inicio",
                            });
                        }}
                        backgroundColor="#F8BCAE"
                    />
                ) : (
                    <Banner
                        key="bannerGuiasEDicas"
                        descricao={{
                            content:
                                "Estamos adaptando o Impulso Previne às novas regras da APS. <p>Quer ser um dos primeiros a testar e ajudar a construir essa nova fase? 👀 </p>",
                            color: "#1F7A99",
                        }}
                        icone={{
                            alt: "Ícone de uma lâmpada",
                            src: "https://media.graphassets.com/czfiUThpQWWTmUNquGAR",
                            width: "33px",
                            height: "40px",
                        }}
                        link={{
                            newTab: true,
                            url: "https://bit.ly/contruibua-tela-inicial",
                        }}
                        botao={{
                            label: "QUERO PARTICIPAR",
                            backgroundColor: "#1F7A99",
                            backgroundColorOnHover: "#1F7A99",
                        }}
                        titulo={{
                            content: "Novos indicadores",
                            color: "#1F7A99",
                        }}
                        onClick={(): void => {
                            mixpanel.track("card_click", {
                                card_action: "enviar_feedback_novidade",
                                card_page: "pg_inicio",
                            });
                        }}
                        backgroundColor="#B5E4E9"
                    />
                ),
            ]}
        />
    );
};
