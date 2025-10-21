//TODO: Jogar estes tipos pra um módulo separado ao invés de importar de ResultContent
import type { ColumnsProps, SearchPlusItem } from "../../model";
//TODO: Este módulo não deveria depender dos formatters. Talvez este arquivo devesse estar na UnitTable?
import * as Formatters from "@features/SearchPlus/frontend/SearchPlusPage/common/UnitTable/modules/Formatters";
import { formatUtcToBrt } from "@/features/common/shared/time";
import { cervixCancerResult } from "./modules/goodPractices/CervixCancer";

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
            // "createdAt",
        ],
        headerName: "Exame câncer de colo de útero\nData e situação",
        width: {
            landscape: 150,
            portrait: 135,
        },
        renderCell: (param: unknown): React.ReactNode => {
            const { latestDate, status } = cervixCancerResult(param);

            return (
                <div>
                    <div>{latestDate ? formatUtcToBrt(latestDate) : "-"}</div>
                    <div>{status}</div>
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
