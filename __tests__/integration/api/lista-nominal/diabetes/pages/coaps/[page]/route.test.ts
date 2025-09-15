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
import type * as schema from "@/features/acf/shared/diabetes/schema";

const coapsUrl = `http://localhost:3000/api/lista-nominal/diabetes/pages/coaps/0`;
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [PROFILE_ID.COAPS],
} satisfies interceptors.User;
const body = {
    filters: {
        communityHealthWorker: ["ACS Teste"],
        conditionIdentifiedBy: ["Autorreferida"],
        patientStatus: ["Apenas a consulta a fazer"],
        patientAgeRange: ["Menos de 17 anos"],
        careTeamName: ["Equipe Teste"],
    },
    sorting: { field: "patientName", sort: "asc" },
    search: "Paciente Teste",
} satisfies schema.CoapsPageRequestBody;
const stringfiedBody = JSON.stringify(body);

describe(`/api/lista-nominal/diabetes/pages/coaps/[page] Route Handler`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe(`POST /api/lista-nominal/diabetes/pages/coaps/[page]`, () => {
        it("Deve retornar 404 se a feature flag diabetesNewProgram não estiver habilitada", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(false);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({
                        payload: { perfis: [PROFILE_ID.COAPS] },
                    })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
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
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({
                        payload: { perfis: [PROFILE_ID.COEQ] },
                    })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
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

        it("Deve retornar 400 ao tentar acessar uma página inválida", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({
                        payload: { perfis: [PROFILE_ID.COAPS] },
                    })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0A" }),
            });

            expect(response.status).toBe(400);
        });

        it("Deve retornar 400 quando o body da requisição é inválido", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({
                        payload: { perfis: [PROFILE_ID.COAPS] },
                    })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
            );

            const bodyWithInvalidSearch = { ...body, search: 20 };
            const request = httpHelpers.request(coapsUrl, "POST", {
                body: JSON.stringify(bodyWithInvalidSearch),
            });
            const response = await POST(request, {
                user: user,
                parsedBody: {},
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(400);
        });

        it("Deve retornar 500 se um erro inesperado for lançado na rota", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockRejectedValue(new Error("Erro genérico"));
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
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

        it("Deve retornar 200 e os dados da página + total de linhas se o request chegar no handler", async () => {
            flagHelpers.mockDiabetesNewProgram().mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockResolvedValue(
                    authHelpers.decodedToken({
                        payload: { perfis: [PROFILE_ID.COAPS] },
                    })
                );

            const mockPrisma = dbHelpers.mockPrismaClient();
            const baseDbItem = dbHelpers.diabetesItem();
            const totalRows = 4;

            mockPrisma.diabetesAcfItem.findMany.mockResolvedValueOnce([
                {
                    ...baseDbItem,
                    patientName: "Paciente A",
                    patientCpfOrBirthday: "12345678901",
                    hemoglobinTestDueDate: "2023-01-05",
                    nextAppointmentDueDate: "2023-06-05",
                },
                {
                    ...baseDbItem,
                    patientName: "Paciente B",
                    patientCpfOrBirthday: "10987654321",
                },
            ]);
            mockPrisma.diabetesAcfItem.count.mockResolvedValueOnce(totalRows);

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            const { id: _, ...basePageItem } = baseDbItem;
            const expectedResponseBody = {
                page: [
                    {
                        ...basePageItem,
                        hemoglobinTestDueDate: "2023-01-05",
                        nextAppointmentDueDate: "2023-06-05",
                        patientName: "Paciente A",
                        patientCpfOrBirthday: "12345678901",
                        mostRecentProductionRecordDate:
                            basePageItem.mostRecentProductionRecordDate.toISOString(),
                    },
                    {
                        ...basePageItem,
                        hemoglobinTestDueDate: "",
                        nextAppointmentDueDate: "",
                        patientName: "Paciente B",
                        patientCpfOrBirthday: "10987654321",
                        mostRecentProductionRecordDate:
                            basePageItem.mostRecentProductionRecordDate.toISOString(),
                    },
                ],
                totalRows,
            };

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedResponseBody);
        });
    });
});
