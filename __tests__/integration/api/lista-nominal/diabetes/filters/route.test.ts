/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import type * as interceptors from "@features/interceptors/backend/index";
import { describe, jest } from "@jest/globals";
import type { DiabetesAcfItem, PrismaClient } from "@prisma/client";
import type { DeepMockProxy } from "jest-mock-extended";
import { mockDeep } from "jest-mock-extended";
import { NextRequest } from "next/server";

// Helper to create mock DiabetesAcfItem data
const createMockDiabetesItem = (
    overrides: Partial<DiabetesAcfItem> = {}
): DiabetesAcfItem => ({
    id: "default-id",
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

//TODO: Type method correctly
// Mock NextRequest for testing
function createMockRequest(url: string, method: string): NextRequest {
    //   const { body, searchParams } = options;

    //   const url = new URL('http://localhost:3000/api/users');
    //   if (searchParams) {
    //     Object.entries(searchParams).forEach(([key, value]) => {
    //       url.searchParams.set(key, value);
    //     });
    //   }

    return new NextRequest(url, {
        method,
        // body: body ? JSON.stringify(body) : undefined,
        headers: {
            authorization: "Bearer some-token",
            "Content-Type": "application/json",
        },
    });
}

const coeqUrl = "http://localhost:3000/api/lista-nominal/diabetes/filters/coeq";
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [1],
} satisfies interceptors.User;

const decodedToken = (perfis) => {
    return {
        payload: { sub: "some_sub", perfis },
        protectedHeader: { alg: "" },
    };
};

describe("/api/lista-nominal/diabetes/filters/coeq Route Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("GET /api/lista-nominal/diabetes/filters/coeq", () => {
        //TODO: Adicionar caso de: perfil não permitido
        //TODO: Extrair helpers de mock para reutilizar em todos os testes
        it("Deve retornar 404 se a feature flag diabetesNewProgram não estiver habilitada", async () => {
            jest.doMock<typeof import("@/features/common/shared/flags")>(
                "@/features/common/shared/flags",
                () => ({
                    ...jest.requireActual("@/features/common/shared/flags"),
                    diabetesNewProgram: async () => false,
                })
            );

            jest.doMock<typeof import("@/utils/token")>("@/utils/token", () => {
                return {
                    ...jest.requireActual("@/utils/token"),
                    decodeToken: async (_x, _y) => {
                        return decodedToken([PROFILE_ID.COEQ]);
                    },
                };
            });

            const mockPrisma =
                mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

            jest.mock<typeof import("@prisma/prismaClient")>(
                "@prisma/prismaClient",
                () => ({
                    __esModule: true,
                    prisma: mockPrisma,
                })
            );

            const { GET } = await import(
                "@/app/api/lista-nominal/diabetes/filters/coeq/route"
            );

            const request = createMockRequest(coeqUrl, "GET");
            const response = await GET(request, { user: user });
            expect(response.status).toBe(404);
        });

        it("Deve retornar 200 e as opções de filtro se o request chegar no handler", async () => {
            jest.doMock<typeof import("@/features/common/shared/flags")>(
                "@/features/common/shared/flags",
                () => ({
                    ...jest.requireActual("@/features/common/shared/flags"),
                    diabetesNewProgram: async () => true,
                })
            );

            jest.doMock<typeof import("@/utils/token")>("@/utils/token", () => {
                return {
                    ...jest.requireActual("@/utils/token"),
                    decodeToken: async (_x, _y) => {
                        return decodedToken([PROFILE_ID.COEQ]);
                    },
                };
            });

            const mockPrisma =
                mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

            jest.mock<typeof import("@prisma/prismaClient")>(
                "@prisma/prismaClient",
                () => ({
                    __esModule: true,
                    prisma: mockPrisma,
                })
            );

            // const { prismaMock } = await import("../../../../../setup/prismaMock");

            const mockCommunityHealthWorkers = [
                createMockDiabetesItem({ communityHealthWorker: "ACS João" }),
                createMockDiabetesItem({ communityHealthWorker: "ACS Maria" }),
            ];

            const mockPatientStatuses = [
                createMockDiabetesItem({ patientStatus: "Ativo" }),
                createMockDiabetesItem({ patientStatus: "Inativo" }),
            ];

            const mockConditionIdentifiedBy = [
                createMockDiabetesItem({
                    conditionIdentifiedBy: "Exame laboratorial",
                }),
                createMockDiabetesItem({
                    conditionIdentifiedBy: "Diagnóstico clínico",
                }),
            ];

            const mockPatientAgeRanges = [
                createMockDiabetesItem({ patientAgeRange: "40-49" }),
                createMockDiabetesItem({ patientAgeRange: "50-59" }),
            ];

            mockPrisma.diabetesAcfItem.findMany
                .mockResolvedValueOnce(mockCommunityHealthWorkers)
                .mockResolvedValueOnce(mockPatientStatuses)
                .mockResolvedValueOnce(mockConditionIdentifiedBy)
                .mockResolvedValueOnce(mockPatientAgeRanges);

            const { GET } = await import(
                "@/app/api/lista-nominal/diabetes/filters/coeq/route"
            );

            const expectedBody = {
                filters: {
                    communityHealthWorker: ["ACS João", "ACS Maria"],
                    patientStatus: ["Ativo", "Inativo"],
                    conditionIdentifiedBy: [
                        "Exame laboratorial",
                        "Diagnóstico clínico",
                    ],
                    patientAgeRange: ["40-49", "50-59"],
                },
            };

            const request = createMockRequest(coeqUrl, "GET");
            const response = await GET(request, { user: user });

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedBody);
        });
    });
});
