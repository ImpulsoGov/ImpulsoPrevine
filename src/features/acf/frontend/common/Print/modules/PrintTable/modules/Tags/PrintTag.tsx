import { Icon, Text } from "@/features/common/frontend/atoms";
import {
    type PrintTagTheme,
    PrintTag as BasePrintTag,
} from "@/features/common/frontend/molecules";

export type PrintTagProps = {
    theme?: PrintTagTheme;
    text: string;
    icon: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    };
};

export const PrintTag: React.FC<PrintTagProps> = ({
    theme = "danger",
    text,
    icon: { src, alt, width, height },
}) => {
    return (
        <BasePrintTag theme={theme}>
            <Icon
                width={width ?? 12}
                height={height ?? 12}
                src={src}
                alt={alt}
            />
            <Text>{text}</Text>
        </BasePrintTag>
    );
};
