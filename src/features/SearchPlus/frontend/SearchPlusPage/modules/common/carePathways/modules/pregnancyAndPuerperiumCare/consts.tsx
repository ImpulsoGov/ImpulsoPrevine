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
            const [appointments] = param as [number];
            const { status } =
                goodPractices.appointmentsUntil12thWeekResult(appointments);
            return (
                <goodPractices.AppointmentsUntil12thWeekTag content={status} />
            );
        },
    },
];
