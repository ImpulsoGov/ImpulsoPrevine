import { Icon, Button } from "@impulsogov/design-system";

type PrintButtonProps = {
    print: () => void;
};

export const PrintButton: React.FC<PrintButtonProps> = ({ print }) => {
    return (
        <Button hasHover onClick={print}>
            <Icon
                alt="Ícone de uma impressora"
                height={16}
                src="https://media.graphassets.com/3vsKrZXYT9CdxSSyhjhk"
                width={16}
            />
            Imprimir lista
        </Button>
    );
};
