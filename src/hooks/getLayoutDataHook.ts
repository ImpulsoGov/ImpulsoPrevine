import { getData } from "@services/cms";
import { LAYOUT } from "@utils/QUERYS";
import { Dispatch, SetStateAction } from "react";

export const getLayoutDataHook = (setRes: Dispatch<SetStateAction<any>>) => {
	const fetchData = async () => {
		try {
			const data = await getData(LAYOUT);
			setRes(data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	fetchData();
};
export const getDataHook = (
	setRes: Dispatch<SetStateAction<any>>,
	query: string,
) => {
	const fetchData = async () => {
		try {
			const data = await getData(query);
			setRes(data);
		} catch (error) {
			console.error("Erro ao buscar dados:", error);
		}
	};

	fetchData();
};
