import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal/model";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print/modules/PrintTable/model";
import { formatDate, parseDate } from "@/features/common/shared/time";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { CoeqAppliedFilters } from "@/features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/ListCoeq";
import { microAreaFormatter } from "../../../common/MicroAreaFormatter";

export const coeqLabelsModal: ModalLabels = {
    title: "IMPRESSÃO POR MICROÁREA",
    primaryCustomOption: {
        title: "Deseja imprimir as listas divididas por microárea?",
        description:
            "Essa impressão agrupa os cidadãos de acordo com as microáreas correspondentes. Qualquer filtro ou ordenação selecionados anteriormente serão mantidos e aplicados dentro desses grupos.",
        splitTeam: "Sim, dividir listas por microárea.",
        noSplit: "Não, imprimir a lista como ela está.",
    },
    secondaryCustomOption: {
        title: "Outras opções de impressão por microárea:",
        recommendation:
            "Ideal para distribuir listas para agentes comunitários de saúde",
        splitGroupPerPage:
            "Também dividir a lista impressa com uma microárea por folha",
    },
    button: "IMPRIMIR LISTA",
};

export const printListProps: PrintListProps<
    HypertensionAcfItem,
    CoeqAppliedFilters
> = {
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
        latestExamRequestStatusByQuarter: "Afericão de PA",
        microAreaName: "Microárea",
        patientAgeRange: "Faixa Etária",
    },
    splitBy: "microAreaName",
    triggerPrintWithoutModal: "microAreaName",
};

export const coeqColumns: Array<ColumnsProps<HypertensionAcfItem>> = [
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
        titleFormatter: (value: unknown): string =>
            microAreaFormatter(value as string),
        renderCell: (value: unknown): string =>
            microAreaFormatter(value as string),
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
