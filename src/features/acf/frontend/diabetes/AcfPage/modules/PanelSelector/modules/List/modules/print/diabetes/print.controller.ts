import { diabetesAcfPrintForTeamDataAdapter } from "./print.adapter";
import type { DiabetesAcfPrintItem } from "./print.model";
import { diabetesAcfPrintDataForTeamRepository } from "./print.repository";

export const diabetesAcfPrintDataForTeamController = (
    municipalitySusID: string,
    TeamIne: string
): Array<DiabetesAcfPrintItem> => {
    const data = diabetesAcfPrintDataForTeamRepository(
        municipalitySusID,
        TeamIne
    );
    return diabetesAcfPrintForTeamDataAdapter(data);
};
