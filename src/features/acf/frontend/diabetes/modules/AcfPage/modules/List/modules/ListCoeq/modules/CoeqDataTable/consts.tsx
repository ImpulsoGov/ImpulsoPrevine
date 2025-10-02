import type {
    GridColDef,
    GridColumnGroupHeaderParams,
    GridColumnGroupingModel,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import type * as model from "@/features/acf/shared/diabetes/model";
import { HeaderWithTooltip } from "@/features/acf/frontend/common/HeaderWithTooltip";
import * as Formatters from "@/features/acf/frontend/common/Formatters";
import { TooltipContentWithStyle } from "@/features/acf/frontend/common/TooltipContentWithStyle";

export const coeqColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        minWidth: 211,
        flex: 1,
        headerAlign: "left",
        align: "left",
        renderCell: ({ row }: GridRenderCellParams<model.DiabetesAcfItem>) => (
            <Formatters.RenderPatientNameCpfCns
                name={row.patientName}
                cpf={row.patientCpf}
                cns={row.patientCns}
            />
        ),
        cellClassName: "breakable-content",
        headerClassName: "LowerHeader",
    },
    {
        field: "goodPracticesSum",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Soma boas <br />
                práticas*
            </span>
        ),
        minWidth: 145,
        flex: 0.5,
        headerAlign: "left",
        align: "left",
        cellClassName: "breakable-content",
        headerClassName: "LowerHeader",
        renderCell: ({
            row,
        }: GridRenderCellParams<
            model.DiabetesAcfItem,
            number
        >): React.ReactNode => {
            return (
                <div>
                    <Formatters.GoodPracticesSumFormatter
                        medicalRecordUpdated={row.medicalRecordUpdated}
                        goodPracticesSum={row.goodPracticesSum}
                    />
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
        minWidth: 103,
        flex: 0.4,
        headerAlign: "left",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<model.DiabetesAcfItem, string>) => (
            <Formatters.CellWithDivider>{value}</Formatters.CellWithDivider>
        ),
    },
    {
        field: "latestAppointmentDate",
        minWidth: 135,
        flex: 0.7,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: Formatters.DataGridRenderDate<model.DiabetesAcfItem>,
    },
    {
        field: "appointmentStatusByQuarter",
        minWidth: 207,
        flex: 0.7,
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
            model.DiabetesAcfItem,
            model.AppointmentStatusByQuarterText
        >) => (
            <Formatters.CellWithDivider>
                <Formatters.RenderStatusByQuarterTag value={value} />
            </Formatters.CellWithDivider>
        ),
    },
    {
        field: "latestBloodPressureExamRequestDate",
        minWidth: 156,
        flex: 0.7,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: Formatters.DataGridRenderDate<model.DiabetesAcfItem>,
    },
    {
        field: "bloodPressureExamStatusByQuarter",
        minWidth: 209,
        flex: 0.7,
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
            model.DiabetesAcfItem,
            model.BloodPressureExamStatusByQuarterText
        >) => (
            <Formatters.CellWithDivider>
                <Formatters.RenderStatusByQuarterTag value={value} />
            </Formatters.CellWithDivider>
        ),
    },
    {
        field: "latestGlycatedHemoglobinExamRequestDate",
        minWidth: 156,
        flex: 0.7,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: Formatters.DataGridRenderDate<model.DiabetesAcfItem>,
    },
    {
        field: "glycatedHemoglobinExamStatusByQuarter",
        minWidth: 209,
        flex: 0.7,
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
            model.DiabetesAcfItem,
            model.GlycatedHemoglobinExamStatusByQuarterText
        >) => (
            <Formatters.CellWithDivider>
                <Formatters.RenderStatusByQuarterTag value={value} />
            </Formatters.CellWithDivider>
        ),
    },
    {
        field: "latestWeightHeightDate",
        minWidth: 156,
        flex: 0.7,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data último</span>
        ),
        renderCell: Formatters.DataGridRenderDate<model.DiabetesAcfItem>,
    },
    {
        field: "weightHeightStatusByQuarter",
        minWidth: 209,
        flex: 0.7,
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
            model.DiabetesAcfItem,
            model.WeightHeightStatusByQuarterText
        >) => (
            <Formatters.CellWithDivider>
                <Formatters.RenderStatusByQuarterTag value={value} />
            </Formatters.CellWithDivider>
        ),
    },
    {
        field: "latestHomeVisitDate",
        minWidth: 156,
        flex: 0.7,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: Formatters.DataGridRenderDate<model.DiabetesAcfItem>,
    },
    {
        field: "homeVisitStatusByQuarter",
        minWidth: 209,
        flex: 0.7,
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
            model.DiabetesAcfItem,
            model.HomeVisitStatusByQuarterText
        >) => (
            <Formatters.CellWithDivider>
                <Formatters.RenderStatusByQuarterTag value={value} />
            </Formatters.CellWithDivider>
        ),
    },
    {
        field: "latestFeetExamRequestDate",
        minWidth: 156,
        flex: 0.7,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">Data última</span>
        ),
        renderCell: Formatters.DataGridRenderDate<model.DiabetesAcfItem>,
    },
    {
        field: "feetExamStatusByQuarter",
        minWidth: 209,
        flex: 0.7,
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
            model.DiabetesAcfItem,
            model.FeetExamStatusByQuarterText
        >) => (
            <Formatters.CellWithDivider>
                <Formatters.RenderStatusByQuarterTag value={value} />
            </Formatters.CellWithDivider>
        ),
    },
    {
        field: "microAreaName",
        minWidth: 144,
        flex: 0.5,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        headerName: "Microárea",
        renderCell: ({
            value,
        }: GridRenderCellParams<
            model.DiabetesAcfItem,
            model.DiabetesAcfItem["microAreaName"]
        >) => <span> {Formatters.microAreaFormatter(value)}</span>,
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        minWidth: 145,
        flex: 0.5,
        headerAlign: "left",
        headerClassName: "LowerHeader",
        align: "left",
        renderCell: ({
            value,
        }: GridRenderCellParams<
            model.DiabetesAcfItem,
            model.DiabetesAcfItem["patientPhoneNumber"]
        >) => <span> {Formatters.phoneNumberFormatter(value)}</span>,
    },
];

