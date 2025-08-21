/**
 * @jest-environment node
 */

import type { DiabetesAcfItem } from "@prisma/client";

export const mockDiabetesItem = (
    overrides: Partial<DiabetesAcfItem> = {}
): DiabetesAcfItem => ({
    id: "1",
    municipalitySusId: "111111",
    municipalityState: "SP",
    latestExamRequestDate: null,
    mostRecentAppointmentDate: null,
    hemoglobinTestDueDate: null,
    nextAppointmentDueDate: null,
    patientStatus: "Ativo",
    conditionIdentifiedBy: "Exame laboratorial",
    patientCpfOrBirthday: null,
    patientName: "Test Patient",
    patientAge: 45,
    patientAgeRange: "40-49",
    careTeamIne: "123",
    careTeamName: "Equipe Teste",
    communityHealthWorker: "ACS Teste",
    mostRecentProductionRecordDate: new Date("2024-01-01"),
    ...overrides,
});
