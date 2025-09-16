import React, { type PropsWithChildren } from "react";

type TextProps = PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
    return <span {...props}>{children}</span>;
};
