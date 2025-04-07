import { PROFILE_ID, type ProfileIdValue } from "@/types/profile";

const data = [
        {
            "municipio_id_sus": "111111",
            "ine": "0000098574",
            "lista": "diabetes",
            "valor": 45,
            "descricao": "COM_CONSULTA_AFERICAO_PRESSAO"
        },
        {
            "municipio_id_sus": "111111",
            "ine": "0000098574",
            "lista": "diabetes",
            "valor": 52,
            "descricao": "DIAGNOSTICO_AUTORREFERIDO"
        },
        {
            "municipio_id_sus": "111111",
            "ine": "0000098574",
            "lista": "diabetes",
            "valor": 40,
            "descricao": "DIAGNOSTICO_CLINICO"
        },
        {
            "municipio_id_sus": "140015",
            "ine": "0001590324",
            "lista": "diabetes",
            "valor": 54,
            "descricao": "COM_CONSULTA_AFERICAO_PRESSAO"
        },
        {
            "municipio_id_sus": "140015",
            "ine": "0001590324",
            "lista": "diabetes",
            "valor": 25,
            "descricao": "DIAGNOSTICO_AUTORREFERIDO"
        },
        {
            "municipio_id_sus": "140015",
            "ine": "0001590324",
            "lista": "diabetes",
            "valor": 43,
            "descricao": "DIAGNOSTICO_CLINICO"
        }    
]

export type ExternalCardDBDataItem = {
    municipio_id_sus: string;
    ine: string;
    lista: string;
    valor: number;
    descricao: string;
}
export const externalCardsAcfDashboardDataRepository = (
    listName: string,
    teamIne: string,
    municipalitySusID: string,
    profileId: ProfileIdValue[]
)=>{
    const filterAPSCallback = (item: ExternalCardDBDataItem) => (
        item.lista.toLocaleUpperCase() === listName.toLocaleUpperCase() 
        && item.municipio_id_sus === municipalitySusID 
    )
    const filterTeamCallback = (item: ExternalCardDBDataItem) => (
        item.lista.toLocaleUpperCase() === listName.toLocaleUpperCase() 
        && item.municipio_id_sus === municipalitySusID 
        && item.ine === teamIne
    )

    return data.filter(profileId.includes(PROFILE_ID.COAPS) ? filterAPSCallback: filterTeamCallback) 

}