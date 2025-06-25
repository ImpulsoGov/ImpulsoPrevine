import { TableTag } from "@/features/acf/frontend/common/TableTag";
import { iconDetailsMap } from "@features/acf/frontend/common/TableTag";
import React from "react";

export const RenderDateTagCell: React.FC = () => (
    <TableTag
        theme="pending"
        text="Não realizada"
        icon={iconDetailsMap.pending}
    />
);
