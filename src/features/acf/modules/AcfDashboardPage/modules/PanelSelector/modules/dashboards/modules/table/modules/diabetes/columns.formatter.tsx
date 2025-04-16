import { birthdayFormatter, formatDate } from "@/common/time";
import { renderDateTagCell } from "@/helpers/lista-nominal/renderCell";
import { iconDetailsMap } from "./iconDetailsMap";

//TODO: escrever teste unitario
export const dateRenderCell = (value: string): React.ReactNode => {
    console.log("dateRenderCell", value);

    if (!value)
        return <div data-testid="tag">{renderDateTagCell(iconDetailsMap)}</div>;
    return <div>{formatDate(new Date(value.slice(0, 10)))}</div>;
};

export const cpfFormatter = (value: string) : string => value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const cpfOrBirthdayFormatter = (value: string) : string => {
    if(value.length === 11) return cpfFormatter(value);
    if(value.length > 11) return birthdayFormatter(value);
    return value;
}