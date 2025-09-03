import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal/model";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print/modules/PrintTable/model";
import type { CoapsAppliedFilters } from "@/features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/ListCoaps";
import { formatDate, parseDate } from "@/features/common/shared/time";
import React from "react";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";

export const apsLabelsModal: ModalLabels = {
    title: "IMPRESSÃO POR EQUIPES",
    primaryCustomOption: {
        title: "Deseja imprimir as listas divididas por Equipes?",
        description:
            "Essa impressão agrupa os cidadãos de acordo com as Equipes correspondentes. Qualquer filtro ou ordenação selecionados anteriormente serão mantidos e aplicados dentro desses grupos.",
        splitTeam: "Sim, dividir listas por equipes.",
        noSplit: "Não, imprimir a lista como ela está.",
    },
    secondaryCustomOption: {
        title: "Outras opções de impressão por equipes:",
        recommendation:
            "Ideal para distribuir listas para coordenadoras de equipe",
        splitGroupPerPage: "Também dividir equipes em folhas separadas",
        ordering: "Também ordenar listas por profissional responsável",
    },
    button: "IMPRIMIR LISTA",
};

export const printListProps: PrintListProps<
    HypertensionAcfItem,
    CoapsAppliedFilters
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
        careTeamName: "Equipe",
        latestExamRequestStatusByQuarter: "Afericão de PA",
        microAreaName: "Microárea",
        patientAgeRange: "Faixa Etária",
    },
    splitBy: "careTeamName",
};

export const columns: Array<ColumnsProps<HypertensionAcfItem>> = [
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
        fields: ["careTeamName", "microAreaName"],
        width: {
            landscape: 144,
            portrait: 144,
        },
        headerName: "Equipe e Microárea",
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
