"use client";
import { useSession } from "next-auth/react";
import type { SituacaoPorIndicador } from "@/types/inicio";
import { cargoTransform } from "@helpers/cargoTransform";
import dynamic from "next/dynamic";
import { AlertSnackBar } from "@/componentes/mounted/inicio/snackbar/AlertSnackBar";
import { Greeting } from "@impulsogov/design-system";
import { Texto } from "@impulsogov/design-system";
import type { CardsGridProps } from "./CardsGrid";

const CardsGrid = dynamic<CardsGridProps>(
    () => import("./CardsGrid").then((mod) => mod.CardsGrid),
    { ssr: false }
);

import style from "./Inicio.module.css";

type InicioProps = {
    situacaoPorIndicador: SituacaoPorIndicador;
    hasDiabetesNewProgramEnabled: boolean;
    hasHypertensionNewProgramEnabled: boolean;
    hasSearchPlusEnabled: boolean;
    hasSearchPlusABEnabled: boolean;
};

export const Inicio: React.FC<InicioProps> = ({
    situacaoPorIndicador = null,
    hasDiabetesNewProgramEnabled,
    hasHypertensionNewProgramEnabled,
    hasSearchPlusEnabled,
    hasSearchPlusABEnabled,
}) => {
    const { data: session } = useSession();
    if (session && situacaoPorIndicador) {
        return (
            <div className={style.Container}>
                <div className={style.GreetingContainer}>
                    <Greeting
                        cargo={cargoTransform(session.user.cargo)}
                        greeting="Boas vindas"
                        municipio_uf={session.user.municipio}
                        nome_usuario={session.user.nome}
                        margin="45px 0"
                    />
                </div>

                <div className={style.ChamadaContainer}>
                    <Texto
                        texto="Confira a situação geral dos cidadãos do seu município"
                        color="#1F1F1F"
                        fontSize="inherit"
                        fontWeight="400"
                        lineHeight="31.2px"
                    />
                </div>

                <Texto
                    texto="Veja abaixo as listas nominais das áreas de cuidado contempladas no programa de financiamento e o número de pacientes em atraso em cada uma delas."
                    color="#1F1F1F"
                    fontSize="16px"
                    fontWeight="300"
                    lineHeight="20.8px"
                    margin="15px 0 0 0"
                />

                <div style={{ paddingTop: "20px" }}>
                    <CardsGrid
                        isAlfa={{
                            hasDiabetesNewProgramEnabled:
                                hasDiabetesNewProgramEnabled,
                            hasHypertensionNewProgramEnabled:
                                hasHypertensionNewProgramEnabled,
                        }}
                        hasSearchPlusEnabled={hasSearchPlusEnabled}
                        situacaoPorIndicador={situacaoPorIndicador}
                        visao={
                            session.user.perfis.includes(5) ||
                            session.user.perfis.includes(8)
                                ? "aps"
                                : "equipe"
                        }
                        hasSearchPlusABEnabled
                    />
                </div>

                <Texto
                    texto="*Na lista de vacinação, o número total mostrado no card equivale ao total de crianças que contabilizam nesse quadrimestre."
                    color="#1F1F1F"
                    fontSize="14px"
                    fontWeight="300"
                    lineHeight="18.2px"
                    margin="0 0 8px 0"
                />

                <Texto
                    texto="**Este valor considera gestantes que tiveram a 1ª consulta de pré-natal até a 12ª semana."
                    color="#1F1F1F"
                    fontSize="14px"
                    fontWeight="300"
                    lineHeight="18.2px"
                    margin="0 0 60px 0"
                />
                <AlertSnackBar
                    show={Object.keys(situacaoPorIndicador).length < 7}
                />
            </div>
        );
    }
};
