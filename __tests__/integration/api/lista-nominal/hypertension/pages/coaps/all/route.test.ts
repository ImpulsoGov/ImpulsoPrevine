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

const coapsUrl = `http://localhost:3000/api/lista-nominal/hypertension/pages/coaps/all`;
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [PROFILE_ID.COAPS],
} satisfies interceptors.User;
const body = {} satisfies schema.CoapsPageRequestBody;
const stringfiedBody = JSON.stringify(body);

describe(`/api/lista-nominal/hypertension/pages/coaps/all Route Handler`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe(`POST /api/lista-nominal/hypertension/pages/coaps/all`, () => {
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

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coaps/all/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
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
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coaps/all/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
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
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coaps/all/route"
            );

            const bodyWithInvalidSorting = {
                ...body,
                sorting: {
                    field: "campo-invalido",
                    sort: "asc",
                },
            };
            const request = httpHelpers.request(coapsUrl, "POST", {
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
                "@/app/api/lista-nominal/hypertension/pages/coaps/all/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e os dados do município se o request chegar no handler", async () => {
            flagHelpers
                .mockFlag(flagHelpers.HYPERTENSION_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );

            const mockPrisma = dbHelpers.mockPrismaClient();
            const baseDbItem = dbHelpers.hypertensionItem();

            mockPrisma.hypertensionAcfItem.findMany.mockResolvedValue([
                {
                    ...baseDbItem,
                    patientName: "Paciente A",
                    appointmentStatusByQuarter: 20,
                    latestExamRequestStatusByQuarter: 10,
                    homeVisitStatusByQuarter: 20,
                    weightHeightStatusByQuarter: 20,
                },
                {
                    ...baseDbItem,
                    patientName: "Paciente B",
                    appointmentStatusByQuarter: 10,
                    latestExamRequestStatusByQuarter: 40,
                    patientCpf: null,
                    homeVisitStatusByQuarter: 20,
                    weightHeightStatusByQuarter: 20,
                },
            ]);

            const { POST } = await import(
                "@/app/api/lista-nominal/hypertension/pages/coaps/all/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
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
                    appointmentStatusByQuarter: "Atrasada",
                    latestExamRequestStatusByQuarter: "Nunca realizado",
                    homeVisitStatusByQuarter: "Atrasada",
                    weightHeightStatusByQuarter: "Atrasada",
                },
                {
                    ...basePageItem,
                    patientName: "Paciente B",
                    patientCpf: null,
                    appointmentStatusByQuarter: "Nunca realizado",
                    latestExamRequestStatusByQuarter: "Em dia",
                    homeVisitStatusByQuarter: "Atrasada",
                    weightHeightStatusByQuarter: "Atrasada",
                },
            ];

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedResponseBody);
        });
    });
});
