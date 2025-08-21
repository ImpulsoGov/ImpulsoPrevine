/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import type * as interceptors from "@features/interceptors/backend/index";
import { describe, jest } from "@jest/globals";
import type { PrismaClient } from "@prisma/client";
import type { DeepMockProxy } from "jest-mock-extended";
import { mockDeep } from "jest-mock-extended";
import * as dbHelpers from "../../../../../helpers/db";
import * as httpHelpers from "../../../../../helpers/http";

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

            const request = httpHelpers.request(coeqUrl, "GET");
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

            const mockCommunityHealthWorkers = [
                dbHelpers.mockDiabetesItem({
                    communityHealthWorker: "ACS João",
                }),
                dbHelpers.mockDiabetesItem({
                    communityHealthWorker: "ACS Maria",
                }),
            ];

            const mockPatientStatuses = [
                dbHelpers.mockDiabetesItem({ patientStatus: "Ativo" }),
                dbHelpers.mockDiabetesItem({ patientStatus: "Inativo" }),
            ];

            const mockConditionIdentifiedBy = [
                dbHelpers.mockDiabetesItem({
                    conditionIdentifiedBy: "Exame laboratorial",
                }),
                dbHelpers.mockDiabetesItem({
                    conditionIdentifiedBy: "Diagnóstico clínico",
                }),
            ];

            const mockPatientAgeRanges = [
                dbHelpers.mockDiabetesItem({ patientAgeRange: "40-49" }),
                dbHelpers.mockDiabetesItem({ patientAgeRange: "50-59" }),
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

            const request = httpHelpers.request(coeqUrl, "GET");
            const response = await GET(request, { user: user });

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedBody);
        });
    });
});
