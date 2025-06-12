import { TableTag } from "@/features/acf/common/frontend/TableTag";
import React from "react";
import { iconDetailsMap } from "../consts";

export const RenderStatusTagCell: React.FC<{ value: string }> = ({ value }) => {
    const theme = value === "Em dia" ? "success" : "warning";
    return <TableTag theme={theme} text={value} icon={iconDetailsMap[theme]} />;
};
