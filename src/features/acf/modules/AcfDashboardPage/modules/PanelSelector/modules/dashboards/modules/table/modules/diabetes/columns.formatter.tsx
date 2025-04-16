import { formatDate } from "@/common/time";
import { RenderDateTagCell } from "@/helpers/lista-nominal/renderCell";

export const DateRenderCell = ({ value }: { value: string | null })=> {
    if (!value)
        return <div data-testid="tag">
            <RenderDateTagCell/>
        </div>;
    if (Number.isNaN(new Date(value.slice(0, 10))).valueOf()) null;
    return <div>{formatDate(new Date(value.slice(0, 10)))}</div>;
}
