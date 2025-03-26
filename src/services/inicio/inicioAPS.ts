import { baseURL } from "@/utils/baseURL";
import axios from "axios";

export const InicioAPSRequest = async (
    municipioIdSus: string,
    token: string,
) => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `${baseURL()}/api/inicio/inicio-aps?municipio_id_sus=${municipioIdSus}`,
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
            console.error((error as Error).message);
            return (error as Error).message;
        });

    return res;
};
