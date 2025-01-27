import { request } from "graphql-request";
import { CMS_PLATAFORMA, CMS_CAPACITACAO } from "../constants/CMS_URL";
const getData = async (QUERY: string) => {
	const res = await request(CMS_PLATAFORMA, QUERY);
	return res != undefined ? res : null;
};
const getDataCapacitacao = async (QUERY: string) => {
	const res = await request(CMS_CAPACITACAO, QUERY);
	return res != undefined ? res : null;
};

export { getData, getDataCapacitacao };
