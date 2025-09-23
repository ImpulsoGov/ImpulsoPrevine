import React from "react";
import cx from "classnames";
import styles from "./Button.module.css";

type Theme = "green" | "white";
type Shape = "rounded-full" | "rounded-right";
type Border = "none" | "full";

export type ButtonProps = {
    theme?: Theme;
    shape?: Shape;
    border?: Border;
    hasHover?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick = (): void => {},
    theme = "green",
    shape = "rounded-full",
    border = "none",
    hasHover = false,
    ...props
}) => {
    return (
        <button
            className={cx(
                styles.container,
                styles.typography,
                styles[`shape-${shape}`],
                styles[`border-${border}`],
                styles[`theme-${theme}-${hasHover ? "with-hover" : "no-hover"}`]
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
