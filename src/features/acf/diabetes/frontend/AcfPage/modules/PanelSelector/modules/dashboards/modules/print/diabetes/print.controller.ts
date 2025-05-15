import { diabetesAcfPrintForTeamDataAdapter } from "./print.adapter"
import type { DiabetesAcfPrintItem } from "./print.model"
import { diabetesAcfPrintDataForTeamRepository } from "./print.repository"

export const diabetesAcfPrintDataForTeamController = async(
    municipalitySusID: string,
    TeamIne: string,
): Promise<DiabetesAcfPrintItem[]> => {
    const data = await diabetesAcfPrintDataForTeamRepository(municipalitySusID,TeamIne)
    return diabetesAcfPrintForTeamDataAdapter(data)
}