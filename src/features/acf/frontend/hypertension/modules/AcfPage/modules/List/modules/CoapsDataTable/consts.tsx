import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { RenderStatusTag } from "../common/RenderStatusTag";
import type {
    AppointmentStatusByQuarterText,
    HypertensionAcfItem,
    LatestExamRequestStatusByQuarterText,
} from "@/features/acf/shared/hypertension/model";

export const coapsColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        //TODO: Implementar funcao que une nome, cpf e cns
    },
    {
        field: "latestAppointmentDate",
        width: 131,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data última <br />
                consulta
            </span>
        ),
    },
    {
        field: "appointmentStatusByQuarter",
        width: 207,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação consulta <br />
                no quadrimestre
            </span>
        ),
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            AppointmentStatusByQuarterText
        >) => <RenderStatusTag value={value} />,
    },
    {
        field: "latestExamRequestDate",
        width: 156,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
                <br />
                aferição de PA
            </span>
        ),
    },
    {
        field: "latestExamRequestStatusByQuarter",
        width: 209,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação aferição de
                <br />
                PA no quadrimestre
            </span>
        ),
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            LatestExamRequestStatusByQuarterText
        >) => <RenderStatusTag value={value} />,
    },
    {
        field: "careTeamName",
        width: 134,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Equipe",
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Microárea",
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 136,
        headerAlign: "left",
        align: "left",
        // TODO: Implementar funcao que formata o telefone
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 103,
        headerAlign: "left",
        align: "left",
    },
] as Array<GridColDef>;
