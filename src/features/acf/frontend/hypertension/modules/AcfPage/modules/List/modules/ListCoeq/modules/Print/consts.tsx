import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal/model";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print/modules/PrintTable/model";
import { formatDate, parseDate } from "@/features/common/shared/time";

export const coeqLabelsModal: ModalLabels = {
    title: "IMPRESSÃO POR PROFISSIONAL RESPONSÁVEL",
    primaryCustomOption: {
        title: "Deseja imprimir as listas divididas por profissional responsável?",
        description:
            "Essa impressão agrupa os cidadãos de acordo com os profissionais responsáveis correspondentes. Qualquer filtro ou ordenação selecionados anteriormente serão mantidos e aplicados dentro desses grupos.",
        splitTeam: "Sim, dividir listas por profissional responsável.",
        noSplit: "Não, imprimir a lista como ela está.",
    },
    secondaryCustomOption: {
        title: "Outras opções de impressão por profissional responsável:",
        recommendation:
            "Ideal para distribuir listas para agentes comunitários de saúde",
        splitGroupPerPage:
            "Também dividir a lista impressa com um profissional responsável por folha",
    },
    button: "IMPRIMIR LISTA",
};

export const printListProps: PrintListProps = {
    listTitle: "LISTA NOMINAL PESSOA COM HIPERTENSÃO",
    printCaption: [
        <div>
            <b>CPF:</b> Quando o CPF não constar no cadastro, mostraremos o CNS
            do cidadão.
        </div>,
        <div>
            <b>PA:</b> Pressão Arterial
        </div>,
    ],
    filtersLabels: {
        appointmentStatusByQuarter: "Consulta",
        careTeamName: "Equipe",
        latestExamRequestStatusByQuarter: "Afericão de PA",
        microAreaName: "Microárea",
        patientAgeRange: "Faixa Etária",
    },
    propPrintGrouping: "microAreaName",
};

export const coeqColumns: Array<ColumnsProps> = [
    {
        fields: ["patientName", "patientCpf", "patientCns"],
        headerName: "Nome e CPF/CNS",
        width: {
            landscape: 211,
            portrait: 135,
        },
    },
    {
        fields: ["latestAppointmentDate", "appointmentStatusByQuarter"],
        width: {
            landscape: 135,
            portrait: 135,
        },
        headerName: "Consulta: Data e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, string];
            return (
                <>
                    <div>{formatDate(parseDate(date))}</div>
                    <div>{status}</div>
                </>
            );
        },
        verticalDivider: true,
    },
    {
        fields: ["latestExamRequestDate", "latestExamRequestStatusByQuarter"],
        width: {
            landscape: 156,
            portrait: 156,
        },
        headerName: "Aferição de PA: Data e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, string];
            return (
                <>
                    <div>{formatDate(parseDate(date))}</div>
                    <div>{status}</div>
                </>
            );
        },
    },
    {
        fields: ["microAreaName"],
        width: {
            landscape: 144,
            portrait: 144,
        },
        headerName: "Microárea",
    },
    {
        fields: ["patientPhoneNumber", "patientAge"],
        headerName: "Telefone e Idade",
        width: {
            landscape: 145,
            portrait: 145,
        },
    },
];
