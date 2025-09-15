import React from "react";
import styles from "./Tag.module.css";
import cx from "classnames";

export type TagTheme =
    | "danger"
    | "warning"
    | "success"
    | "pending"
    | "normal"
    | "attention";
export type TagShape = "rounded" | "square";
export type TagType = "status" | "info";

export type TagProps = {
    children: React.ReactNode;
    theme?: TagTheme;
    shape?: TagShape;
    type?: TagType;
};

export const Tag: React.FC<TagProps> = ({
    children,
    theme = "danger",
    shape = "rounded",
    type = "status",
}) => {
    return (
        <div
            className={cx(
                styles.container,
                styles[`spacing-${type}`],
                styles[`typography-${type}`],
                styles[`theme-${theme}`],
                styles[`shape-${shape}-${type}`]
            )}
        >
            {children}
        </div>
    );
};
