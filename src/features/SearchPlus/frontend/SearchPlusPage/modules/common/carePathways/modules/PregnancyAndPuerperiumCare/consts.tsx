import type { ColumnsProps } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/model";
import * as goodPractices from "./modules/goodPractices";
import { Tag } from "./modules/common/Tags";
import { GestationalAgeFactory } from "./modules/common/GestationalAge";
import * as Formatters from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/UnitTable/modules/Formatters";
import type { WeekDayIndex } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

export const pregnancyAndPuerperiumCareColumns: Array<ColumnsProps> = [
    {
        fields: ["patientName", "patientCpf", "patientCns"],
        headerName: "Nome e CPF/CNS",
        width: {
            landscape: 95,
            portrait: 74,
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
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
        ],
        headerName: "IG",
        width: {
            landscape: 95,
            portrait: 74,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
            ];
            const { weeks, days } = GestationalAgeFactory({
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
            }).computeGestationalAge();

            return (
                // TODO: adicionar validação da idade gestacional no upload do arquivo
                // para que, após o upload, não haja possibilidade dela ser nula
                <div>
                    {weeks === null || days === null
                        ? "-"
                        : `${weeks.toString()} sem. ${days > 0 ? `e ${days.toString()} dias` : ""}`}
                </div>
            );
        },
    },
    {
        fields: ["patientAge", "patientPhoneNumber", "microAreaName"],
        headerName: "Idade, telefone e microárea",
        width: {
            landscape: 95,
            portrait: 74,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [patientAge, patientPhoneNumber, microAreaName] = param as [
                string,
                string,
                string,
            ];
            return (
                <div>
                    <div>{patientAge.slice(0, 2)}</div>
                    <div>
                        {Formatters.phoneNumberFormatter(patientPhoneNumber)}
                    </div>
                    <div>{Formatters.microAreaFormatter(microAreaName)}</div>
                </div>
            );
        },
    },
    {
        fields: ["appointmentsUntil12thWeek"],
        headerName: "Consultas até a 12ª semana",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [appointments] = param as [number];
            const { status, count } =
                goodPractices.AppointmentsUntil12thWeekResult(appointments);
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "appointmentsDuringPrenatal",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "Consultas \n(até o parto)",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                appointmentsDuringPrenatal,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
                number,
            ];
            const { status, count } = goodPractices.SevenAppointmentsResult({
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                appointmentsDuringPrenatal,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "bloodPressureMeasurements",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "Aferição PA\n(até parto)",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                bloodPressureMeasurements,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
                number,
            ];
            const { status, count } =
                goodPractices.BloodPressureMeasurementResult({
                    gestationalAgeByLastMenstrualPeriodWeeks,
                    gestationalAgeByLastMenstrualPeriodDays,
                    gestationalAgeByObstreticalUltrasoundWeeks,
                    gestationalAgeByObstreticalUltrasoundDays,
                    bloodPressureMeasurements,
                    homeVisitsDuringPuerperium,
                    appointmentsDuringPuerperium,
                });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "weightAndHeightMeasurements",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "Peso+Altura\n(até parto)",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                weightAndHeightMeasurements,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
                number,
            ];
            const { status, count } =
                goodPractices.WeightAndHeightMeasurementResult({
                    gestationalAgeByLastMenstrualPeriodWeeks,
                    gestationalAgeByLastMenstrualPeriodDays,
                    gestationalAgeByObstreticalUltrasoundWeeks,
                    gestationalAgeByObstreticalUltrasoundDays,
                    weightAndHeightMeasurements,
                    homeVisitsDuringPuerperium,
                    appointmentsDuringPuerperium,
                });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "homeVisitsDuringPregnancy",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "VD\n(até parto)",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                homeVisitsDuringPregnancy,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
                number,
            ];
            const { status, count } = goodPractices.HomeVisitsResult({
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                homeVisitsDuringPregnancy,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "dentalAppointmentsDuringPrenatal",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "Saúde Bucal\n(até parto)",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                dentalAppointmentsDuringPrenatal,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
                number,
            ];
            const { status, count } = goodPractices.OralHealthResult({
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                dentalAppointmentsDuringPrenatal,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "didHivTestDuringFirstTrimester",
            "didSyphilisTestDuringFirstTrimester",
            "didHepatitisBTestDuringFirstTrimester",
            "didHepatitisCTestDuringFirstTrimester",
        ],
        headerName: "Exames\n(1º tri.)",
        width: {
            landscape: 48,
            portrait: 44,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                didHivTestDuringFirstTrimester,
                didSyphilisTestDuringFirstTrimester,
                didHepatitisBTestDuringFirstTrimester,
                didHepatitisCTestDuringFirstTrimester,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                boolean,
                boolean,
                boolean,
                boolean,
            ];
            const { status, count } =
                goodPractices.FirstTrimesterSTITestsResult({
                    gestationalAgeByLastMenstrualPeriodWeeks,
                    gestationalAgeByLastMenstrualPeriodDays,
                    gestationalAgeByObstreticalUltrasoundWeeks,
                    gestationalAgeByObstreticalUltrasoundDays,
                    didHepatitisBTestDuringFirstTrimester,
                    didHepatitisCTestDuringFirstTrimester,
                    didHivTestDuringFirstTrimester,
                    didSyphilisTestDuringFirstTrimester,
                });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
            "didHivExamAtThirdTrimester",
            "didSyphilisExamAtThirdTrimester",
        ],
        headerName: "Exames\n(3º tri.)",
        width: {
            landscape: 70,
            portrait: 44,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
                didHivExamAtThirdTrimester,
                didSyphilisExamAtThirdTrimester,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
                boolean,
                boolean,
            ];
            const { status, count } =
                goodPractices.SyphilisAndHivExamsAtThirdTrimesterResult({
                    gestationalAgeByLastMenstrualPeriodWeeks,
                    gestationalAgeByLastMenstrualPeriodDays,
                    gestationalAgeByObstreticalUltrasoundWeeks,
                    gestationalAgeByObstreticalUltrasoundDays,
                    homeVisitsDuringPuerperium,
                    appointmentsDuringPuerperium,
                    didHivExamAtThirdTrimester,
                    didSyphilisExamAtThirdTrimester,
                });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "Consulta puerpério\n(até 42d pós parto)",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
            ];
            const { status, count } =
                goodPractices.AppointmentsAtPuerperiumResult({
                    gestationalAgeByLastMenstrualPeriodWeeks,
                    gestationalAgeByLastMenstrualPeriodDays,
                    gestationalAgeByObstreticalUltrasoundWeeks,
                    gestationalAgeByObstreticalUltrasoundDays,
                    homeVisitsDuringPuerperium,
                    appointmentsDuringPuerperium,
                });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
    {
        fields: [
            "gestationalAgeByLastMenstrualPeriodWeeks",
            "gestationalAgeByLastMenstrualPeriodDays",
            "gestationalAgeByObstreticalUltrasoundWeeks",
            "gestationalAgeByObstreticalUltrasoundDays",
            "homeVisitsDuringPuerperium",
            "appointmentsDuringPuerperium",
        ],
        headerName: "VD puerpério (até 42d pós parto)",
        width: {
            landscape: 100,
            portrait: 50,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const [
                gestationalAgeByLastMenstrualPeriodWeeks,
                gestationalAgeByLastMenstrualPeriodDays,
                gestationalAgeByObstreticalUltrasoundWeeks,
                gestationalAgeByObstreticalUltrasoundDays,
                homeVisitsDuringPuerperium,
                appointmentsDuringPuerperium,
            ] = param as [
                number | null,
                WeekDayIndex | null,
                number | null,
                WeekDayIndex | null,
                number,
                number,
            ];
            const { status, count } =
                goodPractices.HomeVisitsAtPuerperiumResult({
                    gestationalAgeByLastMenstrualPeriodWeeks,
                    gestationalAgeByLastMenstrualPeriodDays,
                    gestationalAgeByObstreticalUltrasoundWeeks,
                    gestationalAgeByObstreticalUltrasoundDays,
                    homeVisitsDuringPuerperium,
                    appointmentsDuringPuerperium,
                });
            return <Tag theme={status.tagStatus} count={count} />;
        },
    },
];
