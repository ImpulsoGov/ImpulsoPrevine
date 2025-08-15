import type { GridColDef } from "@mui/x-data-grid";
import { RenderPatientNameCpfCns } from "../common/RenderPatientNameCpfCns";
import { RenderDate } from "@/features/acf/frontend/common/RenderDate";
import { microAreaFormatter } from "../common/MicroAreaFormatter";
import { phoneNumberFormatter } from "../common/PhoneNumberFormatter";
import { nameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";

export const coapsColumns: Array<GridColDef> = [
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
        renderCell: RenderDate<HypertensionAcfItem>,
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
                em Q2
            </span>
        ),
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
        renderCell: RenderDate<HypertensionAcfItem>,
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
                PA em Q2
            </span>
        ),
    },
    {
        field: "careTeamName",
        width: 134,
        headerAlign: "left",
        align: "left",
        headerName: "Equipe",
        valueFormatter: ({ value }): string => {
            return nameFormatter(value);
        },
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        headerName: "Microárea",
        valueFormatter: ({ value }): string => {
            return microAreaFormatter(value);
        },
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 145,
        headerAlign: "left",
        align: "left",
        valueFormatter: ({ value }): string => {
            return phoneNumberFormatter(value);
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
