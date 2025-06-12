import { TableTag } from "@/features/acf/common/frontend/TableTag";
import React from "react";
import { iconDetailsMap } from "../consts";

export const RenderDateTagCell: React.FC = () => (
    <TableTag
        theme="pending"
        text="Não realizada"
        icon={iconDetailsMap.pending}
    />
);
