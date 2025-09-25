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
import { microAreaFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/MicroAreaFormatter";
import { phoneNumberFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/PhoneNumberFormatter";
import { RenderPatientNameCpfCns } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderPatientNameCpfCns";
import { RenderStatusByQuarterTag } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderStatusByQuarterTag";
import { goodPracticesSumFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/GoodPracticesSumFormatter";
import { CellWithDivider } from "../../../common/CellWithDivider";
import { HeaderWithTooltip } from "@/features/acf/frontend/common/HeaderWithTooltip";

export const coeqColumnsAlpha: Array<GridColDef> = [
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
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        headerName: "Microárea",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <span>{microAreaFormatter(value)}</span>
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
            <span>{phoneNumberFormatter(value)}</span>
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

export const coeqColumnsBeta: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderCell: RenderPatientNameCpfCns,
        cellClassName: "breakable-content",
    },
    {
        field: "goodPracticesSum",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Soma boas <br />
                práticas*
            </span>
        ),
        width: 145,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        cellClassName: "breakable-content",
        renderCell: (
            params: GridRenderCellParams<HypertensionAcfItem, number>
        ) =>
            goodPracticesSumFormatter(
                params.row.medicalRecordUpdated,
                params.value as number
            ),
    },
    {
        field: "patientAge",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Idade <br />
                (anos)
            </span>
        ),
        width: 103,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<HypertensionAcfItem, string>) => (
            <CellWithDivider>
                <span>{value}</span>
            </CellWithDivider>
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
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
            </span>
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
            <span className="MuiDataGrid-columnHeaderTitle">
                Data do último
            </span>
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
        field: "microAreaName",
        width: 150,
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
        width: 150,
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

const tooltipContentByGroupId = {
    "#01": (
        <div>
            Aqui estão apenas cidadãos com FCI e que possuem diagnóstico
            clínico.
            <br />
            <br />A soma das boas práticas é a estimativa da pontuação de
            cidadãos. Cada prática marcada como “em dia” soma 25 pontos, podendo
            chegar a até 100 no total.
        </div>
    ),
    "#02": (
        <div>
            Ter realizado pelo menos 01 consulta presencial ou remota por
            profissional médica(o) ou enfermeira(o), nos últimos 6 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>25 pontos</span>.
        </div>
    ),
    "#03": (
        <div>
            Ter pelo menos 01 registro de aferição da pressão arterial,
            realizado nos últimos 6 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>25 pontos</span>.
        </div>
    ),
    "#04": (
        <div>
            Ter pelo menos 2 visitas domiciliares nos últimos 12 meses, feitas
            por ACS ou TACS, com intervalo mínimo de 30 dias entre elas. Só
            contam as visitas registradas como acompanhamento de pessoa com
            hipertensão.
            <br />
            <span style={{ color: "#FFFACF" }}>25 pontos</span>.
        </div>
    ),
    "#05": (
        <div>
            Ter realizado pelo menos 01 (um) registro de peso e altura, nos
            últimos 12 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>25 pontos</span>.
        </div>
    ),
};

export const columnGroupingModel: GridColumnGroupingModel = [
    {
        groupId: "#01",
        headerName: "Informações gerais",
        children: [
            { field: "patientName" },
            { field: "goodPracticesSum" },
            { field: "patientAge" },
        ],
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            const groupId =
                params.groupId as keyof typeof tooltipContentByGroupId;
            if (params.groupId)
                return (
                    <HeaderWithTooltip
                        headerName={params.headerName ?? ""}
                        tooltipContent={tooltipContentByGroupId[groupId]}
                    />
                );
        },
    },
    {
        groupId: "#02",
        headerName: "Consulta",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            const groupId =
                params.groupId as keyof typeof tooltipContentByGroupId;
            if (params.groupId)
                return (
                    <HeaderWithTooltip
                        headerName={params.headerName ?? ""}
                        tooltipContent={tooltipContentByGroupId[groupId]}
                    />
                );
        },

        children: [
            { field: "latestAppointmentDate" },
            { field: "appointmentStatusByQuarter" },
        ],
    },
    {
        groupId: "#03",
        headerName: "Aferição de Pressão Arterial (PA)",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            const groupId =
                params.groupId as keyof typeof tooltipContentByGroupId;
            if (params.groupId)
                return (
                    <HeaderWithTooltip
                        headerName={params.headerName ?? ""}
                        tooltipContent={tooltipContentByGroupId[groupId]}
                    />
                );
        },

        children: [
            { field: "latestExamRequestDate" },
            { field: "latestExamRequestStatusByQuarter" },
        ],
    },
    {
        groupId: "#04",
        headerName: "Visita domiciliar",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            const groupId =
                params.groupId as keyof typeof tooltipContentByGroupId;
            if (params.groupId)
                return (
                    <HeaderWithTooltip
                        headerName={params.headerName ?? ""}
                        tooltipContent={tooltipContentByGroupId[groupId]}
                    />
                );
        },

        children: [
            { field: "latestHomeVisitDate" },
            { field: "homeVisitStatusByQuarter" },
        ],
    },
    {
        groupId: "#05",
        headerName: "Registro de peso e altura",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            const groupId =
                params.groupId as keyof typeof tooltipContentByGroupId;
            if (params.groupId)
                return (
                    <HeaderWithTooltip
                        headerName={params.headerName ?? ""}
                        tooltipContent={tooltipContentByGroupId[groupId]}
                    />
                );
        },

        children: [
            { field: "latestWeightHeightDate" },
            { field: "weightHeightStatusByQuarter" },
        ],
    },
    {
        groupId: "#06",
        headerName: "Informações complementares",
        headerClassName: "UpperHeader",
        renderHeaderGroup: (
            params: GridColumnGroupHeaderParams
        ): React.ReactNode => {
            return <div style={{ width: "100%" }}>{params.headerName}</div>;
        },

        children: [{ field: "microAreaName" }, { field: "patientPhoneNumber" }],
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
            value: "a boa prática foi realizada no prazo e seguirá válida até o final do quadrimestre.",
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
            *Cidadãos que a FCI está ou estará desatualizada até o fim do
            quadrimestre. Cadastro completará dois anos (24 meses) desde última
            atualização.
        </i>
    ),
    items: [],
};
