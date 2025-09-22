/**
 * @jest-environment node
 */

import { getUser } from "..";
import * as httpHelpers from "@tests/helpers/http";
import type { Payload } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";

jest.mock("@/utils/token");

const mockGetToken = getToken as jest.Mock;
const mockGetEncodedSecret = getEncodedSecret as jest.Mock;
const mockDecodeToken = decodeToken as jest.Mock;

const request = httpHelpers.request("http://localhost:3000/endpoint", "GET");
const secret = "secret";
const token = "valid-token";
const payload = {
    municipio: "111",
    equipe: "222",
    perfis: [1, 2],
    id: "1",
} satisfies Payload;

describe("getUser", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Deve retornar os dados do usuário se a decodificação do token for um sucesso", async () => {
        mockGetToken.mockReturnValue(token);
        mockGetEncodedSecret.mockReturnValue(secret);
        mockDecodeToken.mockResolvedValue({ payload });

        const user = await getUser(request);
        const expectedUser = {
            municipalitySusId: payload.municipio,
            teamIne: payload.equipe,
            profiles: payload.perfis,
        };

        expect(user).toEqual(expectedUser);
    });

    it("Deve lançar erro se a decodificação do token falhar", async () => {
        mockGetToken.mockReturnValue(token);
        mockGetEncodedSecret.mockReturnValue(secret);
        mockDecodeToken.mockRejectedValue(new Error("Token inválido"));

        await expect(getUser(request)).rejects.toThrow("Token inválido");
    });
});
