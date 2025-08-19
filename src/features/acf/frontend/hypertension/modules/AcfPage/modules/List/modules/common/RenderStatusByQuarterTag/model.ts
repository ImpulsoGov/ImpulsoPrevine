import type { TableTagProps } from "@/features/acf/frontend/common/TableTag";
import type {
    AppointmentStatusByQuarterText,
    LatestExamRequestStatusByQuarterText,
} from "@/features/acf/shared/hypertension/model";

// É melhor para a claridade do codigo que deixemos explicito o union type equivalente aos textos das duas colunas
// No futuro, se quisermos utilizar outros status para apenas uma das duas, nao sera necessario modificar aqui
export type StatusByQuarter =
    | AppointmentStatusByQuarterText
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
    | LatestExamRequestStatusByQuarterText;

export type TagDetails = Omit<TableTagProps, "text">;
