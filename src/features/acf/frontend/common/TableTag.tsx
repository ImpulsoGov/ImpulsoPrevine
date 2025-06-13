import { Icon, Tag, Text } from "@impulsogov/design-system";
import type { TagTheme } from "@impulsogov/design-system/dist/molecules/Tag";

type IconDetails = {
    src: string;
    alt: string;
};

export type TagIconDetailsMap = Record<string, IconDetails>;

export const iconDetailsMap: TagIconDetailsMap = {
    danger: {
        src: "https://media.graphassets.com/TWH6Oby6QuTFyq0wH9QK",
        alt: "Ícone com símbolo da letra x",
    },
    warning: {
        src: "https://media.graphassets.com/o0OkjNboRCqy2bYrRNnb",
        alt: "Ícone de uma exclamação",
    },
    success: {
        src: "https://media.graphassets.com/4qKuRCxHSySL23zxLd9b",
        alt: "Ícone de uma marca de verificação",
    },
    pending: {
        src: "https://media.graphassets.com/IdqIxy4LQAeIZfe9hWZK",
        alt: "Ícone de uma ampulheta",
    },
};

type TableTagProps = {
    theme?: TagTheme;
    text: string;
    icon: {
        src: string;
        alt: string;
    };
};

export const TableTag: React.FC<TableTagProps> = ({
    theme = "danger",
    text,
    icon: { src, alt },
}) => {
    return (
        <Tag theme={theme}>
            <Icon width={12} height={12} src={src} alt={alt} />
            <Text style={{ fontWeight: "500", fontSize: "14px" }}>{text}</Text>
        </Tag>
    );
};
