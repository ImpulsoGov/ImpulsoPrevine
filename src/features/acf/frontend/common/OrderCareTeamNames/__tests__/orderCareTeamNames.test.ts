import { orderCareTeamNames } from "..";

const careTeamNames = ["Equipe B", "EQUIPE A", "Equipe B", "equipe c"];

describe("orderCareTeamNames", () => {
    it("Deve pôr as equipes em ordem alfabética", () => {
        const list = [...careTeamNames];
        const sortedList = list.sort(orderCareTeamNames);

        expect(sortedList).toEqual([
            "EQUIPE A",
            "Equipe B",
            "Equipe B",
            "equipe c",
        ]);
    });

    it("Deve pôr as equipes em ordem alfabética, deixando 'Sem equipe' no final", () => {
        const list = ["Sem equipe", ...careTeamNames];

        const sortedList = list.sort(orderCareTeamNames);

        expect(sortedList).toEqual([
            "EQUIPE A",
            "Equipe B",
            "Equipe B",
            "equipe c",
            "Sem equipe",
        ]);
    });
});
