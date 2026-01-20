//TODO: Jogar estes tipos pra um módulo separado ao invés de importar de ResultContent
import type { ColumnsProps } from "../../model";
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
            const [appointments] = param as [0 | 1];
            return (
                <goodPractices.AppointmentsUntil12thWeekTag
                    content={appointments}
                />
            );
        },
    },
];
