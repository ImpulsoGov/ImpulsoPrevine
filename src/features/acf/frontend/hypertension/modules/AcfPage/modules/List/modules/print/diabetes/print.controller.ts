import { diabetesAcfPrintForTeamDataAdapter } from "./print.adapter";
import type { DiabetesAcfPrintItem } from "./print.model";
import { diabetesAcfPrintDataForTeamRepository } from "./print.repository";

export const diabetesAcfPrintDataForTeamController = (
    municipalitySusId: string,
    TeamIne: string
): Array<DiabetesAcfPrintItem> => {
    const data = diabetesAcfPrintDataForTeamRepository(
        municipalitySusId,
        TeamIne
    );
    return diabetesAcfPrintForTeamDataAdapter(data);
};
