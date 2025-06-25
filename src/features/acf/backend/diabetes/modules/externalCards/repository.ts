import type { ExternalCardDBDataItem } from "./model";

// TODO usar prisma para buscar os dados quando fizermos uma lista que possui cards externos
const data = [
    {
        municipio_id_sus: "111111",
        ine: "0000098574",
        lista: "diabetes",
        valor: 45,
        descricao: "COM_CONSULTA_AFERICAO_PRESSAO",
    },
    {
        municipio_id_sus: "111111",
        ine: "0000098574",
        lista: "diabetes",
        valor: 52,
        descricao: "DIAGNOSTICO_AUTORREFERIDO",
    },
    {
        municipio_id_sus: "111111",
        ine: "0000098574",
        lista: "diabetes",
        valor: 40,
        descricao: "DIAGNOSTICO_CLINICO",
    },
    {
        municipio_id_sus: "140015",
        ine: "0001590324",
        lista: "diabetes",
        valor: 54,
        descricao: "COM_CONSULTA_AFERICAO_PRESSAO",
    },
    {
        municipio_id_sus: "140015",
        ine: "0001590324",
        lista: "diabetes",
        valor: 25,
        descricao: "DIAGNOSTICO_AUTORREFERIDO",
    },
    {
        municipio_id_sus: "140015",
        ine: "0001590324",
        lista: "diabetes",
        valor: 43,
        descricao: "DIAGNOSTICO_CLINICO",
    },
];

export const externalCardsDataForTeam = (
    listName: string,
    teamIne: string,
    municipalitySusId: string
): Array<ExternalCardDBDataItem> => {
    return data.filter(
        (item: ExternalCardDBDataItem): boolean =>
            item.lista.toLocaleUpperCase() === listName.toLocaleUpperCase() &&
            item.municipio_id_sus === municipalitySusId &&
            item.ine === teamIne
    );
};
