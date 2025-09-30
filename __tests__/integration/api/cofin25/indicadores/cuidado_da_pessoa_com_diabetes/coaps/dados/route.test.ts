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

const coapsUrl = `http://localhost:3000/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados`;
const body = {} satisfies schema.CoapsPageRequestBody;
const stringfiedBody = JSON.stringify(body);

describe(`api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados Route Handler`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe(`POST api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados`, () => {
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

            const { POST } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {});

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

            const { POST } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {});

            expect(response.status).toBe(403);
        });

        it("Deve retornar 400 quando o body da requisição é inválido", async () => {
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
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados/route"
            );

            const bodyWithInvalidSorting = {
                ...body,
                sorting: {
                    field: "campo-invalido",
                    sort: "desc",
                },
            };
            const request = httpHelpers.request(coapsUrl, "POST", {
                body: JSON.stringify(bodyWithInvalidSorting),
            });
            const response = await POST(request, {});

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
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {});

            expect(response.status).toBe(500);
        });

        it("Deve retornar 200 e os dados do município se o request chegar no handler", async () => {
            flagHelpers
                .mockFlag(flagHelpers.DIABETES_NEW_PROGRAM)
                .mockResolvedValue(true);
            authHelpers.mockDecodeToken().mockResolvedValue(
                authHelpers.decodedToken({
                    payload: { perfis: [PROFILE_ID.COAPS] },
                })
            );

            const mockPrisma = dbHelpers.mockPrismaClient();
            const baseDbItem = dbHelpers.diabetesItem();

            mockPrisma.diabetesAcfItem.findMany.mockResolvedValue([
                {
                    ...baseDbItem,
                    patientName: "Paciente A",
                    appointmentStatusByQuarter: 20,
                    bloodPressureExamStatusByQuarter: 10,
                    homeVisitStatusByQuarter: 20,
                    weightHeightStatusByQuarter: 20,
                    isMedicalRecordUpdated: false,
                    glycatedHemoglobinExamStatusByQuarter: 40,
                    feetExamStatusByQuarter: 40,
                },
                {
                    ...baseDbItem,
                    patientName: "Paciente B",
                    appointmentStatusByQuarter: 10,
                    bloodPressureExamStatusByQuarter: 40,
                    patientCpf: null,
                    homeVisitStatusByQuarter: 20,
                    weightHeightStatusByQuarter: 20,
                    isMedicalRecordUpdated: false,
                    glycatedHemoglobinExamStatusByQuarter: 40,
                    feetExamStatusByQuarter: 40,
                },
            ]);

            const { POST } = await import(
                "@/app/api/cofin25/indicadores/cuidado_da_pessoa_com_diabetes/coaps/dados/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", {
                body: stringfiedBody,
            });
            const response = await POST(request, {});

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
                    bloodPressureExamStatusByQuarter: "Nunca realizado",
                    homeVisitStatusByQuarter: "Atrasada",
                    weightHeightStatusByQuarter: "Atrasada",
                    medicalRecordUpdated: "Atualização pendente",
                    glycatedHemoglobinExamStatusByQuarter: "Em dia",
                    feetExamStatusByQuarter: "Em dia",
                },
                {
                    ...basePageItem,
                    patientName: "Paciente B",
                    patientCpf: null,
                    appointmentStatusByQuarter: "Nunca realizado",
                    bloodPressureExamStatusByQuarter: "Em dia",
                    homeVisitStatusByQuarter: "Atrasada",
                    weightHeightStatusByQuarter: "Atrasada",
                    medicalRecordUpdated: "Atualização pendente",
                    glycatedHemoglobinExamStatusByQuarter: "Em dia",
                    feetExamStatusByQuarter: "Em dia",
                },
            ];

            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(expectedResponseBody);
        });
    });
});
