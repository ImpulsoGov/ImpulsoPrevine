import axios from "axios";
import { API_URL } from "../constants/API_URL";

const AcessoindicadoresEquipesHomologadas = async (municipioUf) => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url:
            API_URL +
            `impulsoprevine/indicadores/municipios_equipes_homologadas?municipio_uf=${municipioUf}`,
        headers: {},
    };
    const res = await axios(config)
        .then((response) => response.data)
        .catch((error) => error.response.data);
    return res;
};

export { AcessoindicadoresEquipesHomologadas };
