import {
    iconDetailsMap,
    TableTag,
} from "@/features/acf/frontend/common/TableTag";
import React from "react";

export const RenderStatusTagCell: React.FC<{ value: string }> = ({ value }) => {
    const theme = value === "Em dia" ? "success" : "warning";
    return <TableTag theme={theme} text={value} icon={iconDetailsMap[theme]} />;
};
