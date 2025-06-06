"use client";
import type {
    FiltersUi,
    SelectedFilterValues,
} from "@/features/acf/diabetes/frontend/model";
import { type Dispatch, type SetStateAction } from "react";
import { createSelectConfigsCoeqs } from "./logic";
import * as Presentation from "./presentation";
import { useSession } from "next-auth/react";

type FiltersBarCoeqsProps = React.PropsWithChildren<{
    selectedValues: SelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedFilterValues>>;
    // searchParams: URLSearchParams;
}>;

export const FiltersBarCoeqs: React.FC<FiltersBarCoeqsProps> = ({
    selectedValues,
    setSelectedValues,
    // searchParams,
}) => {
    const { data: session } = useSession();
    //Na teoria, isso não deve ser mostrado nunca, pq este componente é renderizado no servidor,
    //e a usuária não consegue chegar aqui sem estar logada por conta do SessionGuard lá em cima.
    if (!session?.user) {
        return <span>Usuário não está logado.</span>;
    }

    //TODO rever nome do controller filterOptions
    //TODO: Chateado que temos que usar os nomes do token aqui.
    // const filtersValues = await filterOptionsCoeq(
    //     session.user.municipio_id_sus,
    //     session.user.equipe
    // );
    const filtersValues: FiltersUi = {
        patientStatus: [
            "Consulta e solicitação de hemoglobina a fazer",
            "Consulta e solicitação de hemoglobina em dia",
            "Apenas a solicitação de hemoglobina a fazer",
            "Apenas a consulta a fazer",
        ],
        conditionIdentifiedBy: ["Diagnóstico Clínico", "Autorreferida"],
        visitantCommunityHealthWorker: [
            "ANACLETO MATA TRISTAO",
            "SIDNEA SIILIG PELEGRINE",
            "GILZETE MUNHOZ NOIA",
            "NEUNICE JESUS BARBOSA",
            "DANUBIA PIRES CHAGAS",
            "RIVALDINA PAZZOTO JOTA",
            "ELIZONE FIORIO CIRINO",
            "JOSEILDO BENTIVEGNA JACINTO",
            "VANIA BELLO BREOZA",
            "MSRIA DELORENCE PERPETUAPESSOA",
            "IRENICE ORDENS PORTELA",
            "MARIENE JUNIOR BARRETOS",
            "AILDA GODEZ MOCO",
            "JUSCILEI CICERONE MOURAO",
            "MAGIE BASILE HERMENEGILDO",
            "MARLY DAVI PEIXOTO",
            "VANDEVALDO CAIAREA CORREA",
            "JANDERSON SIILIG BARREIRA",
            "LAUDISELMA BORGES LIMA",
            "ACACIA FILHA LUCIO",
            "NAILDES FISCHER SOARES",
            "IRONETE SANDES ALVIM",
            "ZILNETE FARIAS LEANDRO",
            "MARASILVA HERMES ANISIO",
            "AGNALDO CASTRO EMILIANA",
            "EDNÓLIA CASALHO VALANDRO",
            "GESSI JESUS GIL",
            "ROSICLEIDE NERING GAMA",
            "EUFROSINA GLÓRIA EMILIANA",
            "ALBANI KAWANAGO PIEDADE",
            "NELSON MATA DEOLIVEIRA",
            "EDVANDO ASSUNCAO PENA",
            "REINILDE MANDU CORREA",
            "AGDA EVANGELISTA LACERDA",
            "DUVAL VALDERRAMA LOTERO",
            "DARTE RUIZ FAUSTINO",
            "ETELCIDES FARAH CARDOSO",
            "RENATA MORENO FIUZA",
            "EDVAN BOTELHO SANTOS",
            "GUILERMINA MIÚRA NARCISO",
            "JUSCINEIDE BARELLO GUEDES",
            "MARIACRISTINA DAVENPORT PEDROSA",
            "MEIRIDIVA CONCEICAO NETA",
            "LUZILEIA BRIOLI SANTOS",
            "JONATAS ALBARRAM FERRREIRA",
            "SILVAN SIMAO PIFULSKI",
            "EDESIO ALVEZ NICOLUSSI",
            "EDIELSON TELES LAGARES",
            "SINDELINA QUIROZ MARTINEZ",
            "GISÉLIA GATO DORNELES",
            "ADENILZA BRANDAO CESPEDES",
            "EMERITA CORDIOLLI ANANIAS",
            "CRISALVA VEIGA MACENA",
            "EDINA ASSUNÇAO PENA",
            "SALAMÃO SALUSTINO NEIA",
            "INEUZA NERES PARABALA",
            "JACONIAS PAZZANI RODRIGUES",
            "JOVINIANO CACHOEIRA MACIEL",
            "ANERINA GUIZZI NETTO",
            "THASSIA BERNARDI CALIXTO",
            "NARCISO GUEDES ALVARENGA",
            "SONÊIDE TORRADO SALGADO",
            "ALTOMIRANDO COIS FILHO",
            "SORAYA BOENO CARDOSO",
            "MACIA BARDUAE GUIDA",
            "IVALDO RICARDO VALE",
            "QUELLE LEAO CALDEIRA",
            "JOSEVALDO TRONQUINI CAVALCANTE",
            "RENE PAIXAO HERMENRGILDO",
            "ERNESTA DOURADO BRASILEIRO",
            "EVANGELINA FORTUNATO CRISTO",
            "MILZA CREMM PADUA",
            "ARACI NODA BARBO",
            "CICERA MEDRADO VELAIS",
            "DANIVAL YURKO MIGUEL",
            "EVANEI GUASTINI FIGUEIRA",
            "MARLEIDE CASTELLAR MILHOMEN",
            "LEA ABES FAUSTINO",
            "IRENILSOM SLVA BERNADO",
            "ANDERSEN MAGALHAES SIMOES",
            "CLAUTILDES PUNTEL COUTO",
            "ALESSANDRA GALEZA MEIRIM",
            "EUZITA CALAMITA SUDRE",
            "IVANI TINTI CAPUCHINHO",
            "FELIX DINELLI BERNADO",
            "CLEA PUPO CRISTO",
            "EDNILSON YAMAGUCHI MERES",
            "VALDA SOARES PORTO",
            "GERASSIMO MARTIN MATIAZZI",
            "MAISA CONEICAO NETTO",
            "FABIA DAMAZIO BALDOINO",
            "MIGUEL CORTEZ NORONHA",
            "FELISBELA LUTTI LOBEU",
            "RAFAELA RAFANELLI MARTINEZ",
            "JOSENEIDE SERRANO BALDOINO",
            "SUELENI ZACARIAS VENANCIO",
            "FRANCISCO MATO MENDES",
            "POLLYANA PRUDENTE MAGRI",
            "LEONIA COLISSE NENES",
            "ELOISA CLEMENTE ALCOBACA",
        ],
        patientAgeRange: [
            "Mais de 65 anos",
            "Entre 55 e 65 anos",
            "Entre 35 e 44 anos",
            "Entre 45 e 54 anos",
            "Entre 25 e 34 anos",
            "Entre 18 e 24 anos",
            "Menos de 17 anos",
        ],
    };
    const selectConfigs = createSelectConfigsCoeqs(filtersValues);

    // // if (!selectedValues) {
    // //     const initialSelectedValues =
    // //         searchParamsToSelectedValuesCoeqs(searchParams);
    // //     setSelectedValues(initialSelectedValues);
    // // }

    return (
        <Presentation.FiltersBar
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            selectConfigs={selectConfigs}
        ></Presentation.FiltersBar>
    );
};
