import { request } from "graphql-request";
import { CMS_CAPACITACAO, CMS_PLATAFORMA } from "../constants/CMS_URL";
const getData = async (query: string) => {
    const res = await request(CMS_PLATAFORMA, query);
    return res != undefined ? res : null;
};
const getDataCapacitacao = async (query: string) => {
    const res = await request(CMS_CAPACITACAO, query);
    return res != undefined ? res : null;
};

export { getData, getDataCapacitacao };
