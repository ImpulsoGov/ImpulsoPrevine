/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import type * as interceptors from "@features/interceptors/backend/index";
import { describe, jest } from "@jest/globals";
import * as dbHelpers from "../../../../../../../helpers/db";
import * as httpHelpers from "../../../../../../../helpers/http";
import * as authHelpers from "../../../../../../../helpers/auth";
import * as flagHelpers from "../../../../../../../helpers/flag";
import type * as schema from "@/features/acf/shared/diabetes/schema";

const coapsUrl = `http://localhost:3000/api/lista-nominal/diabetes/pages/coaps/0`;
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [1],
} satisfies interceptors.User;
const body = {
    filters: {
        communityHealthWorker: ["Eliana"],
        conditionIdentifiedBy: ["Autorreferida"],
        patientStatus: ["Apenas a consulta a fazer"],
        patientAgeRange: ["Menos de 17 anos"],
        careTeamName: ["Equipe Teste"],
    },
    sorting: { field: "patientName", sort: "asc" },
    search: "",
} satisfies schema.CoapsPageRequestBody;

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
                    authHelpers.decodedToken({ perfis: [PROFILE_ID.COAPS] })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", { body });
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
                    authHelpers.decodedToken({ perfis: [PROFILE_ID.COEQ] })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", { body });
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
                    authHelpers.decodedToken({ perfis: [PROFILE_ID.COAPS] })
                );
            dbHelpers.mockPrismaClient();

            const { POST } = await import(
                "@/app/api/lista-nominal/diabetes/pages/coaps/[page]/route"
            );

            const request = httpHelpers.request(coapsUrl, "POST", { body });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0A" }),
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

            const request = httpHelpers.request(coapsUrl, "POST", { body });
            const response = await POST(request, {
                user: user,
                parsedBody: body,
                params: Promise.resolve({ page: "0" }),
            });

            expect(response.status).toBe(500);
        });
    });
});
