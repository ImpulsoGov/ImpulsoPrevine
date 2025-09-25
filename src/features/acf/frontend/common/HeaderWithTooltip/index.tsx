import { Icon } from "@/features/common/frontend/atoms";
import { Tooltip } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState, type ReactNode } from "react";
import style from "./style.module.css";

export const HeaderWithTooltip: React.FC<{
    headerName: string;
    tooltipContent: ReactNode;
}> = ({ headerName, tooltipContent }) => {
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {headerName}
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                    <Tooltip
                        open={isOpen}
                        onClose={handleTooltipClose}
                        onOpen={handleTooltipOpen}
                        title={tooltipContent}
                        placement="top"
                        arrow
                        disableFocusListener
                        disableTouchListener
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
                            onClick={handleTooltipOpen}
                            className={style.Icon}
                        />
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    );
};
