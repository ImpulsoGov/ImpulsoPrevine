import type { JSX } from "react";
import { PrintTag, type PrintTagProps } from "./PrintTag";
import type {
    AppointmentStatusByQuarterText,
    LatestExamRequestStatusByQuarterText,
} from "@/features/acf/shared/hypertension/model";

export type TagDetails = Omit<PrintTagProps, "text">;

type Props = {
    value: StatusByQuarter | undefined;
    tagDetails?: Record<StatusByQuarter, TagDetails>;
};

export type StatusByQuarter =
    | AppointmentStatusByQuarterText
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
    | LatestExamRequestStatusByQuarterText;

export const RenderStatusByQuarterTag = ({
    value,
    tagDetails = tagDetailsByStatus,
}: Props): JSX.Element => {
    if (!value) return <span>-</span>;

    return (
        <PrintTag
            text={value}
            theme={tagDetails[value].theme}
            icon={tagDetails[value].icon}
        />
    );
};

const attentionTagDetails: TagDetails = {
    icon: {
        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs",
        alt: "Indicador de status a vencer no quadrimestre",
        width: 8,
        height: 2,
    },
    theme: "attention",
};

export const tagDetailsByStatus: Record<StatusByQuarter, TagDetails> = {
    "Em dia": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3",
            alt: "Indicador de status em dia",
            width: 6,
            height: 6,
        },
        theme: "success",
    },
    Atrasada: {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs",
            alt: "Indicador de status atrasado",
            width: 8,
            height: 2,
        },
        theme: "warning",
    },
    "Vence dentro do Q1": attentionTagDetails,
    "Vence dentro do Q2": attentionTagDetails,
    "Vence dentro do Q3": attentionTagDetails,
    "Nunca realizado": {
        icon: {
            src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact",
            alt: "Indicador de status nunca realizado",
            width: 8,
            height: 2,
        },
        theme: "danger",
    },
};
