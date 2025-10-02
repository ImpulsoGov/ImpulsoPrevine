import type { ModalLabels } from "@/features/acf/frontend/common/PrintModal/model";
import type {
    ColumnsProps,
    PrintListProps,
} from "@/features/acf/frontend/common/Print/modules/PrintTable/model";
import type { DiabetesAcfItem } from "@/features/acf/shared/diabetes/model";
import type { CoeqAppliedFilters } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/List/modules/ListCoeq";
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
    DiabetesAcfItem,
    CoeqAppliedFilters
> = {
    listTitle: "LISTA NOMINAL CUIDADO DA PESSOA COM DIABETES",
    printCaption: [
        <div>
            <b>PA:</b> Pressão Arterial
        </div>,
        <div>
            <b>HbA1c:</b> Hemoglobina Glicada
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

export const coeqColumns: Array<ColumnsProps<DiabetesAcfItem>> = [
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
        headerName: "HbA1c: Data e situação",
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
        fields: ["microAreaName"],
        width: {
            landscape: 144,
            portrait: 144,
        },
        renderHeader: () => (
            <div style={{ whiteSpace: "pre-line", paddingLeft: "6px" }}>
                {"Microárea"}
            </div>
        ),

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
