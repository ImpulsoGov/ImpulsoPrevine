import { baseURL } from "@/utils/baseURL";
import axios from "axios";

export const InicioEquipeRequest = async (
    municipioIdSus: string,
    equipe: string,
    token: string,
) => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `${baseURL()}/api/inicio/inicio-equipe?municipio_id_sus=${municipioIdSus}&equipe=${equipe}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const res = axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });

    return res;
};
