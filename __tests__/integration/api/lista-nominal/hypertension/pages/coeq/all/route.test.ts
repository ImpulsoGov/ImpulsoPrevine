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
import type * as schema from "@/features/acf/shared/hypertension/schema";

const coeqUrl = `http://localhost:3000/api/lista-nominal/hypertension/pages/coeq/all`;
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [PROFILE_ID.COEQ],
} satisfies interceptors.User;
const body = {} satisfies schema.CoeqPageRequestBody;
const stringfiedBody = JSON.stringify(body);

describe(`/api/lista-nominal/hypertension/pages/coeq/all Route Handler`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe(`POST /api/lista-nominal/hypertension/pages/coeq/all`, () => {
        it("Deve retornar 404 se a feature flag hypertensionNewProgram não estiver habilitada", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(false);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coeq/all/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(404);
        });

        it("Deve retornar 403 se o usuário não possuir o perfil permitido na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coeq/all/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(403);
        });

        it("Deve retornar 400 quando o body da requisição é inválido", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coeq/all/route"
            );

            const bodyWithInvalidSorting = { ...body, sorting: [] };
            const request = httpHelpers.request(coeqUrl, "POST", {
                body: JSON.stringify(bodyWithInvalidSorting),
            });
            const response = await POST(request, {
                user: user,
                parsedBody: {},
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(400);
        });

        it("Deve retornar 500 se um erro inesperado for lançado na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockRejectedValue(new Error("Erro genérico"));
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coeq/all/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e os dados da equipe se o request chegar no handler", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );

            const mockPrisma = dbHelpers.mockPrismaClient();
            const baseDbItem = dbHelpers.hypertensionItem();

            mockPrisma.hypertensionAcfItem.findMany.mockResolvedValue([
                {
                    ...baseDbItem,
                    patientName: "Paciente A",
                    appointmentStatusByQuarter: 10,
                    latestExamRequestStatusByQuarter: 40,
                    homeVisitStatusByQuarter: 10,
                    weightHeightStatusByQuarter: 10,
                    isMedicalRecordUpdated: false,
                },
                {
                    ...baseDbItem,
                    patientName: "Paciente B",
                    appointmentStatusByQuarter: 20,
                    latestExamRequestStatusByQuarter: 10,
                    homeVisitStatusByQuarter: 10,
                    weightHeightStatusByQuarter: 10,
                    isMedicalRecordUpdated: true,
                },
            ]);

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coeq/all/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            const {
                patientId: _patientId,
                patientAgeRange: _patientAgeRange,
                careTeamIne: _careTeamIne,
                goodPracticesStatusByQuarter: _goodPracticesStatusByQuarter,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                isMedicalRecordUpdated: _isMedicalRecordUpdated,
                ...basePageItem
            } = baseDbItem;
            const expectedResponseBody = [
                {
                    ...basePageItem,
                    patientName: "Paciente A",
                    appointmentStatusByQuarter: "Nunca realizado",
                    latestExamRequestStatusByQuarter: "Em dia",
                    homeVisitStatusByQuarter: "Nunca realizado",
                    weightHeightStatusByQuarter: "Nunca realizado",
                    medicalRecordUpdated: "Atualização pendente",
                },
                {
                    ...basePageItem,
                    patientName: "Paciente B",
                    appointmentStatusByQuarter: "Atrasada",
                    latestExamRequestStatusByQuarter: "Nunca realizado",
                    homeVisitStatusByQuarter: "Nunca realizado",
                    weightHeightStatusByQuarter: "Nunca realizado",
                    medicalRecordUpdated: "Atualizada",
                },
            ];

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedResponseBody);
        });
    });
});
