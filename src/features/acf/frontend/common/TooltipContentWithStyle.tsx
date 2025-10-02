import type { PropsWithChildren } from "react";

// TODO: rever nome (porque é muito genérico) e localização (porque está
// atrelado ao HeaderWithTooltip) desse componente
export const TooltipContentWithStyle: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <div
            style={{
                fontSize: "16px",
            }}
        >
            {children}
        </div>
    );
};
