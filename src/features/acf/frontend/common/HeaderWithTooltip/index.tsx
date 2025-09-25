import { Icon } from "@/features/common/frontend/atoms";
import { Tooltip } from "@mui/material";
import { useState, type ReactNode } from "react";

export const HeaderWithTooltip: React.FC<{
    headerName: string;
    tooltipText: ReactNode;
}> = ({ headerName, tooltipText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleTooltipClose = (): void => {
        setIsOpen(false);
    };

    const handleTooltipOpen = (): void => {
        setIsOpen(true);
    };
    return (
        <div
            style={{
                width: "100%",
            }}
        >
            {headerName}
            <Tooltip
                open={isOpen}
                onClose={handleTooltipClose}
                onOpen={handleTooltipOpen}
                title={tooltipText}
                placement="top"
                arrow
            >
                <Icon
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                    alt="Ícone de informação"
                    width={16}
                    height={16}
                    style={{
                        marginLeft: 4,
                        verticalAlign: "middle",
                        marginTop: -2,
                    }}
                />
            </Tooltip>
        </div>
    );
};
