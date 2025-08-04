//Cria um mock do prismaClient para usar em testes de unidade e integração.
//Fonte: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing

import type { PrismaClient } from "@prisma/client";
import type { DeepMockProxy } from "jest-mock-extended";
import { mockDeep, mockReset } from "jest-mock-extended";

import { prisma } from "@prisma/prismaClient";

jest.mock("@prisma/prismaClient", () => ({
    __esModule: true,
    prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
