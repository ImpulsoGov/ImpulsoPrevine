import { formatDate } from "@/common/time";
import { RenderDateTagCell } from "@/helpers/lista-nominal/renderCell";

export const DateRenderCell = ({ value }: { value: string | null })=> {
    if (!value)
        return <div data-testid="tag">
            <RenderDateTagCell/>
        </div>;
    return <div>{formatDate(new Date(value.slice(0, 10)))}</div>;
}
