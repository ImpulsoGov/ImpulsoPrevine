import type { PrintTagTheme } from "@/features/common/frontend/molecules";
import { PrintTag } from "@/features/common/frontend/molecules";
import { Icon, Text } from "@/features/common/frontend/atoms";
import type { Count } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const IconThemeAlt: Record<PrintTagTheme, { icon: string; alt: string }> = {
    success: {
        icon: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3",
        alt: "Ícone de uma marca de verificação verde",
    },
    attention: {
        icon: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs",
        alt: "Ícone de um círculo preenchido em amarelo e dois círculos vazios",
    },
    disabled: {
        icon: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmhnoilrs2vlh07keu437gdcq",
        alt: "Ícone de um x dentro de um círculo",
    },
    warning: {
        icon: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs",
        alt: "Ícone de dois círculos preenchidos em laranja e um círculo vazio",
    },
    danger: {
        icon: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact",
        alt: "Ícone de três círculos preenchidos em vermelho",
    },
};

export const Tag: React.FC<{
    theme: PrintTagTheme;
    count: Count;
}> = ({ theme, count }) => {
    return (
        <PrintTag theme={theme}>
            <Icon
                loading="eager"
                src={IconThemeAlt[theme].icon}
                alt={IconThemeAlt[theme].alt}
                width={8}
                height={8}
            />
            <Text>
                {count.current}/{count.total}
            </Text>
        </PrintTag>
    );
};
