import { Icon } from "@/features/common/frontend/atoms";

export const HeaderWithTooltip: React.FC<{ headerName: string }> = ({
    headerName,
}) => {
    return (
        <div
            style={{
                width: "100%",
            }}
        >
            {headerName}
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
        </div>
    );
};
