export const cargoTransform = (cargo: string) => {
    if (cargo == "Coordenação de APS") return "coordenador(a) da APS";
    if (cargo == "Coordenação de Equipe") return "coordenador(a) de equipe";
    if (cargo == "Impulser") return cargo;
    return cargo;
};
