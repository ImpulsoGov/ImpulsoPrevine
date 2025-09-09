import { TableTag } from "@/features/acf/frontend/common/TableTag";
import type { JSX } from "react";
import { tagDetailsByStatus } from "./consts";
import type { StatusByQuarter, TagDetails } from "./model";

type Props = {
    value: StatusByQuarter | undefined;
    tagDetails?: Record<StatusByQuarter, TagDetails>;
};

export const RenderStatusByQuarterTag = ({
    value,
    tagDetails = tagDetailsByStatus,
}: Props): JSX.Element => {
    if (!value) return <span>-</span>;

    return (
        <TableTag
            text={value}
            theme={tagDetails[value].theme}
            icon={tagDetails[value].icon}
        />
    );
};
