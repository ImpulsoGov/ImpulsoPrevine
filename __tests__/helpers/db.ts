/**
 * @jest-environment node
 */

import { jest } from "@jest/globals";
import type {
    DiabetesAcfItem,
    PrismaClient,
    HypertensionAcfItem,
} from "@prisma/client";
import { type DeepMockProxy, mockDeep } from "jest-mock-extended";

export const diabetesItem = (
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

export const hypertensionItem = (
    overrides: Partial<HypertensionAcfItem> = {}
): HypertensionAcfItem => ({
    patientId: "1",
    municipalitySusId: "111111",
    patientName: "Test Patient",
    patientAge: 45,
    patientAgeRange: 30,
    careTeamIne: "123",
    careTeamName: "Equipe Teste",
    municipalityName: "Demo",
    patientCpf: "12345678901",
    patientCns: null,
    patientPhoneNumber: null,
    microAreaName: null,
    latestAppointmentDate: null,
    appointmentStatusByQuarter: 30,
    latestExamRequestDate: null,
    latestExamRequestStatusByQuarter: 30,
    goodPracticesSum: 25,
    latestHomeVisitDate: null,
    homeVisitStatusByQuarter: 10,
    latestWeightHeightDate: null,
    weightHeightStatusByQuarter: 10,
    goodPracticesStatusByQuarter: 10,
    isMedicalRecordUpdated: false,
    ...overrides,
});

export const mockPrismaClient = (): DeepMockProxy<PrismaClient> => {
    const mockedPrisma =
        mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

    jest.doMock<typeof import("@prisma/prismaClient")>(
        "@prisma/prismaClient",
        () => ({
            __esModule: true,
            prisma: mockedPrisma,
        })
    );

    return mockedPrisma;
};
