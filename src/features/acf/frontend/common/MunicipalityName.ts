import { MUNICIPIOS } from "@/constants/municipios";

export const municipalityName = (municipalitySusId: string): string => {
    //TODO: Criar um mapa associativo municipioId->municipio e usar aqui
    const municipalityData = MUNICIPIOS.find(
        (municipality) => municipality.municipioIdSus === municipalitySusId
    );

    //TODO: Tentar encontrar uma forma de tipar as coisas pra esse caso ser impossível.
    if (!municipalityData) {
        return "Município - UF";
    }

    return `${municipalityData.nome} - ${municipalityData.uf}`;
};
