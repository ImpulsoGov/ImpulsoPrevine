import { getCurrentQuadrimester } from "@/features/acf/frontend/common/GetCurrentQuadrimester";
import { TableTag } from "@/features/acf/frontend/common/TableTag";
import type {
    AppointmentStatusByQuarterText,
    HypertensionAcfItem,
} from "@/features/acf/shared/hypertension/model";
import type { TagTheme } from "@impulsogov/design-system/dist/molecules/Tag/Tag";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import type { JSX } from "react";

export const coapsColumns: Array<GridColDef> = [
    {
        field: "patientName",
        headerName: "Nome e CPF/CNS",
        width: 211,
        headerAlign: "left",
        align: "left",
        //TODO: Implementar funcao que une nome, cpf e cns
    },
    {
        field: "latestAppointmentDate",
        width: 131,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data última <br />
                consulta
            </span>
        ),
    },
    {
        field: "appointmentStatusByQuarter",
        width: 207,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que renderiza tags
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação consulta <br />
                no quadrimestre
            </span>
        ),
        // TODO: mover para um módulo
        renderCell: ({
            value,
        }: GridRenderCellParams<
            HypertensionAcfItem,
            AppointmentStatusByQuarterText
        >): JSX.Element => {
            if (!value) return <span>-</span>;
            const statusText =
                value === "Vence dentro do quadri"
                    ? `Vence dentro de Q${getCurrentQuadrimester().toString()}`
                    : value;
            const detailsByValue: Record<
                AppointmentStatusByQuarterText,
                {
                    icon: {
                        src: string;
                        alt: string;
                        width?: number;
                        height?: number;
                    };
                    theme: TagTheme;
                }
            > = {
                "Em dia": {
                    icon: {
                        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3",
                        alt: "Ícone de uma marca de verificação",
                    },
                    theme: "success",
                },
                Atrasada: {
                    icon: {
                        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8z006507lpwb1nwogs",
                        alt: "Ícone com símbolo da letra x",
                        width: 17,
                        height: 4,
                    },
                    theme: "warning",
                },
                "Vence dentro do quadri": {
                    icon: {
                        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx6gsg007s07kn5oa1q3vs",
                        alt: "Ícone de uma exclamação",
                        width: 17,
                        height: 4,
                    },
                    theme: "attention",
                },
                "Nunca realizado": {
                    icon: {
                        src: "https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h9e006a07lpnnvguact",
                        alt: "Ícone de uma ampulheta",
                        width: 17,
                        height: 4,
                    },
                    theme: "danger",
                },
            };
            return (
                <TableTag
                    text={statusText}
                    theme={detailsByValue[value].theme}
                    icon={detailsByValue[value].icon}
                />
            );
        },
    },
    {
        field: "latestExamRequestDate",
        width: 156,
        headerAlign: "left",
        align: "left",
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Data da última
                <br />
                aferição de PA
            </span>
        ),
    },
    {
        field: "latestExamRequestStatusByQuarter",
        width: 209,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que renderiza tags
        renderHeader: () => (
            <span className="MuiDataGrid-columnHeaderTitle">
                Situação aferição de
                <br />
                PA no quadrimestre
            </span>
        ),
    },
    {
        field: "careTeamName",
        width: 134,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Equipe",
    },
    {
        field: "microAreaName",
        width: 144,
        headerAlign: "left",
        align: "left",
        // TODO: implementar função que checa valores nulos
        headerName: "Microárea",
    },
    {
        field: "patientPhoneNumber",
        headerName: "Telefone",
        width: 136,
        headerAlign: "left",
        align: "left",
        // TODO: Implementar funcao que formata o telefone
    },
    {
        field: "patientAge",
        headerName: "Idade",
        width: 103,
        headerAlign: "left",
        align: "left",
    },
] as Array<GridColDef>;
