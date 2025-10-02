import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print";
import type { CoapsAppliedFilters } from "../CoapsDataTable";
import React from "react";
import type { DiabetesAcfItem } from "@/features/acf/shared/diabetes/model";
import type { StatusByQuarter } from "@/features/acf/frontend/common/Print";
import * as Formatters from "@features/acf/frontend/common/Formatters";
import { RenderStatusByQuarterTag } from "@features/acf/frontend/common/Print";

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
    DiabetesAcfItem,
    CoapsAppliedFilters
> = {
    listTitle: "LISTA NOMINAL CUIDADO DA PESSOA COM DIABETES",
    printCaption: [
        <div>
            <b>PA:</b> Pressão Arterial
        </div>,
        <div>
            <b>HG:</b> Hemoglobina Glicada
        </div>,

        <div>
            *Cidadãos que a FCI está ou estará desatualizada até o fim do
            quadrimestre. Cadastro completará dois anos (24 meses) desde última
            atualização.
        </div>,
    ],
    filtersLabels: {
        careTeamName: "Equipe",
        microAreaName: "Microárea",
        patientAgeRange: "Faixa Etária",
        goodPracticesStatusByQuarter: "Situação Boas Práticas",
        medicalRecordUpdated: "Situação Cadastral FCI",
    },
    splitBy: "careTeamName",
    orderBy: "microAreaName",
    propTriggerPrintWithoutModal: "careTeamName",
};

export const columns: Array<ColumnsProps<DiabetesAcfItem>> = [
    {
        fields: ["patientName", "patientCpf", "patientCns"],
        headerName: "Nome e CPF/CNS",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [name, cpf, cns] = param as [string, string, string];
            return (
                <Formatters.RenderPatientNameCpfCns
                    name={name}
                    cpf={cpf}
                    cns={cns}
                />
            );
        },
    },
    {
        fields: ["goodPracticesSum", "medicalRecordUpdated"],
        headerName: "Soma Boas Práticas",
        width: {
            landscape: 40,
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
                        <Formatters.GoodPracticesSumFormatter
                            medicalRecordUpdated={medicalRecordUpdated}
                            goodPracticesSum={goodPracticesSum}
                        />
                    </div>
                </>
            );
        },
    },
    {
        fields: ["latestAppointmentDate", "appointmentStatusByQuarter"],
        width: {
            landscape: 156,
            portrait: 110,
        },
        renderHeader: () => (
            <div style={{ whiteSpace: "pre-line", paddingLeft: "6px" }}>
                {"Consulta: \nData e situação"}
            </div>
        ),
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <div style={{ paddingLeft: "7px" }}>
                    {<Formatters.RenderDate value={date} />}
                    <div>
                        <RenderStatusByQuarterTag value={status} />
                    </div>
                </div>
            );
        },
    },
    {
        fields: [
            "latestBloodPressureExamRequestDate",
            "bloodPressureExamStatusByQuarter",
        ],
        width: {
            landscape: 156,
            portrait: 110,
        },
        headerName: "Aferição de PA: Data e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    {<Formatters.RenderDate value={date} />}
                    <div>
                        <RenderStatusByQuarterTag value={status} />
                    </div>
                </>
            );
        },
    },
    {
        fields: [
            "latestGlycatedHemoglobinExamRequestDate",
            "glycatedHemoglobinExamStatusByQuarter",
        ],
        width: {
            landscape: 156,
            portrait: 110,
        },
        headerName: "Aferição de HG: Data e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    {<Formatters.RenderDate value={date} />}
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
            landscape: 156,
            portrait: 110,
        },
        headerName: "Visitas Domiciliares: \nData e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    {<Formatters.RenderDate value={date} />}
                    <div>
                        <RenderStatusByQuarterTag value={status} />
                    </div>
                </>
            );
        },
    },
    {
        fields: ["latestWeightHeightDate", "weightHeightStatusByQuarter"],
        headerName: "Peso e altura: \nData e situação",
        width: {
            landscape: 156,
            portrait: 110,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    {<Formatters.RenderDate value={date} />}
                    <div>
                        <RenderStatusByQuarterTag value={status} />
                    </div>
                </>
            );
        },
    },
    {
        fields: ["latestFeetExamRequestDate", "feetExamStatusByQuarter"],
        width: {
            landscape: 156,
            portrait: 110,
        },
        verticalDivider: true,
        headerName: "Exame pés: \nData e situação",
        renderCell: (param: unknown): React.ReactNode => {
            const [date, status] = param as [string, StatusByQuarter];
            return (
                <>
                    {<Formatters.RenderDate value={date} />}
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
        renderHeader: () => (
            <div style={{ whiteSpace: "pre-line", paddingLeft: "6px" }}>
                {"Equipe e \nMicroárea"}
            </div>
        ),

        renderCell: (param: unknown): React.ReactNode => {
            const [careTeamName, microAreaName] = param as [string, string];
            return (
                <div style={{ paddingLeft: "7px" }}>
                    <div>{Formatters.teamNameFormatter(careTeamName)}</div>
                    <div>{Formatters.microAreaFormatter(microAreaName)}</div>
                </div>
            );
        },
    },
    {
        fields: ["patientPhoneNumber", "patientAge"],
        headerName: "Telefone e Idade",
        width: {
            landscape: 125,
            portrait: 160,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [patientPhoneNumber, patientAge] = param as [string, string];
            return (
                <>
                    <div>
                        {Formatters.phoneNumberFormatter(patientPhoneNumber)}
                    </div>
                    <div>{patientAge} anos</div>
                </>
            );
        },
    },
];
