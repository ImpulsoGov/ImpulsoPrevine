/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import { describe, jest } from "@jest/globals";
import * as dbHelpers from "@tests/helpers/db";
import * as httpHelpers from "@tests/helpers/http";
import * as authHelpers from "@tests/helpers/auth";
import * as flagHelpers from "@tests/helpers/flag";
import type * as schema from "@/features/acf/shared/diabetes/schema";

const coeqUrl = `http://localhost:3000/api/lista-nominal/diabetes/pages/coeq/0`;
const body = {} satisfies schema.CoeqPageRequestBody;
const stringfiedBody = JSON.stringify(body);

describe(`/api/lista-nominal/diabetes/pages/coeq/[page] Route Handler`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe(`POST /api/lista-nominal/diabetes/pages/coeq/[page]`, () => {
        it("Deve retornar 404 se a feature flag diabetesNewProgram não estiver habilitada", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(false);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coeq/[page]/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(404);
        });

        it("Deve retornar 403 se o usuário não possuir o perfil permitido na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coeq/[page]/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(403);
        });

        it("Deve retornar 400 ao tentar acessar uma página inválida", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coeq/[page]/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                params: Promise.resolve({ page: "A1" }),
            });

            expect(response.status).toBe(400);
        });

        it("Deve retornar 400 quando o body da requisição é inválido", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coeq/[page]/route"
            );

            const bodyWithInvalidFilters = { ...body, filters: "" };
            const request = httpHelpers.request(coeqUrl, "POST", {
                body: JSON.stringify(bodyWithInvalidFilters),
            });
            const response = await POST(request, {
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(400);
        });

        it("Deve retornar 500 se um erro inesperado for lançado na rota", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers
                .mockDecodeToken()
                .mockRejectedValue(new Error("Erro genérico"));
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coeq/[page]/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e os dados da página + total de linhas se o request chegar no handler", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COEQ] },
                })
            );

            const mockPrisma = dbHelpers.mockPrismaClient();
            const baseDbItem = dbHelpers.diabetesItem();
            const totalRows = 7;

            mockPrisma.diabetesAcfItem.findMany.mockResolvedValue([
                {
                    ...baseDbItem,
                    patientName: "Paciente A",
                    patientCpfOrBirthday: "31-01-1999",
                },
                {
                    ...baseDbItem,
                    patientName: "Paciente B",
                    patientCpfOrBirthday: "10987654321",
                },
            ]);
            mockPrisma.diabetesAcfItem.count.mockResolvedValue(totalRows);

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coeq/[page]/route"
            );

            const request = httpHelpers.request(coeqUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {
                params: Promise.resolve({ page: "0" }),
            });

            const { id: _, ...basePageItem } = baseDbItem;
            const expectedResponseBody = {
                page: [
                    {
                        ...basePageItem,
                        patientName: "Paciente A",
                        patientCpfOrBirthday: "31-01-1999",
                        hemoglobinTestDueDate: "",
                        nextAppointmentDueDate: "",
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
