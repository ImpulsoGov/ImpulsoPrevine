import { getCurrentQuadrimester } from "@/features/acf/frontend/common/GetCurrentQuadrimester";
import { TableTag } from "@/features/acf/frontend/common/TableTag";
import type { JSX } from "react";
import { tagDetailsByStatus } from "./consts";
import type { StatusByQuarter, TagDetails } from "./model";

type Props = {
    value?: StatusByQuarter;
    tagDetails?: Record<StatusByQuarter, TagDetails>;
};

export const RenderStatusByQuarterTag = ({
    value,
    tagDetails = tagDetailsByStatus,
}: Props): JSX.Element => {
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
