import { renderDateTagCell } from "@/helpers/lista-nominal/renderCell";
import { iconDetailsMap } from "./iconDetailsMap";

export const dateFormatter = (value: string) : string | null | undefined | React.ReactNode=> {
    const date = new Date(value.slice(0, 10));
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${day}/${month}/${year.slice(-2)}`;
}

export const dateRenderCell = (value: string) : string | null | undefined | React.ReactNode => {
    if (!value) return <div data-testid="tag">{renderDateTagCell(iconDetailsMap)}</div>;
    return dateFormatter(value);
}