import { formatDate } from "@/common/time";
import { renderDateTagCell } from "@/helpers/lista-nominal/renderCell";
import { iconDetailsMap } from "./iconDetailsMap";

//TODO: escrever teste unitario
export const dateRenderCell = (value: string | null): React.ReactNode => {
    if (!value)
        return <div data-testid="tag">{renderDateTagCell(iconDetailsMap)}</div>;
    return <div>{formatDate(new Date(value.slice(0, 10)))}</div>;
}
