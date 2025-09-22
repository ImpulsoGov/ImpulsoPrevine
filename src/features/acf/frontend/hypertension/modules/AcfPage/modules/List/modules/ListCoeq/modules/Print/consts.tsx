import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal/model";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print/modules/PrintTable/model";
import { formatDate, parseDate } from "@/features/common/shared/time";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { CoeqAppliedFilters } from "@/features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/ListCoeq";
import { microAreaFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/MicroAreaFormatter";
import { cnsFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderPatientNameCpfCns";
import type { StatusByQuarter } from "@/features/acf/frontend/common/Print";
import { RenderStatusByQuarterTag } from "@/features/acf/frontend/common/Print";
import { phoneNumberFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/PhoneNumberFormatter";
import { cpfFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderPatientNameCpfCns";

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
        goodPracticesStatusByQuarter: "Situação Boas Práticas",
        medicalRecordUpdated: "Situação Cadastral FCI",
    },
    splitBy: "microAreaName",
    propTriggerPrintWithoutModal: "microAreaName",
};

export const coeqColumns: Array<ColumnsProps<HypertensionAcfItem>> = [
    {
        fields: ["patientName", "patientCpf", "patientCns"],
        headerName: "Nome e CPF/CNS",
        width: {
            landscape: 211,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [name, cpf, cns] = param as [string, string, string];
            return (
                <>
                    <div>{name}</div>
                    <div>{cpfFormatter(cpf) || cnsFormatter(cns)}</div>
                </>
            );
        },
    },
    {
        fields: ["latestAppointmentDate", "appointmentStatusByQuarter"],
        width: {
            landscape: 135,
            portrait: 135,
        },
        headerName: "Consulta: \nData e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    <div>{formatDate(parseDate(date))}</div>
                    <div>
                        <RenderStatusByQuarterTag value={status} />
                    </div>
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
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    <div>{formatDate(parseDate(date))}</div>
                    <div>
                        <RenderStatusByQuarterTag value={status} />
                    </div>
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
        renderCell: (param: unknown): React.ReactNode => {
            const [microAreaName] = param as [string, string];
            return (
                <>
                    <div>{microAreaFormatter(microAreaName)}</div>
                </>
            );
        },
    },
    {
        fields: ["patientPhoneNumber", "patientAge"],
        headerName: "Telefone e Idade",
        width: {
            landscape: 145,
            portrait: 145,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [patientPhoneNumber, patientAge] = param as [string, string];
            return (
                <>
                    <div>{phoneNumberFormatter(patientPhoneNumber)}</div>
                    <div>{patientAge} anos</div>
                </>
            );
        },
    },
];
