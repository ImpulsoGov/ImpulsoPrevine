/**
 * @jest-environment node
 */

import { PROFILE_ID } from "@/types/profile";
import type { JWTToken } from "@/utils/token";
import type * as interceptors from "@features/interceptors/backend/index";
import { describe, jest } from "@jest/globals";
import type { PrismaClient } from "@prisma/client";
import type { DeepMockProxy } from "jest-mock-extended";
import { mockDeep } from "jest-mock-extended";
import * as dbHelpers from "../../../../../helpers/db";
import * as httpHelpers from "../../../../../helpers/http";
// import { diabetesNewProgram } from "@features/common/shared/flags";

// type Flag = () => Promise<boolean>;

// jest.mock("@/features/common/shared/flags", () => ({
//     ...jest.requireActual<
//         typeof import("@features/common/shared/flags")
//     >("@/features/common/shared/flags"),
//     diabetesNewProgram: jest.fn<Flag>(),
// }));

// const diabetesNewProgramMock =
//     diabetesNewProgram as unknown as jest.MockedFunction<() => Promise<boolean>>;

const coeqUrl = "http://localhost:3000/api/lista-nominal/diabetes/filters/coeq";
const user = {
    municipalitySusId: "111111",
    teamIne: "123",
    profiles: [1],
} satisfies interceptors.User;

const decodedToken = (
    payloadOverrides: Partial<JWTToken["payload"]>
): JWTToken => {
    return {
        payload: {
            id: "123",
            sub: "some_sub",
            perfis: [8],
            equipe: "equipe",
            municipio: "111111",
            ...payloadOverrides,
        },
        protectedHeader: { alg: "" },
    };
};

const mockDiabetesNewProgramWith = (resolvedValue: boolean): void => {
    jest.doMock("@/features/common/shared/flags", () => ({
        ...jest.requireActual<typeof import("@features/common/shared/flags")>(
            "@/features/common/shared/flags"
        ),
        diabetesNewProgram: jest
            .fn<() => Promise<boolean>>()
            .mockResolvedValue(resolvedValue),
    }));
};

const mockDecodeTokenWith = (resolvedValue: JWTToken): void => {
    jest.doMock("@/utils/token", () => {
        return {
            ...jest.requireActual<typeof import("@/utils/token")>(
                "@/utils/token"
            ),
            decodeToken: jest
                .fn<() => Promise<JWTToken>>()
                .mockResolvedValue(resolvedValue),
        };
    });
};

const mockPrismaClient = (): DeepMockProxy<PrismaClient> => {
    const mockedPrisma =
        mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

    jest.doMock<typeof import("@prisma/prismaClient")>(
        "@prisma/prismaClient",
        () => ({
            __esModule: true,
            prisma: mockedPrisma,
        })
    );

    return mockedPrisma;
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
            mockDiabetesNewProgramWith(false);
            mockDecodeTokenWith(decodedToken({ perfis: [PROFILE_ID.COEQ] }));
            mockPrismaClient();

            const { GET } = await import(
                "@/app/api/lista-nominal/diabetes/filters/coeq/route"
            );

            const request = httpHelpers.request(coeqUrl, "GET");
            const response = await GET(request, { user: user });
            expect(response.status).toBe(404);
        });

        it("Deve retornar 200 e as opções de filtro se o request chegar no handler", async () => {
            jest.doMock("@/features/common/shared/flags", () => ({
                ...jest.requireActual<
                    typeof import("@/features/common/shared/flags")
                >("@/features/common/shared/flags"),
                diabetesNewProgram: jest
                    .fn<() => Promise<boolean>>()
                    .mockResolvedValue(true),
            }));

            jest.doMock("@/utils/token", () => {
                return {
                    ...jest.requireActual<typeof import("@/utils/token")>(
                        "@/utils/token"
                    ),
                    decodeToken: jest
                        .fn<() => Promise<JWTToken>>()
                        .mockResolvedValue(
                            decodedToken({ perfis: [PROFILE_ID.COEQ] })
                        ),
                };
            });

            const mockPrisma =
                mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

            jest.doMock<typeof import("@prisma/prismaClient")>(
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
