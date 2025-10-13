import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal/model";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print/modules/PrintTable/model";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { CoeqAppliedFilters } from "@/features/acf/frontend/hypertension/modules/AcfPage/modules/List/modules/ListCoeq";
import type { StatusByQuarter } from "@/features/acf/frontend/common/Print";

import * as Formatters from "@features/acf/frontend/common/Formatters";
import { RenderStatusByQuarterTag } from "@features/acf/frontend/common/Print";

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
    listTitle: "LISTA NOMINAL CUIDADO DA PESSOA COM HIPERTENSÃO",
    printCaption: [
        <div>
            <b>PA:</b> Pressão Arterial
        </div>,
        <div>
            *Cidadãos que a FCI está ou estará desatualizada até o fim do
            quadrimestre. Cadastro completará dois anos (24 meses) desde última
            atualização.
        </div>,
    ],
    filtersLabels: {
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
            landscape: 33,
            portrait: 33,
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
            landscape: 130,
            portrait: 106,
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
        fields: ["latestExamRequestDate", "latestExamRequestStatusByQuarter"],
        width: {
            landscape: 130,
            portrait: 106,
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
        fields: ["latestHomeVisitDate", "homeVisitStatusByQuarter"],
        width: {
            landscape: 130,
            portrait: 106,
        },
        headerName: "Visitas Domiciliares: Data e situação",
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
        headerName: "Reg. peso e altura: Data e situação",
        width: {
            landscape: 130,
            portrait: 106,
        },
        verticalDivider: true,
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
        fields: ["microAreaName"],
        width: {
            landscape: 144,
            portrait: 144,
        },
        renderHeader: () => (
            <div style={{ whiteSpace: "pre-line", paddingLeft: "6px" }}>
                Microárea
            </div>
        ),
        titleFormatter: (value: unknown): string =>
            Formatters.microAreaFormatter(value as string),
        renderCell: (param: unknown): React.ReactNode => {
            const [microAreaName] = param as [string, string];
            return (
                <div style={{ paddingLeft: "7px" }}>
                    <div>{Formatters.microAreaFormatter(microAreaName)}</div>
                </div>
            );
        },
    },
    {
        fields: ["patientPhoneNumber", "patientAge"],
        headerName: "Telefone e Idade",
        width: {
            landscape: 145,
            portrait: 120,
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
