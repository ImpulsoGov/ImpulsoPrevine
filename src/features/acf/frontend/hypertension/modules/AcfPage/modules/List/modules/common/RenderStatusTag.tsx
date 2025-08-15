import { getCurrentQuadrimester } from "@/features/acf/frontend/common/GetCurrentQuadrimester";
import type { TableTagProps } from "@/features/acf/frontend/common/TableTag";
import { TableTag } from "@/features/acf/frontend/common/TableTag";
import type {
    AppointmentStatusByQuarterText,
    LatestExamRequestStatusByQuarterText,
} from "@/features/acf/shared/hypertension/model";
import type { JSX } from "react";

const detailsByValue: Record<StatusByQuarter, Omit<TableTagProps, "text">> = {
    "Em dia": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3",
            alt: "Ícone de uma marca de verificação",
        },
        theme: "success",
    },
    Atrasada: {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs",
            alt: "Ícone com símbolo da letra x",
            width: 17,
            height: 4,
        },
        theme: "warning",
    },
    "Vence dentro do quadri": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs",
            alt: "Ícone de uma exclamação",
            width: 17,
            height: 4,
        },
        theme: "attention",
    },
    "Nunca realizado": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact",
            alt: "Ícone de uma ampulheta",
            width: 17,
            height: 4,
        },
        theme: "danger",
    },
};
// É melhor para a claridade do codigo que deixemos explicito o union type equivalente aos textos das duas colunas
// No futuro, se quisermos utilizar outros status para apenas uma das duas, nao sera necessario modificar aqui
export type StatusByQuarter =
    | AppointmentStatusByQuarterText
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
    | LatestExamRequestStatusByQuarterText;
export const RenderStatusTag = ({
    value,
    tagDetails = detailsByValue,
}: {
    value?: StatusByQuarter;
    tagDetails?: Record<StatusByQuarter, Omit<TableTagProps, "text">>;
}): JSX.Element => {
    if (!value) return <span>-</span>;
    const statusText =
        value === "Vence dentro do quadri"
            ? `Vence dentro de Q${getCurrentQuadrimester().toString()}`
            : value;
    return (
        <TableTag
            text={statusText}
            theme={tagDetails[value].theme}
            icon={tagDetails[value].icon}
        />
    );
};
