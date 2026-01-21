import React from "react";
import style from "./ButtonLight.module.css";
import Link from "next/link";
type ButtonLightProps = {
    icon?: {
        url: string;
        position: "left" | "right";
    };
    label: string;
    url: string;
    disabled?: boolean;
};

export const ButtonLight: React.FC<ButtonLightProps> = ({
    icon,
    label,
    url,
    disabled = false,
}) => {
    return (
        <Link
            href={url}
            className={
                disabled
                    ? style.ButtonLightDisabled
                    : style.ButtonLightIconContainer
            }
        >
            {icon?.position == "right" && (
                <img className={style.IconRight} src={icon.url} />
            )}
            {label}
            {icon?.position == "left" && (
                <img className={style.IconLeft} src={icon.url} />
            )}
        </Link>
    );
};
