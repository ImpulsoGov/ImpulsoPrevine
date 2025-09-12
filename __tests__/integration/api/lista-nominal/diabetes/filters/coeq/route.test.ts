/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import type * as interceptors from "@features/interceptors/backend/index";
import { describe, jest } from "@jest/globals";
import * as dbHelpers from "@tests/helpers/db";
import * as httpHelpers from "@tests/helpers/http";
import * as authHelpers from "@tests/helpers/auth";
import * as flagHelpers from "@tests/helpers/flag";

const coeqUrl = "http://localhost:3000/api/lista-nominal/diabetes/filters/coeq";
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [PROFILE_ID.COEQ],
} satisfies interceptors.User;

describe("/api/lista-nominal/diabetes/filters/coeq Route Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("GET /api/lista-nominal/diabetes/filters/coeq", () => {
        it("Deve retornar 404 se a feature flag diabetesNewProgram não estiver habilitada", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(false);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({ perfis: [PROFILE_ID.COEQ] })
                );
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/diabetes/filters/coeq/route"
            );

            const request = httpHelpers.request(coeqUrl, "GET");
            const response = await GET(request, { user: user });
            expect(response.status).toBe(404);
        });

        it("Deve retornar 403 se o usuário não possuir o perfil permitido na rota", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({ perfis: [PROFILE_ID.COAPS] })
                );
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/diabetes/filters/coeq/route"
            );

            const request = httpHelpers.request(coeqUrl, "GET");
            const response = await GET(request, { user: user });
            expect(response.status).toBe(403);
        });

        it("Deve retornar 500 se um erro inesperado for lançado na rota", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockRejectedValue(new Error("Erro genérico"));
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/diabetes/filters/coeq/route"
            );

            const request = httpHelpers.request(coeqUrl, "GET");
            const response = await GET(request, { user: user });
            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e as opções de filtro se o request chegar no handler", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({ perfis: [PROFILE_ID.COEQ] })
                );

            const mockedPrisma = dbHelpers.mockPrismaClient();

            const mockCommunityHealthWorkers = [
                dbHelpers.diabetesItem({
                    communityHealthWorker: "ACS João",
                }),
                dbHelpers.diabetesItem({
                    communityHealthWorker: "ACS Maria",
                }),
            ];

            const mockPatientStatuses = [
                dbHelpers.diabetesItem({ patientStatus: "Ativo" }),
                dbHelpers.diabetesItem({ patientStatus: "Inativo" }),
            ];

            const mockConditionIdentifiedBy = [
                dbHelpers.diabetesItem({
                    conditionIdentifiedBy: "Exame laboratorial",
                }),
                dbHelpers.diabetesItem({
                    conditionIdentifiedBy: "Diagnóstico clínico",
                }),
            ];

            const mockPatientAgeRanges = [
                dbHelpers.diabetesItem({ patientAgeRange: "40-49" }),
                dbHelpers.diabetesItem({ patientAgeRange: "50-59" }),
            ];

            mockedPrisma.diabetesAcfItem.findMany
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
