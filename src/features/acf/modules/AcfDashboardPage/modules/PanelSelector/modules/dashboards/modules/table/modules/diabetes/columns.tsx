import { RenderStatusTagCell } from "@/helpers/lista-nominal/renderCell";
import type { GridColDef } from "@mui/x-data-grid";
import { DateRenderCell } from "./columns.formatter";
import { CpfOrBirthdayFormatter } from "./cpfOrBirthday.formatter";
//TODO investigar como a conversao para string no dataGrid
const NameFormatter = ({value} : {value: string | null} )  => {
    const commonPrepositions = ['da', 'de', 'do', 'dos', 'das', 'e'];
    if (!value) return <div data-testid="empty-return">{value}</div>;
    const namePieces = value.toLowerCase().split(" "); 
    const formattedNames = namePieces.map((piece) => {
        if(!commonPrepositions.includes(piece)) {
        return piece.charAt(0).toUpperCase() + piece.slice(1);
        }
        return piece;
    });
    const fullNameFormatted = formattedNames.join(" ");
    return <div data-testid="name-formatter">{fullNameFormatted}</div>;
}
export const diabetesColumns: GridColDef[] = [
    {
        field: "patientName",
        headerName: "Nome",
        width: 240,
        headerAlign: "left",
        align: "left",
         renderCell: NameFormatter
    },
    {
        field: "patientCpfOrBirthday",
        headerName: "CPF/Data de nascimento",
        width: 150,
        headerAlign: "left",
        align: "left",
        renderCell: CpfOrBirthdayFormatter
     },
    {
        field: "conditionIndentifiedBy",
        headerName: "Tipo de diagnóstico",
        width: 160,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "patientAge",
        headerName: "Idade (ano)",
        width: 112,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "mostRecentAppointmentDate",
        headerName: "Data da última consulta",
        width: 164,
        headerAlign: "left",
        align: "left",
        renderCell: DateRenderCell
    },
    {
        field: "nextAppointmentDueDate",
        headerName: "Prazo p/ próxima consulta",
        width: 181,
        headerAlign: "left",
        align: "left",
        renderCell: RenderStatusTagCell
    },
    {
        field: "latestExamRequestDate",
        headerName: "Data da última solicitação de hemoglobina glicada",
        width: 205,
        headerAlign: "left",
        align: "left",
        renderCell: DateRenderCell
    },
    {
        field: "hemoglobinTestDueDate",
        headerName: "Prazo p/ próxima solicitação de hemoglobina glicada",
        width: 196,
        headerAlign: "left",
        align: "left",
        renderCell: RenderStatusTagCell
    },
    {
        field: "visitantCommunityHealthWorker",
        headerName: "Profissional responsável",
        width: 230,
        headerAlign: "left",
        align: "left",
        renderCell: NameFormatter
    },
] as GridColDef[];
