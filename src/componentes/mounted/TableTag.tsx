import { Tag, Icon, Text } from "@impulsogov/design-system";
import type { TagTheme } from "@impulsogov/design-system/dist/molecules/Tag/Tag";

export type TableTagProps = {
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
