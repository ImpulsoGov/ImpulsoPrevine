import { Icon, Text } from "@/features/common/frontend/atoms";
import { PrintTag } from "@/features/common/frontend/molecules";
import type { Status } from "../carePathways";

type TagProps = {
    content: Status;
};

export const DangerTag: React.FC<TagProps> = ({ content }) => {
    return (
        <PrintTag theme="danger">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact"
                alt="Ícone de três círculos preenchidos em vermelho"
                width={12}
                height={4}
            />
            <Text>{content}</Text>
        </PrintTag>
    );
};

export const WarningTag: React.FC<TagProps> = ({ content }) => {
    return (
        <PrintTag theme="warning">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs"
                alt="Ícone de dois círculos preenchidos em laranja e um círculo vazio"
                width={12}
                height={4}
            />
            <Text>{content}</Text>
        </PrintTag>
    );
};

export const DisabledTag: React.FC<TagProps> = ({ content }) => {
    return (
        <PrintTag theme="disabled">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh0ukoui072608lr7z492lil"
                alt="Ícone de um conjunto vazio"
                width={8}
                height={8}
            />
            <Text>{content}</Text>
        </PrintTag>
    );
};
export const LostedTag: React.FC<TagProps> = ({ content }) => {
    return (
        <PrintTag theme="disabled">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmhnoilrs2vlh07keu437gdcq"
                alt="Ícone de um x dentro de um círculo"
                width={8}
                height={8}
            />
            <Text>{content}</Text>
        </PrintTag>
    );
};
export const AttentionTag: React.FC<TagProps> = ({ content }) => {
    return (
        <PrintTag theme="attention">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs"
                alt="Ícone de um círculo preenchido em amarelo e dois círculos vazios"
                width={12}
                height={4}
            />
            <Text>{content}</Text>
        </PrintTag>
    );
};

export const SuccessTag: React.FC<TagProps> = ({ content }) => {
    return (
        <PrintTag theme="success">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3"
                alt="Ícone de uma marca de verificação verde"
                width={8}
                height={8}
            />
            <Text>{content}</Text>
        </PrintTag>
    );
};

export const TagByStatus: React.FC<TagProps> = ({ content }) => {
    const statusTagMap: Record<Status, React.FC<TagProps>> = {
        "Nunca realizado": DangerTag,
        Atrasada: WarningTag,
        "Não aplica": DisabledTag,
        "Vence dentro do Q1": AttentionTag,
        "Vence dentro do Q2": AttentionTag,
        "Vence dentro do Q3": AttentionTag,
        "Em dia": SuccessTag,
        Perdido: LostedTag,
        "Última chance no Q1": DangerTag,
        "Última chance no Q2": DangerTag,
        "Última chance no Q3": DangerTag,
    };

    const TagComponent = statusTagMap[content];

    return <TagComponent content={content} />;
};
