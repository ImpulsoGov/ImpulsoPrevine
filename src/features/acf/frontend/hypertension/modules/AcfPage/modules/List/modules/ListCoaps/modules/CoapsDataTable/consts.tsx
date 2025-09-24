import type {
    GridColDef,
    GridColumnGroupHeaderParams,
    GridColumnGroupingModel,
    GridRenderCellParams,
} from "@mui/x-data-grid";
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
import { goodPracticesSumFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/GoodPracticesSumFormatter";
import { Icon } from "@impulsogov/design-system/dist/atoms/Icon";
import { CellWithDivider } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/CellWithDivider";

export const coapsColumnsAlpha: Array<GridColDef> = [
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

export const coapsColumnsBeta: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        renderCell: RenderPatientNameCpfCns,
        cellClassName: "breakable-content",
        headerClassName: "LowerHeader",
    },
    {
        field: "goodPracticesSum",
        headerName: "Soma boas práticas*",
        width: 145,
        headerAlign: "left",
        align: "left",
        cellClassName: "breakable-content",
        headerClassName: "LowerHeader",
        renderCell: ({
            row,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            number
        >): React.ReactNode => {
            return (
                <div>
                    {goodPracticesSumFormatter(
                        row.medicalRecordUpdated,
                        row.goodPracticesSum
                    )}
                </div>
            );
        },
    },
    {
        field: "patientAge",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Idade <br />
                (anos)
            </span>
        ),
        headerClassName: "LowerHeader",
        width: 103,
        headerAlign: "left",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <CellWithDivider>{value}</CellWithDivider>
        ),
    },
    {
        field: "latestAppointmentDate",
        width: 135,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: DataGridRenderDate<HypertensionAcfItem>,
    },
    {
        field: "appointmentStatusByQuarter",
        width: 207,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação no <br />
                quadrimestre
            </span>
        ),
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            AppointmentStatusByQuarterText
        >) => (
            <CellWithDivider>
                <RenderStatusByQuarterTag value={value} />
            </CellWithDivider>
        ),
    },
    {
        field: "latestExamRequestDate",
        width: 156,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: DataGridRenderDate<HypertensionAcfItem>,
    },
    {
        field: "latestExamRequestStatusByQuarter",
        width: 209,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação no <br />
                quadrimestre
            </span>
        ),
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            LatestExamRequestStatusByQuarterText
        >) => (
            <CellWithDivider>
                <RenderStatusByQuarterTag value={value} />
            </CellWithDivider>
        ),
    },
    {
        field: "latestHomeVisitDate",
        width: 156,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: DataGridRenderDate<HypertensionAcfItem>,
    },
    {
        field: "homeVisitStatusByQuarter",
        width: 209,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação no <br />
                quadrimestre
            </span>
        ),
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            LatestExamRequestStatusByQuarterText
        >) => (
            <CellWithDivider>
                <RenderStatusByQuarterTag value={value} />
            </CellWithDivider>
        ),
    },
    {
        field: "latestWeightHeightDate",
        width: 156,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data último</span>
        ),
        renderCell: DataGridRenderDate<HypertensionAcfItem>,
    },
    {
        field: "weightHeightStatusByQuarter",
        width: 209,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação no <br />
                quadrimestre
            </span>
        ),
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            LatestExamRequestStatusByQuarterText
        >) => (
            <CellWithDivider>
                <RenderStatusByQuarterTag value={value} />
            </CellWithDivider>
        ),
    },
    {
        field: "careTeamName",
        width: 150,
        headerAlign: "left",
        headerClassName: "LowerHeader",
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
        headerClassName: "LowerHeader",
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
        headerClassName: "LowerHeader",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <span> {phoneNumberFormatter(value)}</span>
        ),
    },
];

export const columnGroupingModel: GridColumnGroupingModel = [
    {
        groupId: "Informações gerais",
        headerName: "Informações gerais",
        children: [
            { field: "patientName" },
            { field: "goodPracticesSum" },
            { field: "patientAge" },
        ],
        headerClassName: "UpperHeader",
        // TODO: mover para um componente
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return (
                <div style={{ width: "100%" }}>
                    {params.headerName}
                    <Icon
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                        style={{
                            marginLeft: 4,
                            verticalAlign: "middle",
                            marginTop: -2,
                        }}
                    />
                </div>
            );
        },
    },
    {
        groupId: "Consulta",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return (
                <div style={{ width: "100%" }}>
                    {params.headerName}
                    <Icon
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                        style={{
                            marginLeft: 4,
                            verticalAlign: "middle",
                            marginTop: -2,
                        }}
                    />
                </div>
            );
        },

        children: [
            { field: "latestAppointmentDate" },
            { field: "appointmentStatusByQuarter" },
        ],
    },
    {
        groupId: "Aferição de Pressão Arterial (PA)",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return (
                <div style={{ width: "100%" }}>
                    {params.headerName}
                    <Icon
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                        style={{
                            marginLeft: 4,
                            verticalAlign: "middle",
                            marginTop: -2,
                        }}
                    />
                </div>
            );
        },

        children: [
            { field: "latestExamRequestDate" },
            { field: "latestExamRequestStatusByQuarter" },
        ],
    },
    {
        groupId: "Visita domiciliar",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return (
                <div style={{ width: "100%" }}>
                    {params.headerName}
                    <Icon
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                        style={{
                            marginLeft: 4,
                            verticalAlign: "middle",
                            marginTop: -2,
                        }}
                    />
                </div>
            );
        },

        children: [
            { field: "latestHomeVisitDate" },
            { field: "homeVisitStatusByQuarter" },
        ],
    },
    {
        groupId: "Registro de peso e altura",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return (
                <div style={{ width: "100%" }}>
                    {params.headerName}
                    <Icon
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                        style={{
                            marginLeft: 4,
                            verticalAlign: "middle",
                            marginTop: -2,
                        }}
                    />
                </div>
            );
        },

        children: [
            { field: "latestWeightHeightDate" },
            { field: "weightHeightStatusByQuarter" },
        ],
    },
    {
        groupId: "Informações complementares",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return (
                <div style={{ width: "100%" }}>
                    {params.headerName}
                    <Icon
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                        style={{
                            marginLeft: 4,
                            verticalAlign: "middle",
                            marginTop: -2,
                        }}
                    />
                </div>
            );
        },

        children: [
            { field: "careTeamName" },
            { field: "microAreaName" },
            { field: "patientPhoneNumber" },
        ],
    },
];

export const customSx = {
    "& .LowerHeader[aria-colindex='3'],& .LowerHeader[aria-colindex='5'],& .LowerHeader[aria-colindex='7'],& .LowerHeader[aria-colindex='9'],& .LowerHeader[aria-colindex='11']":
        {
            borderRight: "1px solid #ACACAC",
        },
};

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

export const fciCaptionData = {
    title: (
        <i
            style={{
                fontWeight: 400,
            }}
        >
            *Cidadãos com FCI desatualizada. Cadastro não atualizado nos últimos
            dois anos (24 meses).
        </i>
    ),
    items: [],
};
