import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print";
import type { CoapsAppliedFilters } from "../CoapsDataTable";
import { formatDate, parseDate } from "@/features/common/shared/time";
import React from "react";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { StatusByQuarter } from "@/features/acf/frontend/common/Print";
import { RenderStatusByQuarterTag } from "@/features/acf/frontend/common/Print";
import { phoneNumberFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/PhoneNumberFormatter";
import {
    cpfFormatter,
    cnsFormatter,
} from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/RenderPatientNameCpfCns";
import { microAreaFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/MicroAreaFormatter";
import {
    nameFormatter,
    teamNameFormatter,
} from "@/features/acf/frontend/common/NameFormatter";
import { goodPracticesSumFormatter } from "@features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/common/GoodPracticesSumFormatter";

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
        ordering: "Também ordenar listas por microárea",
    },
    button: "IMPRIMIR LISTA",
};

export const printListProps: PrintListProps<
    HypertensionAcfItem,
    CoapsAppliedFilters
> = {
    listTitle: "LISTA NOMINAL CUIDADO DA PESSOA COM HIPERTENSÃO",
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
        goodPracticesStatusByQuarter: "Situação Boas Práticas",
        medicalRecordUpdated: "Situação Cadastral FCI",
    },
    splitBy: "careTeamName",
    orderBy: "microAreaName",
    propTriggerPrintWithoutModal: "careTeamName",
};

export const columns: Array<ColumnsProps<HypertensionAcfItem>> = [
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
                    <div>{nameFormatter(name)}</div>
                    <div>{cpfFormatter(cpf) || cnsFormatter(cns)}</div>
                </>
            );
        },
    },
    {
        fields: ["goodPracticesSum", "medicalRecordUpdated"],
        headerName: "Soma Boas Práticas",
        width: {
            landscape: 38,
            portrait: 38,
        },
        verticalDivider: true,
        renderCell: (param: unknown): React.ReactNode => {
            const [goodPracticesSum, medicalRecordUpdated] = param as [
                number,
                string,
            ];
            return (
                <>
                    <div>
                        {goodPracticesSumFormatter(
                            medicalRecordUpdated,
                            goodPracticesSum
                        )}
                    </div>
                </>
            );
        },
    },
    {
        fields: ["latestAppointmentDate", "appointmentStatusByQuarter"],
        width: {
            landscape: 135,
            portrait: 55,
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
    },
    {
        fields: ["latestExamRequestDate", "latestExamRequestStatusByQuarter"],
        width: {
            landscape: 156,
            portrait: 71,
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
        fields: ["latestHomeVisitDate", "homeVisitStatusByQuarter"],
        width: {
            landscape: 99,
            portrait: 85,
        },
        headerName: "Visitas Domiciliares: Data e situação",
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
        fields: ["latestWeightHeightDate", "weightHeightStatusByQuarter"],
        headerName: "Reg. peso e altura: Data e situação",
        width: {
            landscape: 71,
            portrait: 59,
        },
        verticalDivider: true,
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
        fields: ["careTeamName", "microAreaName"],
        width: {
            landscape: 144,
            portrait: 144,
        },
        headerName: "Equipe e \nMicroárea",
        renderCell: (param: unknown): React.ReactNode => {
            const [careTeamName, microAreaName] = param as [string, string];
            return (
                <>
                    <div>{teamNameFormatter(careTeamName)}</div>
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
