import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import type {
    AppointmentStatusByQuarterText,
    HypertensionAcfItem,
    LatestExamRequestStatusByQuarterText,
} from "@/features/acf/shared/hypertension/model";
import { DataGridRenderDate } from "@/features/acf/frontend/common/RenderDate";
import { teamNameFormatter } from "@/features/acf/frontend/common/NameFormatter";
import { microAreaFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/MicroAreaFormatter";
import { phoneNumberFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/PhoneNumberFormatter";
import { RenderPatientNameCpfCns } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderPatientNameCpfCns";
import { RenderStatusByQuarterTag } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderStatusByQuarterTag";

export const coapsColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        renderCell: RenderPatientNameCpfCns,
        cellClassName: "breakable-content",
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
        renderCell: DataGridRenderDate<HypertensionAcfItem>,
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
        >) => <RenderStatusByQuarterTag value={value} />,
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
        renderCell: DataGridRenderDate<HypertensionAcfItem>,
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
        >) => <RenderStatusByQuarterTag value={value} />,
    },
    {
        field: "careTeamName",
        width: 150,
        headerAlign: "left",
        align: "left",
        headerName: "Equipe",
        cellClassName: "breakable-content",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <div
                style={{
                    whiteSpace: "normal",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
            >
                {teamNameFormatter(value)}
            </div>
        ),
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        headerName: "Microárea",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <span> {microAreaFormatter(value)}</span>
        ),
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 145,
        headerAlign: "left",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <span> {phoneNumberFormatter(value)}</span>
        ),
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 103,
        headerAlign: "left",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <span>{value}</span>
        ),
    },
];

export const captionData = {
    title: "Tags de situação",
    items: [
        {
            label: "Nunca realizada",
            value: "não há nenhum registro da prática",
        },
        {
            label: "Atrasada",
            value: "o prazo para realizar a prática já venceu (por exemplo, a última consulta foi feita há mais de 6 meses).",
        },
        {
            label: "Vence dentro de Q",
            value: "prática ainda está dentro do prazo, mas o status mudará para “atrasada” até o fim do quadrimestre.",
        },
        {
            label: "Em dia",
            value: "a boa prática está válida e segue até o final do quadrimestre.",
        },
    ],
};
