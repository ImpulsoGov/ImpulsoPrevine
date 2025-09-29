/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import { describe, jest } from "@jest/globals";
import * as dbHelpers from "@tests/helpers/db";
import * as httpHelpers from "@tests/helpers/http";
import * as authHelpers from "@tests/helpers/auth";
import * as flagHelpers from "@tests/helpers/flag";

const coapsUrl =
    "http://localhost:3000/api/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao/coaps/filtros";

describe("/api/cofin25/indicadores/cuidado_da_pessoa_com_hipertensao/coaps/filtros Route Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("GET /api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/filtros", () => {
        it("Deve retornar 404 se a feature flag diabetesNewProgram não estiver habilitada", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(false);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/filtros/route"
            );

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});
            expect(response.status).toBe(404);
        });

        it("Deve retornar 403 se o usuário não possuir o perfil permitido na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/filtros/route"
            );

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});
            expect(response.status).toBe(403);
        });

        it("Deve retornar 500 se um erro inesperado for lançado na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockRejectedValue(new Error("Erro genérico"));
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/filtros/route"
            );

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});
            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e as opções de filtro se o request chegar no handler", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );

            const mockedPrisma = dbHelpers.mockPrismaClient();
            const mockCareTeamNames = [
                dbHelpers.diabetesItem({ careTeamName: "Equipe 1" }),
                dbHelpers.diabetesItem({ careTeamName: "Equipe 2" }),
            ];
            const mockMicroAreaNames = [
                dbHelpers.diabetesItem({ microAreaName: "01" }),
                dbHelpers.diabetesItem({ microAreaName: "02" }),
            ];

            const mockPatientAgeRanges = [
                dbHelpers.diabetesItem({ patientAgeRange: 20 }),
                dbHelpers.diabetesItem({ patientAgeRange: 30 }),
            ];

            const mockGoodPracticesStatusByQuarter = [
                dbHelpers.diabetesItem({
                    goodPracticesStatusByQuarter: 20,
                }),
                dbHelpers.diabetesItem({
                    goodPracticesStatusByQuarter: 10,
                }),
            ];
            const mockIsMedicalRecordUpdated = [
                dbHelpers.diabetesItem({ isMedicalRecordUpdated: true }),
                dbHelpers.diabetesItem({ isMedicalRecordUpdated: false }),
            ];

            mockedPrisma.diabetesAcfItem.findMany
                .mockResolvedValueOnce(mockCareTeamNames)
                .mockResolvedValueOnce(mockMicroAreaNames)
                .mockResolvedValueOnce(mockPatientAgeRanges)
                .mockResolvedValueOnce(mockGoodPracticesStatusByQuarter)
                .mockResolvedValueOnce(mockIsMedicalRecordUpdated);

            const { GET } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/filtros/route"
            );

            const expectedBody = {
                filters: {
                    microAreaName: ["01", "02"],
                    patientAgeRange: [
                        "11 a 19 (Adolescente)",
                        "20 a 59 (Adulto)",
                    ],
                    careTeamName: ["Equipe 1", "Equipe 2"],
                    goodPracticesStatusByQuarter: [
                        "Todas em dia",
                        "Pelo menos uma a fazer",
                    ],
                    medicalRecordUpdated: [
                        "Atualizada",
                        "Atualização pendente",
                    ],
                },
            };

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedBody);
        });
    });
});
