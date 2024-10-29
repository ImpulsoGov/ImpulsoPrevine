'use client'
import React from 'react';
import { useSession } from "next-auth/react";
import { SituacaoPorIndicador } from '@/types/inicio';
import { CardsGrid } from './CardsGrid';
import { Greeting, Texto } from '@impulsogov/design-system';
import style from './Inicio.module.css';

 interface InicioProps {
    cargo: string;
    situacaoPorIndicador: SituacaoPorIndicador;
  }

export const Inicio : React.FC<InicioProps> = ({
    cargo,
    situacaoPorIndicador,
}) => {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className={style.Container}>
                <div style={{paddingBottom: "35px"}}>
                    <Greeting
                        cargo = {cargo}
                        greeting = "Boas vindas"
                        municipio_uf = {session?.user.municipio}
                        nome_usuario = {session?.user.nome}
                        margin="45px 0"
                    />
                </div>

                <Texto
                    texto="Confira a situação geral dos cidadãos do seu município"
                    color="#1F1F1F"
                    fontSize="24px"
                    fontWeight="400"
                    lineHeight="31.2px"
                />

                <Texto
                    texto="Veja abaixo as listas nominais das áreas de cuidado contempladas no programa de financiamento e o número de pacientes em atraso em cada uma delas."
                    color="#1F1F1F"
                    fontSize="16px"
                    fontWeight="300"
                    lineHeight="20.8px"
                    margin="15px 0 0 0"
                />

                <div style={{paddingTop: "20px"}}>
                    <CardsGrid
                        situacaoPorIndicador={situacaoPorIndicador}
                    />
                </div>

                <Texto
                    texto="*Na lista de vacinação, o número total mostrado no card equivale ao total de crianças que contabilizam nesse quadrimestre."
                    color="#1F1F1F"
                    fontSize="14px"
                    fontWeight="300"
                    lineHeight="18.2px"
                    margin="0 0 60px 0"
                />
            </div>
        )
    }
}