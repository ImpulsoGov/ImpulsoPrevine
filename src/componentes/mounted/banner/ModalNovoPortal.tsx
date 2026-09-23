"use client";
import { ModalAlertDisplay } from "@impulsogov/design-system";
import { type RefObject, useState } from "react";
import styles from "./ModalNovoPortal.module.css";

// Copy e imagem seguem o guia "Modal IP área aberta - aviso de novo portal"
// (UserGuiding 171998); as cores vêm do tema padrão do UserGuiding.
const IMAGEM_URL = "/modal-novo-portal.png";

type CardNovoPortalProps = {
    refModal: RefObject<HTMLDivElement | null>;
    props: { portalUrl: string; setDisplay: (display: boolean) => void };
};

const CardNovoPortal = ({ refModal, props }: CardNovoPortalProps) => (
    <div
        ref={refModal}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-novo-portal-titulo"
    >
        <button
            type="button"
            className={styles.fechar}
            aria-label="Fechar"
            onClick={() => {
                props.setDisplay(false);
            }}
        >
            ✕
        </button>
        <img className={styles.imagem} src={IMAGEM_URL} alt="" />
        <div className={styles.conteudo}>
            <h2 id="modal-novo-portal-titulo" className={styles.titulo}>
                O Impulso Previne agora é Portal Impulso
            </h2>
            <p className={styles.texto}>
                Se você é um profissional de saúde de um município parceiro, que
                já tem acesso liberado, clique abaixo para acessar a nova área
                logada e ver os indicadores atualizados para o novo programa de
                cofinanciamento.
            </p>
            <a
                className={styles.botao}
                href={props.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    props.setDisplay(false);
                }}
            >
                Ir para o novo Portal
            </a>
        </div>
    </div>
);

export const ModalNovoPortalMounted = ({
    portalUrl,
}: {
    portalUrl: string;
}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <ModalAlertDisplay
            displayStates={{ display: isOpen, setDisplay: setIsOpen }}
            Child={CardNovoPortal}
            childProps={{ portalUrl }}
        />
    );
};
