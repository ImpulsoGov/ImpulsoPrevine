import type { CSSProperties } from "react";
import React from "react";

export type PrintTagTheme = "danger" | "warning" | "success" | "attention";

export type PrintTagShape = "rounded" | "square";

export type PrintTagType = "default";

export type TagProps = {
    children: React.ReactNode;
    theme?: PrintTagTheme;
    shape?: PrintTagShape;
    type?: PrintTagType;
};

export const PrintTag: React.FC<TagProps> = ({
    children,
    theme = "danger",
    shape = "rounded",
    type = "default",
}) => {
    return (
        <div
            style={{
                ...container,
                ...spacing[type],
                ...typography[type],
                ...themes[theme],
                ...shapes[shape],
            }}
        >
            {children}
        </div>
    );
};

const container: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
};

const spacing: Record<PrintTagType, CSSProperties> = {
    default: {
        gap: "5px",
        padding: "2px 5px",
    },
};

const typography: Record<PrintTagType, CSSProperties> = {
    default: {
        fontSize: "6px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "150%",
    },
};

const themes: Record<PrintTagTheme, CSSProperties> = {
    danger: {
        backgroundColor: "#FAD2D2",
        color: "#991B1B",
        width: "60px",
    },
    warning: {
        backgroundColor: "#FFE2B8",
        color: "#B45309",
        width: "48px",
    },
    success: {
        backgroundColor: "#D0F5DB",
        color: "#00923D",
        width: "40px",
    },
    attention: {
        backgroundColor: "#FFF2A6",
        color: "#654F00",
        width: "60px",
    },
};

const shapes: Record<PrintTagShape, CSSProperties> = {
    rounded: {
        borderRadius: "4px",
    },
    square: {
        borderRadius: "0",
    },
};
