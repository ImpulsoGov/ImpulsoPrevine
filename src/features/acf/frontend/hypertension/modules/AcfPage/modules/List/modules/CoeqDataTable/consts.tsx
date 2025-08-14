import type { GridColDef } from "@mui/x-data-grid";
import { RenderPatientNameCpfCns } from "../common/RenderPatientNameCpfCns";
import { RenderDate } from "../common/RenderDate/RenderDate";
// TODO: mover esses formatters pra fora do módulo de RenderPatientNameCpfCns
import { microAreaFormatter } from "../common/RenderPatientNameCpfCns/modules/Formatters/MicroAreaFormatter/microAreaFormatter";
import { numberFormatter } from "../common/RenderPatientNameCpfCns/modules/Formatters/NumberFormatter/numberFormatter";

export const coeqColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        renderCell: RenderPatientNameCpfCns,
    },
    {
        field: "latestAppointmentDate",
        width: 135,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data última <br />
                consulta
            </span>
        ),
        renderCell: RenderDate,
    },
    {
        field: "appointmentStatusByQuarter",
        width: 207,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que renderiza tags
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação consulta <br />
                no quadrimestre
            </span>
        ),
    },
    {
        field: "latestExamRequestDate",
        width: 135,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
                <br />
                aferição de PA
            </span>
        ),
        renderCell: RenderDate,
    },
    {
        field: "latestExamRequestStatusByQuarter",
        width: 209,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que renderiza tags
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação aferição de
                <br />
                PA no quadrimestre
            </span>
        ),
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Microárea",
        valueFormatter: ({ value }): string => {
            return microAreaFormatter(value);
        },
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 136,
        headerAlign: "left",
        align: "left",
        valueFormatter: ({ value }): string => {
            return numberFormatter(value);
        },
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 103,
        headerAlign: "left",
        align: "left",
    },
];
