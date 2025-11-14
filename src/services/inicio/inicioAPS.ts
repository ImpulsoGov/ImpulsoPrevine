import { baseURL } from "@/utils/baseURL";
import axios from "axios";
import { type SituacaoIndicador } from "@/types/inicio";

export const InicioAPSRequest = async (
    municipioIdSus: string,
    token: string
): Promise<Array<SituacaoIndicador> | null> => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `${baseURL()}/api/inicio/inicio-aps?municipio_id_sus=${municipioIdSus}`,
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const res = await axios
        .request<Array<SituacaoIndicador>>(config)
        .then((response) => {
            return response.data;
        })
        .catch((error: unknown) => {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null;
        });

    return res;
};