const tooltipContentByGroupId = {
    "#01": (
        <TooltipContentWithStyle>
            Aqui estão apenas cidadãos com FCI e que possuem diagnóstico
            clínico.
            <br />
            <br />A soma das boas práticas é a estimativa da pontuação de
            cidadãos. Cada prática marcada como “em dia” soma 25 pontos, podendo
            chegar a até 100 no total.
        </TooltipContentWithStyle>
    ),
    "#02": (
        <TooltipContentWithStyle>
            Ter realizado pelo menos 01 consulta presencial ou remota por
            profissional médica(o) ou enfermeira(o), nos últimos 6 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>20 pontos</span>.
        </TooltipContentWithStyle>
    ),
    "#03": (
        <TooltipContentWithStyle>
            Ter pelo menos 01 registro de aferição da pressão arterial,
            realizado nos últimos 6 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>15 pontos</span>.
        </TooltipContentWithStyle>
    ),
    "#04": (
        <TooltipContentWithStyle>
            Ter pelo menos 01 registro de hemoglobina glicada, solicitada ou
            avaliada, nos últimos 6 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>15 pontos</span>.
        </TooltipContentWithStyle>
    ),
    "#05": (
        <TooltipContentWithStyle>
            Ter realizado pelo menos 01 (um) registro de peso e altura, nos
            últimos 12 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>15 pontos</span>.
        </TooltipContentWithStyle>
    ),
    "#06": (
        <TooltipContentWithStyle>
            Ter pelo menos 2 visitas domiciliares nos últimos 12 meses, feitas
            por ACS ou TACS, com intervalo mínimo de 30 dias entre elas. Só
            contam as visitas registradas como acompanhamento de pessoa com
            hipertensão.
            <br />
            <span style={{ color: "#FFFACF" }}>20 pontos</span>.
        </TooltipContentWithStyle>
    ),
    "#07": (
        <TooltipContentWithStyle>
            Ter realizado pelo menos 01 (um) registro de avaliação dos pés,
            realizado nos últimos 12 meses.
            <br />
            <span style={{ color: "#FFFACF" }}>15 pontos</span>.
        </TooltipContentWithStyle>
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
            { field: "latestBloodPressureExamRequestDate" },
            { field: "bloodPressureExamStatusByQuarter" },
        ],
    },
    {
        groupId: "#04",
        headerName: "Aferição de hemoglobina glicada",
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
            { field: "latestGlycatedHemoglobinExamRequestDate" },
            { field: "glycatedHemoglobinExamStatusByQuarter" },
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
        groupId: "#07",
        headerName: "Registro de avaliação dos pés",
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
            { field: "latestFeetExamRequestDate" },
            { field: "feetExamStatusByQuarter" },
        ],
    },
    {
        groupId: "#08",
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
    "& .LowerHeader[aria-colindex='3'],& .LowerHeader[aria-colindex='5'],& .LowerHeader[aria-colindex='7'],& .LowerHeader[aria-colindex='9'],& .LowerHeader[aria-colindex='11'],& .LowerHeader[aria-colindex='13'],& .LowerHeader[aria-colindex='15']":
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
