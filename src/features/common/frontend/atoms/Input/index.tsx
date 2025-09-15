import React from "react";
import cx from "classnames";
import styles from "./Input.module.css";

type Border = "none" | "full" | "top-bottom-left";
type Shape = "rounded-full" | "rounded-left";

export type InputProps = {
    border?: Border;
    shape?: Shape;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
    type = "text",
    value = "",
    onChange = (): void => {},
    border = "none",
    shape = "rounded-full",
    ...props
}) => {
    return (
        <input
            className={cx(
                styles.container,
                styles[`border-${border}`],
                styles[`shape-${shape}`]
            )}
            value={value}
            type={type}
            onChange={onChange}
            {...props}
        />
    );
};
