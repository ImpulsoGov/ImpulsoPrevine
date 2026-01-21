import type { ColumnsProps } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/model";
import * as goodPractices from "./modules/goodPractices";

export const pregnancyAndPuerperiumCareColumns: Array<ColumnsProps> = [
    {
        fields: ["appointmentsUntil12thWeek"],
        headerName: "Consultas até a 12ª semana",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            // TODO: o tipo aqui deveria ser number (tipo da saída do adapter)
            const [appointments] = param as [0 | 1];
            // TODO: usar AppointmentsUntil12thWeekResult para computar o status da boa prática antes de passar para a tag
            return (
                <goodPractices.AppointmentsUntil12thWeekTag
                    content={appointments}
                />
            );
        },
    },
];
