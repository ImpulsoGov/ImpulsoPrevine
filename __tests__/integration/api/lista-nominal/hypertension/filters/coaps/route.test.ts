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
    "http://localhost:3000/api/lista-nominal/hypertension/filters/coaps";

describe("/api/lista-nominal/hypertension/filters/coaps Route Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("GET /api/lista-nominal/hypertension/filters/coaps", () => {
        it("Deve retornar 404 se a feature flag hypertensionNewProgram não estiver habilitada", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(false);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/hypertension/filters/coaps/route"
            );

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});
            expect(response.status).toBe(404);
        });

        it("Deve retornar 403 se o usuário não possuir o perfil permitido na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/hypertension/filters/coaps/route"
            );

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});
            expect(response.status).toBe(403);
        });

        it("Deve retornar 500 se um erro inesperado for lançado na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockRejectedValue(new Error("Erro genérico"));
            dbHelpers.mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/hypertension/filters/coaps/route"
            );

            const request = httpHelpers.request(coapsUrl, "GET");
            const response = await GET(request, {});
            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e as opções de filtro se o request chegar no handler", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );

            const mockedPrisma = dbHelpers.mockPrismaClient();

            const mockCareTeamNames = [
                dbHelpers.hypertensionItem({ careTeamName: "Equipe 1" }),
                dbHelpers.hypertensionItem({ careTeamName: "Equipe 2" }),
            ];

            const mockMicroAreaNames = [
                dbHelpers.hypertensionItem({ microAreaName: "01" }),
                dbHelpers.hypertensionItem({ microAreaName: "02" }),
            ];

            const mockAppointmentStatusesByQuarter = [
                dbHelpers.hypertensionItem({ appointmentStatusByQuarter: 20 }),
                dbHelpers.hypertensionItem({ appointmentStatusByQuarter: 40 }),
            ];

            const mockLatestExamRequestStatusesByQuarter = [
                dbHelpers.hypertensionItem({
                    latestExamRequestStatusByQuarter: 10,
                }),
                dbHelpers.hypertensionItem({
                    latestExamRequestStatusByQuarter: 20,
                }),
            ];

            const mockPatientAgeRanges = [
                dbHelpers.hypertensionItem({ patientAgeRange: 20 }),
                dbHelpers.hypertensionItem({ patientAgeRange: 30 }),
            ];

            const mockGoodPracticesStatusByQuarter = [
                dbHelpers.hypertensionItem({
                    goodPracticesStatusByQuarter: 20,
                }),
                dbHelpers.hypertensionItem({
                    goodPracticesStatusByQuarter: 10,
                }),
            ];

            const mockIsMedicalRecordUpdated = [
                dbHelpers.hypertensionItem({ isMedicalRecordUpdated: true }),
                dbHelpers.hypertensionItem({ isMedicalRecordUpdated: false }),
            ];

            mockedPrisma.hypertensionAcfItem.findMany
                .mockResolvedValueOnce(mockCareTeamNames)
                .mockResolvedValueOnce(mockMicroAreaNames)
                .mockResolvedValueOnce(mockAppointmentStatusesByQuarter)
                .mockResolvedValueOnce(mockLatestExamRequestStatusesByQuarter)
                .mockResolvedValueOnce(mockPatientAgeRanges)
                .mockResolvedValueOnce(mockGoodPracticesStatusByQuarter)
                .mockResolvedValueOnce(mockIsMedicalRecordUpdated);

            const { GET } = await import(
                "@/app/api/lista-nominal/hypertension/filters/coaps/route"
            );

            const expectedBody = {
                filters: {
                    microAreaName: ["01", "02"],
                    appointmentStatusByQuarter: ["Atrasada", "Em dia"],
                    latestExamRequestStatusByQuarter: [
                        "Nunca realizado",
                        "Atrasada",
                    ],
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
