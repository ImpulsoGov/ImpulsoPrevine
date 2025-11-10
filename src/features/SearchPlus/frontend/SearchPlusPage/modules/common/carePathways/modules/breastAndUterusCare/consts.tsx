//TODO: Jogar estes tipos pra um módulo separado ao invés de importar de ResultContent
import type { ColumnsProps, SearchPlusItem } from "../../model";
//TODO: Este módulo não deveria depender dos formatters. Talvez este arquivo devesse estar na UnitTable?
import * as Formatters from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/UnitTable/modules/Formatters";
import * as time from "@/features/common/shared/time";
import * as goodPractices from "./modules/goodPractices";
import { TagByStatus } from "../../../Tags";

export const breastAndUterusCareColumns: Array<ColumnsProps<SearchPlusItem>> = [
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
        fields: [
            "patientBirthDate",
            "papTestLatestRequestDate",
            "papTestLatestEvaluationDate",
            "mammographyLatestRequestDate",
            "mammographyLatestEvaluationDate",
            "latestSexualAndReproductiveHealthAppointmentDate",
            "createdAt",
        ],
        headerName: "Exame câncer de colo de útero\nData e situação",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const { latestDate, status } =
                goodPractices.cervixCancerResult(param);

            return (
                <div>
                    <div>
                        {latestDate
                            ? time.localDateToBrtString2DigitYear(latestDate)
                            : "-"}
                    </div>
                    <div>
                        <TagByStatus content={status} />
                    </div>
                </div>
            );
        },
    },
    {
        fields: ["patientBirthDate", "hpvVaccinationDates", "createdAt"],
        headerName: "Vacinação contra HPV\nData e situação",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const { latestDate, status } =
                goodPractices.hpvVaccinationResult(param);

            return (
                <div>
                    <div>
                        {latestDate
                            ? time.localDateToBrtString2DigitYear(latestDate)
                            : "-"}
                    </div>
                    <div>
                        <TagByStatus content={status} />
                    </div>
                </div>
            );
        },
    },
    {
        fields: [
            "patientBirthDate",
            "papTestLatestRequestDate",
            "papTestLatestEvaluationDate",
            "mammographyLatestRequestDate",
            "mammographyLatestEvaluationDate",
            "latestSexualAndReproductiveHealthAppointmentDate",
            "createdAt",
        ],
        headerName: "Consulta saúde sexual e reprodutiva\nData e situação",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const { latestDate, status } =
                goodPractices.sexualAndReproductiveHealthCareResult(param);

            return (
                <div>
                    <div>
                        {latestDate
                            ? time.localDateToBrtString2DigitYear(latestDate)
                            : "-"}
                    </div>
                    <div>
                        <TagByStatus content={status} />
                    </div>
                </div>
            );
        },
    },
    {
        fields: [
            "patientBirthDate",
            "papTestLatestRequestDate",
            "papTestLatestEvaluationDate",
            "mammographyLatestRequestDate",
            "mammographyLatestEvaluationDate",
            "latestSexualAndReproductiveHealthAppointmentDate",
            "createdAt",
        ],
        headerName: "Exame câncer de mama\nData e situação",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const { latestDate, status } =
                goodPractices.breastCancerResult(param);

            return (
                <div>
                    <div>
                        {latestDate
                            ? time.localDateToBrtString2DigitYear(latestDate)
                            : "-"}
                    </div>
                    <div>
                        <TagByStatus content={status} />
                    </div>
                </div>
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
            const [microAreaName] = param as [string];
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
            const age = patientAge.slice(0, 2);
            return (
                <>
                    <div>
                        {Formatters.phoneNumberFormatter(patientPhoneNumber)}
                    </div>
                    <div>{age} anos</div>
                </>
            );
        },
    },
];
